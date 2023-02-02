import {downloadFile} from './download-file.js'

let url = `http://archive.phonetics.ucla.edu/Language/BXM/bxm.xml`

console.log(`downloading… ` + url)
await downloadFile(url, './bxm.xml')
