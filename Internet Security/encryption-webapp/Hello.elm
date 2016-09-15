module Hello exposing (..)

import Html exposing (text)

import Bootstrap.Grid exposing (..)
import Bootstrap.Wells exposing (..)

import Html

view = containerFluid
  [
    row
    [
      column [ExtraSmall Two, Small Two, Medium Four, Large Four] [],
      column [ExtraSmall Ten, Small Ten, Medium Eight, Large Eight]
      [
        well WellLarge[]
        [
          Html.h1 []
          [
            Html.text "Hello World!"
          ]
        ]
      ]
    ]
  ]

main = 
    view
