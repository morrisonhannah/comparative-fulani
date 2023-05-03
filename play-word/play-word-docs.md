---
lang: en
title:  \<play-word\> docs
css: play-word.css
---

<main>

A view of a word which dispatches a `request-play` event which can be used to play an audio link.

<section id=example>
## Example


```html
<play-word></play-word>
```

```{=html}
<play-word></play-word>
```



</section>

<section id=attributes>
## Attributes

`start` and `stop` attributes may be set directly on the component to indicate the offset into a parent’s media file. 

<strong>TODO</strong>: The values of the `start` and `stop` attributes my be in minute:second notation, e.g., `1:23` (string including ':'), or in seconds `83.0` (float including decimal) or milliseconds (integer).

### `start`

### `stop`


</section>

<section id=methods>
## Methods

### `.play()`

Dispatches a play request, which is played by the parent container with a media request.
</section>

<section id=data>
## Data

</section>

<section id=events>
## Events

</section>

<section id=layouts>
## Layouts

</section>

<section id=see-also>
## See also

</main>


<script type="module">
import {PlayWord} from './PlayWord.js'

window.playWord = document.querySelector('play-word')
</script>

