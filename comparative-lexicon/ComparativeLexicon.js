class ComparativeLexicon extends HTMLElement {
  constructor(){
    super()
    this.innerHTML = `
stuff here from component o boi  🌍🌍🌍
    `
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
    return ["src"]
  }

  attributeChangedCallback(attribute, oldValue, newValue){
    if(attribute == "src"){
      this.fetch(newValue)
    }
  }

  /*
  set data({metadata, dataType}){
    this.dataType = dataType
    this.metadata = metadata
    this.render()
  }

  get data(){
    return {
      dataType: this.dataType,
      metadata: this.metadata
    }
  }
  */

  render(){
    // edit .innerHTML
  }

  listen(){
    this.addEventListener('click', clickEvent => {
      if(clickEvent.target.matches()){

      }
    })
  }
}

export {ComparativeLexicon}
customElements.define('comparative-lexicon', ComparativeLexicon)
