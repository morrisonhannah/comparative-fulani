class TimestampView extends HTMLElement {
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
    return ["src"]
  }

  attributeChangedCallback(attribute, oldValue, newValue){
    if(attribute == "src"){
      this.fetch(newValue)
    }
  }

  set data(timestamp){
    this.timestamp = timestamp
    this.render()
  }

  get data(){
    return this.timestamp
  }

  render(){
    console.log(`render…`)
    this.dataset.start = this.timestamp.start
    this.dataset.end = this.timestamp.end
    this.innerHTML += `
      <span class="start">${this.timestamp.start.toFixed(2)}</span> 
      <span class="start">${this.timestamp.end.toFixed(2)}</span>
    `
  }

  listen(){
    this.addEventListener('click', clickEvent => {
    })
  }
}

export {TimestampView}
customElements.define('timestamp-view', TimestampView)
