let tableToJSON = (table, columnNames = null) => {
  console.table({columnNames})

  let trs = Array.from(table.querySelectorAll('tr'))

  let columnHeaders = Array.from(trs[0].querySelectorAll('td,th'))
    .map(cell => cell.textContent.trim())

  if(columnNames){
    columnHeaders = columnNames
  }

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
      let cells = Array.from(row.querySelectorAll('td'))
        .map(cell => cell.textContent.trim())

      let entries = columnHeaders.map((_, i) => 
        [columnHeaders[i], cells[i]]
      )

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

