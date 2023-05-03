export class ComparativeLexicon extends HTMLElement {
  constructor() {
    super()
    this.lexicons = []

    this.audios = {}
    this.listen()
  }

  // Define the data setter
  set data(lexicons) { 

    if (!Array.isArray(lexicons)) {
      throw new Error("Data must be an array of lexicons")
    }

    this.lexicons = lexicons//.map(lexicon => lexicon.words) // hack fix me
    this.render()
  }

  sentenceToWord(sentence){
    let word = {} 

    word.form = sentence.transcription
    word.gloss = sentence.translation
    word.metadata = sentence.metadata

    return word 
  }

  textToLexicon(text){
    let lexicon = {
      metadata: {
        title: `Lexicon derived from ${text.metadata.title}`,
        language: text.metadata.language
      }
    }
    lexicon.words = text.sentences
      .map(sentence => this.sentenceToWord(sentence))
  
    return lexicon
  }

  async fetch(indexUrl){ 
    try {

      let response = await fetch(indexUrl)
      let index = await response.json()
      this.index = index

      await this.fetchTexts(index)
    } catch(e){
      console.log(e)
    }
  }

  async fetchTexts({metadata, urls}){ 
    this.metadata = metadata
    this.urls = urls
    let temporaryLexicons = []

    for await (let url of urls){
      try {
        let response = await fetch(url)
        let text = await response.json()
        let lexicon = this.textToLexicon(text)
        temporaryLexicons.push(lexicon)
      } catch(e){
        console.log(e)
      }
    }

    this.data = temporaryLexicons
  } 

  static get observedAttributes(){
    return ["src"]
  }

  attributeChangedCallback(attribute, oldValue, newValue){
    if(attribute == "src"){ 
      this.fetch(newValue)
    }
  }

  // Render the table
  render() {
    this.innerHTML = ""

    // Create the table element
    const table = document.createElement("table")

    // Create the header row
    const headerRow = document.createElement("tr")

    // Add an empty cell for the top-left corner
    headerRow.appendChild(document.createElement("th"))

    // Add a header cell for each lexicon
    this.lexicons.forEach((lexicon) => {
      const headerCell = document.createElement("th")
      headerCell.textContent = lexicon.language || lexicon.metadata.language
      headerRow.appendChild(headerCell)
    })

    // Add the header row to the table
    table.appendChild(headerRow)

    // Create a row for each gloss
    const glosses = new Set()
    this.lexicons.forEach((lexicon) => {
      lexicon.words.forEach((word) => {
        glosses.add(word.gloss)
      })
    })

    glosses.forEach((gloss) => {
      const row = document.createElement("tr")

      // Add the gloss to the first cell
      const glossCell = document.createElement("th")
      glossCell.textContent = gloss
      row.appendChild(glossCell)

      // Add a cell for each lexicon
      this.lexicons.forEach((lexicon) => {
        const word = lexicon.words.find((word) => word.gloss === gloss)
        const cell = document.createElement("td")
        if(word?.form.length){
          cell.classList.add('found')
          cell.textContent = word.form
          if (word?.metadata?.links){
            let {start, end, fileName} = word.metadata.links[0]
            cell.dataset.start = start
            cell.dataset.end = end
            cell.dataset.fileName = fileName
          }
        } else {
          cell.classList.add('missing')
          cell.textContent = "-"
        }
        row.appendChild(cell)
      })

      let tds = Array.from(row.querySelectorAll('td'))

      let noOverlap = tds
          .filter(td => td.classList.contains('found'))
          .length < 2 

      if(noOverlap){ 
        row.classList.add('no-overlap') 
      } else {
        row.classList.add('overlap')
      }
      

      // Add the row to the table
      table.appendChild(row)
    })

    // Add the table to the component
    this.appendChild(table)
  }

  listen(){

    document.querySelector('[name="overlap-only"]')
      .addEventListener('change', changeEvent => {
        console.log(changeEvent.target)
        // this.querySelectorAll('.no-overlap').hidden = true
      })

    this.addEventListener('click', clickEvent => {
      if(clickEvent.target.matches('td')){
        let {start, end, fileName} = clickEvent.target.dataset

        if(start> 0){
          if(!this.audios[fileName]){
            this.audios[fileName] = new Audio()
            this.audios[fileName].src = `./fulani/${fileName.split('_')[0]}/${fileName}`
            console.log(this.audios[fileName])
          }
          let audio = this.audios[fileName]
          // audio.addEventListener('canplaythrough', () => {
            audio.currentTime = start
            setTimeout(() => {
              audio.pause()
            }, end - start)
            audio.play()
          // })
        }
      }
    })
  }
}

// Define the custom element
customElements.define("comparative-lexicon", ComparativeLexicon)
