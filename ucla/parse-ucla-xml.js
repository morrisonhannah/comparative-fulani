import {exists} from './exists.js'
import { DOMParser } from "https://deno.land/x/deno_dom/deno-dom-wasm.ts"
import {tableToJSON} from './table-to-json/table-to-json.js'
import {downloadFile} from './download-file.js'


// fetches xml data ? 
let parseMetadataIndex = async xmlIndexUrl => { 
  let response = await fetch(xmlIndexUrl)

  let xml = await response.text()
  let dom = new DOMParser().parseFromString(xml, 'text/html')
  let items = Array.from(dom.querySelectorAll('item'))

  let metadatas = items.map(item => 
    Array.from(item.children)
      .reduce((metadata, el) => {
        let tagName = el.tagName.toLowerCase()
        let value = el.textContent.trim()

        // these values are just filenames, we need to make absolute URLs
        let urlValues = [
          "filename_audio",
          "filename_wav",
          "filename_mp3",
          "wordlist",
          "image_tif",
          "image_tif2",
          "image_jpg",
          "img_jpg2"
        ]

        if(urlValues.includes(tagName)){
          let urlTagName = 'url_' + tagName .replace('filename_', '')
          metadata[urlTagName] =  new URL(value, xmlIndexUrl).href
        }

        if(tagName == 'sil_code'){
          value = value.toLowerCase() // upper case language code? blech
        }

        // wordlist_entries gives a range of sentences which have 
        // the current metadata
        if(tagName == 'wordlist_entries'){
          let [start, end] = value.split(` - `)
            .map(n => parseInt(n))
          value = { start, end }
        }

        metadata[tagName] = value
        return metadata      
      }, {})
  )

  return metadatas
}


let metadatasToTexts = async metadatas => {
  let texts = []

  for await(let metadata of metadatas){
    let text = await parseTextHTML(metadata)
    texts.push(text)
  }

  return texts
}


let readHeaders = async code => {
  let headersFileName = `${code}-headers.json`
  if(await exists(headersFileName)){
    let json = await Deno.readTextFile(headersFileName)
    let headers = JSON.parse(json)

    return headers
  } else {
    return ["id", "transcription", "translation"]
  }
}

// take a metadata object, fetch sentences from HTML table
// create text object, return
// metadata => {metadata: {}, sentences: []}
// fetch html data
let parseTextHTML = async (metadata) => { 
  let htmlTextUrl = metadata.url_wordlist

  let response = await fetch(htmlTextUrl)
  let html = await response.text()

  let dom = new DOMParser().parseFromString(html, 'text/html')

  let headers = await readHeaders(metadata.sil_code)

  
  let table = dom.querySelector('table')
  let results = tableToJSON(table, headers)

  let sentences = results.data
  // associate metadata with range of sentences
  sentences = sentences.slice(metadata.wordlist_entries.start - 1, metadata.wordlist_entries.end)

  let text = { metadata, sentences }

  mungeText(text)

  return text
}

// reorg json structure
let mungeText = text => {

  let {
    lang_name: language,
    speakers: speakers,
    fieldworkers: fieldworkers,
    recording_date: recordingDate,
    recording_location: location,
    sil_code: iso630_3
  } =  text.metadata

  text.metadata = {
    language,
    speakers,
    fieldworkers,
    recordingDate,
    location,
    iso630_3,
    ucla: text.metadata
  }

  text.metadata.id = text.metadata.ucla.filename_audio
  text.sentences.forEach(sentence => {

    if(!sentence.metadata){ sentence.metadata = {links: []} }

    let timestamp = { 
      type: "timestamp",
      fileName: text.metadata.ucla.filename_wav,
      start: 0,
      end: 0
    }

    sentence.metadata.links.push(timestamp)
  })
}

let downloadAudio = async text => {
  await downloadFile(text.metadata.ucla.url_wav, `${directory}/${text.metadata.ucla.filename_wav}`)
}

let code = Deno.args[0]
let xmlIndexUrl = `http://archive.phonetics.ucla.edu/Language/${code.toUpperCase()}/${code}.xml`


let metadatas = await parseMetadataIndex(xmlIndexUrl)
let texts = await metadatasToTexts(metadatas)


if(!(await exists(`./${code}`))){
  Deno.mkdir(`./${code}`)
}

let directory = `${code}`

for await(let text of texts){
  let path = `./${directory}/${text.metadata.id}-text.json`
  console.log(await exists(path))
  await Deno.writeTextFile(path, JSON.stringify(text, null, 2))
  await downloadAudio(text)
}
  

