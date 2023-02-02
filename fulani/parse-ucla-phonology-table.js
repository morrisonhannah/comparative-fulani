let table2json = (table, columns = null) => {
let clone = table.cloneNode(true)

table = clone 
let headers = Array.from(table.rows[0].cells).map(cell => cell.textContent)

  let data = Array.from(table.rows).slice(1)
    .map(row => {
      return headers.reduce((o, header, i) => {
        o[header] = row.cells[i].textContent.trim()
        return o
      }, {})
    })

  if (columns) {
    data = data.map(datum => Object.fromEntries(
      Object.entries(datum)
        .filter(([key, value]) => columns.includes(key))
      )
    )
  }

  return data
}

