
class AlignLabels extends HTMLElement { 
  constructor(){
    super()
    this.innerHTML = `
      <header>
        <h1>Align-labels</h1>
      </header>
      <section id=sentences-section>
        <h2>Sentences</h2>
        <div id=sentences></div>
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
    this.renderText(text)
  }

  async fetchLabels(url){
    let response = await fetch(url)
    let plaintextTextLabels = await response.text()
    this.renderLabels(plaintextTextLabels)
  }

  renderLabels(plaintextTextLabels){
    plaintextTextLabels = plaintextTextLabels.trim()
    let labelLines = plaintextTextLabels.split("\n")

    let timestamps = labelLines.map(labelLine => {
      let [start, end, label] = labelLine.split("\t")
      
      return {
        start: parseFloat(start),
        end: parseFloat(end),
        label: label
      }
    })

    console.log(timestamps)
  }

  renderText(){

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
