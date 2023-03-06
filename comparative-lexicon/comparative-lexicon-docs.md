---
lang: en
title:  \<sample-component\> docs
css: sample-component.css
---

<main></section>

<section id=example class="section">

## Example

Given an array of lexicons, this component generates a table where each row shows forms that share a gloss. 

```{=html}
<comparative-lexicon id=romance></comparative-lexicon>

<script type=module>
import {ComparativeLexicon} from './ComparativeLexicon.js'
let comparativeLexicon = document.querySelector('comparative-lexicon#romance')

window.lexicons = [{
      "language": "French",
      "words": [{
          "form": "chien",
          "gloss": "dog"
        },
        {
          "form": "chat",
          "gloss": "cat"
        },


        {
          "form": "courir",
          "gloss": "run"
        },
        {
          "form": "sauter",
          "gloss": "jump"
        }
      ]
    },
    {
      "language": "Spanish",
      "words": [{
          "form": "perro",
          "gloss": "dog"
        },
        {
          "form": "gato",
          "gloss": "cat"
        },
        {
          "form": "pájaro",
          "gloss": "bird"
        },
        {
          "form": "correr",
          "gloss": "run"
        },
        {
          "form": "saltar",
          "gloss": "jump"
        }
      ]
    },
    {
      "language": "Romanian",
      "words": [{
          "form": "câine",
          "gloss": "dog"
        },
        {
          "form": "pisică",
          "gloss": "cat"
        },
        {
          "form": "pasăre",
          "gloss": "bird"
        },
        {
          "form": "alerga",
          "gloss": "run"
        },
        {
          "form": "sări",
          "gloss": "jump"
        }
      ]
    },
    {
      "language": "Basque",
      "words": [{
          "form": "txakurra",
          "gloss": "dog"
        },
        {
          "form": "katu",
          "gloss": "cat"
        },
        {
          "form": "txoria",
          "gloss": "bird"
        },
        {
          "form": "korrika",
          "gloss": "run"
        },
        {
          "form": "salto",
          "gloss": "jump"
        }
      ]
    }, {
      language: "Portuguese",
      words: [{
          "form": "cão",
          "gloss": "dog"
        },
        {
          "form": "gato",
          "gloss": "cat"
        },
        {
          "form": "pássaro",
          "gloss": "bird"
        },
        {
          "form": "correr",
          "gloss": "run"
        },
        {
          "form": "saltar",
          "gloss": "jump"
        },
      ]},
      {
        language: "Occitan",
        words: [{
            "form": "chen",
            "gloss": "dog"
          },
          {
            "form": "gat",
            "gloss": "cat"
          },
          {
            "form": "aucèl",
            "gloss": "bird"
          },
          {
            "form": "corrèr",
            "gloss": "run"
          },
          {
            "form": "sautar",
            "gloss": "jump"
          },
        ]
      }
    ]

comparativeLexicon.data = lexicons

  </script>
```


```html
<comparative-lexicon id=romance>
</comparative-lexicon>

<script type=module>
import {ComparativeLexicon} from './ComparativeLexicon.js'
let comparativeLexicon = document.querySelector('comparative-lexicon#romance')

comparativeLexicon
  .data = [{
      "language": "French",
      "words": [
        { "form": "chien", "gloss": "dog" },
        { "form": "chat", "gloss": "cat" },
        { "form": "courir", "gloss": "run" },
        { "form": "sauter", "gloss": "jump" }
      ]
    },
    {
      "language": "Spanish",
      "words": [
        { "form": "perro", "gloss": "dog" },
        { "form": "gato", "gloss": "cat" },
        { "form": "pájaro", "gloss": "bird" },
        { "form": "correr", "gloss": "run" },
        { "form": "saltar", "gloss": "jump" }
      ]
    },
    {
      "language": "Romanian",
      "words": [
        { "form": "câine", "gloss": "dog" },
        { "form": "pisică", "gloss": "cat" },
        { "form": "pasăre", "gloss": "bird" },
        { "form": "alerga", "gloss": "run" },
        { "form": "sări", "gloss": "jump" }
      ]
    },
    {
      "language": "Basque",
      "words": [
        { "form": "txakurra", "gloss": "dog" },
        { "form": "katu", "gloss": "cat" },
        { "form": "txoria", "gloss": "bird" },
        { "form": "korrika", "gloss": "run" },
        { "form": "salto", "gloss": "jump" }
      ]
    }, 
    {
      "language": "Portuguese",
      "words": [
        { "form": "cão", "gloss": "dog" },
        { "form": "gato", "gloss": "cat" },
        { "form": "pássaro", "gloss": "bird" },
        { "form": "correr", "gloss": "run" },
        { "form": "saltar", "gloss": "jump" }
      ]
    },
      {
        "language": "Occitan",
        "words": [
          { "form": "chen", "gloss": "dog" },
          { "form": "gat", "gloss": "cat" },
          { "form": "aucèl", "gloss": "bird" },
          { "form": "corrèr", "gloss": "run" },
          { "form": "sautar", "gloss": "jump" }
        ]
      }
    ]
  </script>
```


</section>

<section id=attributes class="section">
## Attributes


### `.src`

Points to an `-index.json` file which lists `-lexicon.json` files to be fetched and loaded into the component.

</section>

<section id=methods class="section">
## Methods

</section>

<section id=data class="section">
## Data

</section>

<section id=events class="section">
## Events

</section>

<section id=layouts class="section">
## Layouts

</section>

<section id=see-also class="section">
## See also

</main>


<script type="module">
import {ComparativeLexicon} from './ComparativeLexicon.js'

window.comparativeLexicon = document.querySelector('comparative-lexicon')
</script>

