// parse-audacity-sound-finder-settings.js

let example = `LabelSounds:measurement="peak" post-offset="0" pre-offset="0" sil-dur="1" snd-dur="1" text="Sound ##1" threshold="-30" type="around"`


example = example
  .replace("Sound ##1", "Sound_##1")
  .replaceAll('"', '')

let [label, values] = example.split(':')

console.log(values)

let settings = values.split(/\p{White_Space}+/gu)
  .filter(Boolean)
  .reduce((settings,pair) => {
    let [variable, value] = pair.split('=')
    settings[variable] = value
    return settings
  }, {})


console.log(JSON.stringify(settings,null,2))