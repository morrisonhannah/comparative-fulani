import { assertEquals } from "https://deno.land/std@0.178.0/testing/asserts.ts";
import {  joinLexicons, joinLexiconsOnGloss } from './join-lexicons.js'

Deno.test("join lexicons", () => {
  let input = [
    {words: [{form: "gato", gloss: "cat"}]},
    {words: [{form: "chat", gloss: "cat"}]}
  ]

  let result = [
    {
     "cat": [
        [{form:"gato", gloss: "cat"}],
        [{form:"chat", gloss: "cat"}]
      ]
    }
  ]

  assertEquals(joinLexiconsOnGloss(input), result)
})


Deno.test("join lexicons", () => {
  let input = [
    {words: [{form: "gato", gloss: "cat"}, {form: "perro", gloss: "dog"}]},
    {words: [{form: "chat", gloss: "cat"}, {form: "chien", gloss: "hound"}]}
  ]

  let result = [
    {
     "cat": [
        [ {form:"gato", gloss: "cat"}, {form:"chat", gloss: "cat"} ]
      ]
    },
    {
     "dog": [
        [
          {form:"perro", gloss: "dog"}
        ]
      ]
    },
    {
      "hound": [
         [
           {form:"chien", gloss: "dog"}
         ]
       ]
     }
  ]

  assertEquals(joinLexiconsOnGloss(input), result)
}) 