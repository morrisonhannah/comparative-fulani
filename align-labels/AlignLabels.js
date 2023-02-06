class AlignLabels extends HTMLElement {
  constructor(){
    super()
    this.listen()
  }

  async fetch(url){
    let response = await fetch(url)
    let data = await response.json()
    this.data = data
  }

  connectedCallback(){

  }

  static get observedAttributes(){
    return ["src", "labels-src"]
  }

  attributeChangedCallback(attribute, oldValue, newValue){
    if(attribute == "src"){
      this.fetch(newValue)
    }
    if(attribute == "labels-src")
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
