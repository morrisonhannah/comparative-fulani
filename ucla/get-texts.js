import { DOMParser } from "https://deno.land/x/deno_dom/deno-dom-wasm.ts"
import {tableToJSON} from './table-to-json/table-to-json.js'
import {downloadFile} from './download-file.js'

let nodeToObject = node => {
  // direct children of node’s tagNames become keys, contents become
  // values. does not handle nested children.
  return Array.from(node.children)
}

let getTexts = async url => { 
  let response = await fetch(url)

  let xml = await response.text()
  let dom = new DOMParser().parseFromString(xml, 'text/html')
  let items = Array.from(dom.querySelectorAll('item'))

  let metadatas = itemToMetadata()

  let texts = []

  for await(let metadata of metadatas){
    let text = await parseTextHTML(metadata)
    texts.push(text)
  }

  return texts

}

/*

fetch url url 
get dom
get <item>s
convert each item into a metadata object



*/