class ComparativeLexicon extends HTMLElement {
  constructor() {
    super()
    this.texts = []
    this.listen()
  }

  // Define the data setter
  set data(texts) {
    if (!Array.isArray(texts)) {
      throw new Error("Data must be an array of texts")
    }

    this.texts = texts
    this.render()
  }

  async fetch(indexUrl) {
    let response = await fetch(indexUrl)
    let index = await response.json()
    this.index = index
    await this.fetchTexts(index)
  }

  async fetchTexts({ metadata, urls }) {
    this.metadata = metadata
    this.urls = urls
    for await (let url of urls) {
      let response = await fetch(url)
      let text = await response.json()
      this.texts.push(text)
    }
  }

  connectedCallback() {
  }

  static get observedAttributes() {
    return ["src"]
  }

  attributeChangedCallback(attribute, oldValue, newValue) {
    if (attribute == "src") {
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
    this.texts.forEach((lexicon) => {
      const headerCell = document.createElement("th")
      headerCell.textContent = lexicon.language
      headerRow.appendChild(headerCell)
    })

    // Add the header row to the table
    table.appendChild(headerRow)

    // Create a row for each gloss
    const glosses = new Set()
    this.texts.forEach((lexicon) => {
      lexicon.words.forEach((word) => {
        glosses.add(word.gloss)
      })
    })

    glosses.forEach((gloss) => {
      const row = document.createElement("tr")

      // Add the gloss to the first cell
      const glossCell = document.createElement("td")
      glossCell.textContent = gloss
      row.appendChild(glossCell)

      // Add a cell for each lexicon
      this.texts.forEach((lexicon) => {
        const word = lexicon.words.find((word) => word.gloss === gloss)
        const cell = document.createElement("td")
        cell.textContent = word ? word.form : "-"
        row.appendChild(cell)
      })

      // Add the row to the table
      table.appendChild(row)
    })

    // Add the table to the component
    this.appendChild(table)
  }
}

// Define the custom element
customElements.define("comparative-lexicon", ComparativeLexicon)
