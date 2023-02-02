import {
  DOMParser,
  Element,
} from "https://deno.land/x/deno_dom/deno-dom-wasm.ts"

import { writableStreamFromWriter } from "https://deno.land/std@0.160.0/streams/mod.ts"

let parseObjectTable = table => Array.from(table.rows)
  .reduce((o, row) => {
  o[row.cells[0].textContent.trim()] = row.cells[1].textContent.trim()
  return o
}, {})

let plaintext = await Deno.readTextFile('fulani-corpus-index.json')
let corpusIndex = JSON.parse(plaintext)

const exists = async (filename) => {
  try {
    await Deno.stat(filename);
    // successful, file or directory must exist
    return true
  } catch (error) {
    if (error && error.kind === Deno.ErrorKind.NotFound) {
      // file or directory does not exist
      return false
    } else {
      // unexpected error, maybe permissions, pass it along
      throw error
    }
  }
}

let downloadFile = async (url,path=null) => {
  const fileResponse = await fetch(url)

  if(!path){
    path = url.split("/").pop()
  }
  
  if (fileResponse.body) {
    const file = await Deno.open(`./${path}`, { write: true, create: true });
    const writableStream = writableStreamFromWriter(file)
    await fileResponse.body.pipeTo(writableStream)
  }
}

let download = async url => {
  let response = await fetch(url)
  let html = await response.text()
  let document = new DOMParser().parseFromString(html, 'text/html')

  let as = Array.from(document.querySelectorAll('table a'))
  let urls = as.filter(a => {
    let fileTypes = `html wav jpg`.split(" ")
    return fileTypes.some(fileType => a.href.toLowerCase().endsWith(fileType))
  })
  .map(a =>  a.href.split('#')[0])

  urls = Array.from(new Set(urls))

  return urls
}

let dir
for await(let text of corpusIndex.texts){
  if(!exists(`./${text.code}`)){
    dir = Deno.mkdir(text.code)
  } else {
    dir = text.code
  }

  await download(text.uclaUrl, `${dir}/${text.uclaUrl.split("/").pop()}`)

}