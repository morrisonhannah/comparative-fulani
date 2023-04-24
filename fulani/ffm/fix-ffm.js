let ffm = JSON.parse(Deno.readTextFileSync('ffm-text.json'))

let sentences = ffm.sentences.map(sentence => {
  let {number, transcription, translation, end, start} = sentence
  let s2 = {
    entry: number,
    transcription,
    "sound-number": sentence["sound-number"],
    translation,
    metadata: {
      links: [
        {"type": "timestamp" ,fileName: "ffm_word-list_1962_01.wav", start, end}
      ]
    }
  }
  return s2
  
})

ffm.sentences = sentences

console.log(JSON.stringify(ffm, null,2))