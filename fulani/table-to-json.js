let tableToJSON = (table, columns = null) => {
  let trs = Array.from(table.querySelectorAll('tr'))

  let columnHeaders = Array.from(trs[0].querySelectorAll('td,th'))
    .map(cell => cell.textContent.trim())

  let rowHeaders = trs
    .slice(1) // first row is headers
    .map(row => {
      let cells = Array.from(row.querySelectorAll('td,th'))
        .map(cell => cell.textContent.trim())

      return cells[0]
    })

  let data = trs
    .slice(1) // first row is column headers
    .map(row => {
      let cells = Array.from(row.cells)
        .map(cell => cell.textContent.trim())

      let entries = columnHeaders.map((_, i) => 
        [columnHeaders[i], cells[i]]
      )
      
      if(columns){
        entries = entries.filter(([key, value]) => 
          columns.includes(key)
        )
      }

      let item = Object.fromEntries(entries)
      return item
    })

  return {
    rowHeaders,
    columnHeaders,
    data
  }
}

export {
  tableToJSON
}

  // document.designMode = 'on'
  // console.table(table2json(document.querySelector('table')))
