---
lang: en
title:  \<timestamp-view\>
css: timestamp-view.css
---

<div>

# \<timestamp-view\>

</div>

<main>
::: {#example .section}
## Example

```{=html}
<timestamp-view id="basic" type="module"></timestamp-view>
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
import {TimestampView} from './TimestampView.js'

window.timestampView = document.querySelector('timestamp-view')

document.querySelector('#basic').data = {start: 0.1, end: 2.4}
</script>

