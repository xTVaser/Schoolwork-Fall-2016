port module Encryption exposing (..)

import Dom
import Html exposing (..)
import String
import Task
import Array exposing (..)

import Html.App as App
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Html.Keyed as Keyed

import Json.Decode as Json



main : Program (Maybe Model)
main = 
  App.programWithFlags
    { init = init
    , view = view
    , update = updateAndStore
    , subscriptions = subscriptions
    }

--Call javascript function to generate the hashes
--Cmd msg = the return from the javascript function
port getHashes : List String -> Cmd msg

--Receive list of strings from javascript function.
port receiveHashes : (Array String -> msg) -> Sub msg

subscriptions : Model -> Sub Msg
subscriptions model =
  receiveHashes AddRecord


--So our program can store results in local storage
--Need to use javascript method inside index.html
port setStorage : Model -> Cmd msg

--When an update has to occur, we want to update the local storage
updateAndStore : Msg -> Model -> (Model, Cmd Msg)
updateAndStore msg model = 
  let
      (newModel, cmds) = 
        update msg model
  in
     ( newModel
     , Cmd.batch [ setStorage newModel, cmds ]
   )

--Define the Model, just a list of records
type alias Model = 
  { records : List Record
  , plainText : String
  , passPhrase : String
  , uid : Int
  }

--Every record has the input, results, and an ordering
type alias Record = 
  { hashes : Array String
  , id : Int
  }

ourModel : Model
ourModel = 
  { records = []
  , uid = 0
  , plainText = ""
  , passPhrase = ""
  }

--Define default record
newRecord : Array String -> Int -> Record
newRecord hashes id = 
  { hashes = hashes
  , id = id
  }

--Start the website

init : Maybe Model -> ( Model, Cmd Msg )
init savedModel = 
  Maybe.withDefault ourModel savedModel ! []

-----------------------------------------------
--All of our update functions
--These occur whenever the user performs an action
--Such as clicking, typing, etc.
-----------------------------------------------

type Msg
    = NoOp
    | AddRecord (Array String)
    | DeleteRecord Int
    | UpdatePlainText String
    | UpdatePassphrase String
    | ComputeHashes

update : Msg -> Model -> ( Model, Cmd Msg )
update msg model = 
  case msg of
    NoOp ->
      model ! []

    AddRecord hashes ->
      { model
        | records = 
            if Array.isEmpty hashes then
               model.records
            else
               model.records ++ [newRecord hashes model.uid ]
      }
        ! []

    DeleteRecord recordId ->
      { model
        | records = List.filter(\t -> t.id /= recordId) model.records
      }
        ! []

    UpdatePlainText string ->
      { model | plainText = string }
        ! []

    UpdatePassphrase string ->
      { model | passPhrase = string }
        ! []

    ComputeHashes ->
      ( model, getHashes ([model.plainText, model.passPhrase]))

-- Define the View finally

view : Model -> Html Msg
view model = 
  div []
  [ 
    div []
    [
      viewNavbar model
    ]
  ,
    div [ class "container" ]
    [ 
      viewInput model
    , viewRecords model.records
    ]
  ]

viewNavbar : Model -> Html Msg
viewNavbar model =
  div [ class "navbar navbar-default navbar-static-top" ]
  [
    div [ class "container" ]
    [
      div [ class "navbar-header" ]
      [
        a [ class "navbar-brand" ]
        [
          text "Assignment 1 - Encryption"
        ]
      ]
    ,
      div [ class "navbar-collapse collapse" ]
      [
        ul [ class "nav navbar-nav" ]
        [
          li []
          [
            Html.a [ href "http://notturing.ddns.net" ]
            [
              text "Back to notTuring"
            ]
          ]
        ]
      ]
    ]
  ]

viewInput : Model -> Html Msg
viewInput model = 
  div [ class "container" ] 
  [
    h1 [ class "instructions" ]
    [
      text ("Please enter your plaintext and passphrase...")
    ]
  ,
    div [ class "form-group" ] 
    [
      input [
        class "form-control" 
      , placeholder "Plaintext"
      , autofocus True
      , onInput UpdatePlainText
      ] []
    ]
  ,
    div [ class "form-group" ]
    [
      input [
        class "form-control"
      , placeholder "Passphrase"
      , autofocus False
      , onInput UpdatePassphrase
      ] []
    ]
  ,
    div [ class "form-group" ]
    [
      button [class "btn btn-primary", onClick ComputeHashes ]
      [
        text ("Encrypt!")
      ] 
    ]
  ]

viewRecords : List Record -> Html Msg
viewRecords records = 
  div [ class "container" ]
  [ 
    Keyed.ul [ class "records" ] <|
    List.map viewKeyedRecord records
  ]

viewKeyedRecord : Record -> (String, Html Msg)
viewKeyedRecord record =
  ( toString record.id, viewSingleRecord (Array.toList record.hashes) )

viewSingleRecord : List String -> Html Msg
viewSingleRecord list =
  ul [class "record" ]
    (List.map createListItem list)
     

createListItem : String -> Html Msg
createListItem string = 
  li [class "recordItem"]
  [
    text string
  ]
