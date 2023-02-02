import { DOMParser } from "https://deno.land/x/deno_dom/deno-dom-wasm.ts"

let GET = async url => { console.log(`GETting ${url}…`)
  let response = await fetch(url)
  let html = await response.text()
  let dom = new DOMParser().parseFromString(html, 'text/html')
  return dom
}

export class UCLATextExtractor {
  constructor(code){
    this.code = code
    this.indexUrl = this.buildUrl(code)
    this.fetchIndex(this.indexUrl)
  }

  buildUrl(code){
    // http://archive.phonetics.ucla.edu/Language/FFM/ffm.html
    return `http://archive.phonetics.ucla.edu/Language/${code.toUpperCase()}/${code}.html`
  }
  async fetchIndex(url){ 
    let indexDom = await GET(url)
    let index = this.parseIndex(indexDom)
    this.index = index
  }

  parseCells(cells) {
    let links = [
      { "type": "ucla-wordlist", id: "wordlist", fileName: cells[1].querySelector('a')?.getAttribute('href') || null },
      {
        "type": "sentence-range", id: "sentence-range", "range": cells[2].querySelector('a')
          .textContent.trim().split(" - ")
          .map(x => x.trim())
          .map(x => parseInt(x))
      },
      { "type": "speakers", "speakers": cells[3].textContent.trim() },
      { "type": "audio", format: "wav", fileName: cells[5].querySelector('a')?.getAttribute('href') || null },
      { "type": "audio", format: "mp3", fileName: cells[6].querySelector('a').href },
      { "type": "image", id: "jpg", format: "jpg", fileName: cells[7].querySelector('a')?.getAttribute('href') || null },
      { "type": "image", id: "jpg2", format: "jpg", fileName: cells[8].querySelector('a')?.getAttribute('href') || null },
      { "type": "ucla-metadata", id: "ucla-metadata", "file": cells[11].querySelector('a')?.getAttribute('href') }
    ]
    links.forEach(link => {
      if(link.fileName){
        link.url = new URL(link.fileName, this.indexUrl).href
      }
    })
    return links
  }

  parseIndex(dom){
    let trs = Array.from(dom.querySelectorAll('table tr')).slice(1)
    let index = trs.map(row => {
      let cells = Array.from(row.querySelectorAll('td'))

      return this.parseCells(cells)
    })

    this.index = index
    this.saveIndex(index)
  }
  
  async saveIndex(){
    let fileName = `${this.code}-index.json`
    Deno.writeTextFile(fileName, JSON.stringify(this.index,null,2))
  }

}

// addSentences = (wordlistUrl, text) => {
// 	text.sentences = parseTable(wordlistUrl)
// }

// addUCLAMetadata = (detailsUrl, text) => {
//     text.metadata.ucla = parseMetadataTable(detailsUrl)
// }
// 	get the sentence range
//   	range.forEach(id => {
//       sentence = text.sentences[id - 1]
//       sentence.metadata = {
//       		id,
//           links: [
//             { type: "audio", url: wavUrl}
//           ]
//         }
    	
//     	wav url
//       jpg url
//       jpg2 url?
//       details url

//  

// console.table(wtf)