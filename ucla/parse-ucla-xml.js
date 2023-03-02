import { DOMParser } from "https://deno.land/x/deno_dom/deno-dom-wasm.ts"
import {tableToJSON} from './table-to-json/table-to-json.js'
import {downloadFile} from './download-file.js'

/*

A rare annoyance in Deno: there is no simple way to ask
whether a file or directory exists, so we use this 
utility function.

*/
export const exists = async filename => {
  try {
    await Deno.stat(filename)
    // successful, file or directory must exist
    return true
  } catch (error) {
    if (error instanceof Deno.errors.NotFound) {
      // file or directory does not exist
      return false
    } else {
      // unexpected error, maybe permissions, pass it along
      throw error
    }
  }
}

/*

Each language in the  UCLA Phonetics Archive has a 
metadata file,  e.g.:

http://archive.phonetics.ucla.edu/Language/FFM/ffm.xml

This file turns is the best metadata file in the bundles, because
it doesn’t have any empty cells (compare <code>_metadata.xls and 
ffm_record_details.html). 

So we start here by downloading and parsing the file, creating a
metadata object for each item. The resulting array of objects is
awkwardly called `metadatas`. 


*/
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

        /*
        wordlist_entries gives a range of sentences which have 
        the current metadata:

        Consider the second wordlist for Maasina Fulani:

        http://archive.phonetics.ucla.edu/Language/FFM/ffm_word-list_1962_02.html

        <wordlist_entries>1 - 7</wordlist_entries>

        this occurs in Item 2, which is recording ffm_word-list_1962_02.wav

        This means that the first 7 words in the wordlist are recorded in one audio file, and the remaining sentences are in recording 3:

        <wordlist_entries>8 - 22</wordlist_entries>

        this one is ffm_word-list_1962_03.wav
        */
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

/*

  Each metadata object has all the information we need in order
  to download the relevant files, parse them, and reshape the
  data.

*/
let metadatasToTexts = async metadatas => {
  let texts = []

  for await(let metadata of metadatas){
    let text = await parseTextHTML(metadata)
    texts.push(text)
  }

  return texts
}

/*

Because the column headers across tables in the UCLA
archive are variable, we need a place to specify them
in a semi-standardized way. 

*/
let readHeaders = async code => {
  let text = await Deno.readTextFile(headersFileName)
  let allHeaders = JSON.parse(text)
  if(allHeaders[code]){
    return allHeaders[code]
  } else {
    return ["id", "transcription", "translation"]
  }
}

/*

take a metadata object, 
fetch sentences from HTML table,
create text object, return
metadata => {metadata: {}, sentences: []}
fetch html data

*/
let parseTextHTML = async (metadata) => { 
  let htmlTextUrl = metadata.url_wordlist

  let response = await fetch(htmlTextUrl)
  let html = await response.text()

  let dom = new DOMParser().parseFromString(html, 'text/html')

  let headers = await readHeaders(metadata.sil_code)
  
  let table = dom.querySelector('table')

  let result = tableToJSON(table, headers)

  let sentences = result.data
  /*

    An array of objects, one per sentence.

  */

  /* 
  TODO: I think this is wrong
  */ 
  // associate metadata with range of sentences
  sentences = sentences.slice(
    metadata.wordlist_entries.start - 1, 
    metadata.wordlist_entries.end
  )

  let text = { metadata, sentences }

  mungeText(text)

  return text
}

// Use camel case and standardize keys
let mungeText = text => {

  // destructure text.metadata to assign new labels
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

  await Deno.writeTextFile(path, JSON.stringify(text, null, 2))
  await downloadAudio(text)
}
  

