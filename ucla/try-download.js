import {downloadFile} from './download-file.js'

await downloadFile(
  "https://upload.wikimedia.org/wikipedia/commons/8/84/Deno.svg",
  "/var/tmp/Deno1.svg",
)