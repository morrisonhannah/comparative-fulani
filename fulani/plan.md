Plan
====

Hi Hannah,

I keep thinking about your project because I think it is rad. However, I think munging through this much data might be a little overwhelming for you. I suggest that we work together to get your project going: it will be a learning experience for you, but I think it makes sense to help you modulate where you focus your efforts. Since the audio-enabled cognate comparison table was your initial idea, I suggest that you prioritize the design and implementation of that, and I’ll help your bootstrap your data into `JSON` files — scraping all that data is kind of a non-trivial project and we haven’t gone over that stuff much in class. I will try to document my work in that regard, so that you (and other students, if that’s okay with you) can learn about the process.

For each language, we’ll create two files:

1. The corpus index file, which has metadata about each bundle and links to the bundle’s assets (original sources, texts, images, audio files). 
2. The text file, which in most cases represents a “wordlist”. (In the data here, as far as I can tell, all the bundles contain single wordlist.)

I will produce data like this:

`ucla-fulani-index.json`

```json
{
  "metadata": {
    "title": "Fulani documentation from the UCLA Phonology Archive",
    "more": "metadata…"
  },
  "urls": [
    "./fub/fub-text.json",
    "./ffm/ffm-text.json",
    "./fuv/fuv-text.json",
    "./fuh/fuh-text.json",
    "./fuc/fuc-text.json",
    "./fuf/fuf-text.json"
  ]
}
```

`ffm/ffm-text.json` // there will be six of these
```json
{
  "metadata": {
    "title": "Maasina Fulfulde wordlist",
    "originalMetadata": { // keeping original data is always a good idea
      "Recording": "1",
      "Filename (WAV)": "ffm_word-list_1962_01.wav",
      "Filename (MP3)": "ffm_word-list_1962_01.mp3",
      "Language:": "Fulfulde (Maasina)",
      "SIL Code": "FFM",
      "Recording Contents": "Word List",
      "Recording Location": "Unknown; speaker is from Mopti, Mali",
      "Recording Date": "12 March, 1962",
      "Fieldworkers": "Peter Ladefoged",
      "Speakers": "Umaru",
      "WAV Digitization Quality": "44.1 K, 16-bit sound depth (bit rate=705 kbps)",
      "MP3 Bit Rate": "56 kpbs",
      "Original Recording Medium": "reel tape",
      "Unicode Word List": "ffm_word-list_1962_01.html",
      "Unicode Word List Entries": "1 - 32",
      "Tiff Image": "ffm_word-list_1962_01.tif",
      "Tiff Image 2": "ffm_word-list_1962_02.tif",
      "JPG Image": "ffm_word-list_1962_01.jpg",
      "JPG Image 2": "ffm_word-list_1962_02.jpg",
      "TIFF Image Quality": "300 dpi",
      "JPG Quality": "300 dpi",
      "Rights of Access": "This work is licensed under a Creative Commons License."
    },
    "links": [ // we can talk about this
      {
        "type": "audio",
        "id": "ffm_word-list_1962_01",
        "url": "ffm_word-list_1962_01.wav",
      },
      {
        "type": "audio",
        "id": "list_1962_02",
        "url": "ffm_word-list_1962_02.wav",
      },
      {
        "type": "audio",
        "id": "list_1962_03",
        "url": "ffm_word-list_1962_03.wav"
      },
      {
        "type": "image",
        "id": "ffm_word-list_1962_01",
        "url": "ffm_word-list_1962_01.jpg",
        "note": ["there is no ffm_word-list_1962_02.jpg, shrug"]
      },
      {
        "type": "image",
        "id": "ffm_word-list_1962_03",
        "url": "ffm_word-list_1962_03.jpg"
      },
      {
        "type": "metadata",
        "id": "ffm_record_details",
        "url": "ffm_record_details.html"
      }
    ]
  },
  "sentences": [  	 
    {
      "transcription": "to paadˀaa",
      "translation": "Where are you off to?",
      "links": [
        {
          "type": "timestamp",
          "id": "ffm_audio1",
          "start": "0",
          "end": "2"
        }
      ],
      "words": [
        {
          "form": "to",
          "gloss": ""  // will try to figure out some glosses where possible. might be be best to stick to simple words that are clearly cognate!
        },
        {
          "form": "paadˀaa",
          "gloss": "",
        }
      ]
    }
  ]
}
```

Phew! 

This is still kind of skeletal, but I thought it would be good to set up a baseline for your cognate tables: all the necessary information for audio playback is there, too. 


Now,there is the question of the timestamps. We can talk about this 


1. For each language:
    1. Go to the language’s bundle page, eg <http://archive.phonetics.ucla.edu/Language/FFM/ffm.html>
    1. Parse the table on the language index page - `parseIndexMetadataTable()`
    1. Handle bundle metadata
        1. Get the metadata file link (`Details`)
        1. Download that file
        1. Parse the table in the metadata file into  a `metadata` object

