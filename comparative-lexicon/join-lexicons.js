let joinLexicons = (lexicons, field) => {
  let values = lexicons
    .flatMap(lexicon => 
      lexicon.words.map(word => word[field])
    )
    .reduce((unique, word, i, values) => {
      if(i === 0){
        unique = Array.from(new Set(values))
      }
      return unique
    }, [])

  let byValue = values
    .map(value => ({
      [value]: lexicons.map(lexicon => 
        lexicon.words.filter(word => word[field] = value)  
      )
    })
    )

  return byValue 
}

let joinLexiconsOnGloss = lexicons => joinLexicons(lexicons, 'gloss')


export {
  joinLexicons,
  joinLexiconsOnGloss
}
