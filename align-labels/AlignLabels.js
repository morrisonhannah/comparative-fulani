import {TextView} from 'https://docling.net/book/docling/text/text-view/TextView.js'

class AlignLabels extends HTMLElement { 
  constructor(){
    super()
    this.innerHTML = `
      <header>
        <h1>Align-labels</h1>
      </header>
      <section id=sentences-section>
        <h2>Sentences</h2>
        <text-view></text-view>
        </section>
      <section id=timestamps-section>
        <h2>Timestamps</h2>
        <div id=timestamps></div>
      </section>
      `
    this.listen()
  }

  connectedCallback(){

  }


  static get observedAttributes(){
    return ["text-src", "labels-src"]
  }
  
  attributeChangedCallback(attribute, oldValue, newValue){
    if(attribute == "text-src"){
      this.fetchText(newValue)
    }
    if(attribute == "labels-src"){
      this.fetchLabels(newValue)
    }
  }

  async fetchText(url){
    let response = await fetch(url)
    let text = await response.json()
    console.log(JSON.stringify(text))
    this.text = text
    this.renderText(text)
  }

  async fetchLabels(url){
    let response = await fetch(url)
    let plaintextTextLabels = await response.text()
    let timestamps = this.parseLabels(plaintextTextLabels)

    this.renderTimestamps(timestamps)
  }

  parseLabels(plaintextTextLabels){
    console.log(plaintextTextLabels.trim)
    let labelLines = plaintextTextLabels
      .trim()
      .split("\n")

    let timestamps = labelLines.map(labelLine => {
      let [start, end, label] = labelLine.split("\t")
      
      return {
        start: parseFloat(start),
        end: parseFloat(end),
        label: label
      }
    })

    return timestamps
  }

  renderTimestamps(timestamps){
    console.table(timestamps)
    timestamps.forEach((timestamp,i) => {
      let div = document.createElement('div')
      div.id = `timestamp_${i}`
      div.classList.add('timestamp')
      div.innerHTML += `
        <span class="start">${timestamp.start.toFixed(2)}</span> 
        <span class="start">${timestamp.end.toFixed(2)}</span>
      `
      this.querySelector('section#timestamps-section div#timestamps')
        .append(div)

    })

  }

  renderText(text){ 
    text.sentences.forEach(sentence => sentence.metadata = {} )
    this.querySelector('text-view').data = text
  }


  set data(data){
    this.labels = data.labels
    this.metadata = data.metadata
    this.render()
  }

  get data(){
    return {
      labels: this.labels,
      metadata: this.metadata
    }
  }

  render(){
    // edit .innerHTML here
  }

  listen(){
    this.addEventListener('click', clickEvent => {
      if(clickEvent.target.matches()){

      }
    })
  }
}

export {AlignLabels}
customElements.define('align-labels', AlignLabels)
