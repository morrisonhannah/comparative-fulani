---
lang: en
title: \<sample-component\>
viewport: width=device-width
---

<div>

# \<comparative-lexicon\>



</div>

<main>
::: {#example .section}
## Example


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



:::

::: {#attributes .section}
## Attributes
:::

::: {#methods .section}
## Methods
:::

::: {#data .section}
## Data
:::

::: {#events .section}
## Events
:::

::: {#layouts .section}
## Layouts
:::

::: {#see-also .section}
## See also
:::
</main>


 <script type="module">
import {ComparativeLexicon} from './ComparativeLexicon.js'

window.comparativeLexicon = document.querySelector('comparative-lexicon')
</script>
 