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

--Override the default update and subscriptions functions
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

--When the receiveHashes port is sent a message, call the AddRecord method in update
subscriptions : Model -> Sub Msg
subscriptions model =
  receiveHashes AddRecord

--So our program can store results in local storage
--Need to use javascript method inside index.html
port setStorage : Model -> Cmd msg

--When an update has to occur, we want to update the local storage of any changes
--Call the port to the javascript function, our model = all our information
updateAndStore : Msg -> Model -> (Model, Cmd Msg)
updateAndStore msg model = 
  let
      (newModel, cmds) = 
        update msg model
  in
     ( newModel
     , Cmd.batch [ setStorage newModel, cmds ]
   )

--Define the Model, just a list of records, the current field inputs and a universal id
type alias Model = 
  { records : List Record
  , plainText : String
  , passPhrase : String
  , uid : Int
  }

--Every record has all the hashes associated with it, and its id
type alias Record = 
  { hashes : Array String
  , id : Int
  }

--Our actual model definition, initially an empty list of records, uid starts at 0
--And our two fields are empty.
ourModel : Model
ourModel = 
  { records = []
  , uid = 0
  , plainText = ""
  , passPhrase = ""
  }

--Record constructor, look at how we can use the same variable names, smart compiler :)
newRecord : Array String -> Int -> Record
newRecord hashes id = 
  { hashes = hashes
  , id = id
  }

--Initialize the website, use the localstorage information if it exists
init : Maybe Model -> ( Model, Cmd Msg )
init savedModel = 
  Maybe.withDefault ourModel savedModel ! []

-----------------------------------------------
--All of our update functions
--These occur whenever the user performs an action
--Such as clicking, typing, etc.
--We make each function a type so we can call it globally
-----------------------------------------------
type Msg
    = NoOp
    | AddRecord (Array String)
    | DeleteRecord Int
    | UpdatePlainText String
    | UpdatePassphrase String
    | ComputeHashes

--The update function accepts a message, the model, and returns the model and a command message
update : Msg -> Model -> ( Model, Cmd Msg )
update msg model = 
  case msg of
    --Nothing has been entered by the user, dont change anything
    --the ! [] means to return an empty command, is not the only way as seen on the last function
    NoOp ->
      model ! []

    --Most used function, will add a new record when given the Array of hashes, only if the input fields
    --Are not empty, increments the universal id as well.
    --This function is called by the subscription function after the hashes are computed by the JS
    AddRecord hashes ->
      { model
        | uid = model.uid + 1
        , plainText = ""
        , passPhrase = ""
        , records = 
            if String.isEmpty model.plainText then
               model.records
            else
               model.records ++ [newRecord hashes model.uid ]
      }
        ! []

    --If we hit the dleete button, we want to filter, so only keep the records that dont have the same id we are trying
    --to delete.
    DeleteRecord recordId ->
      { model
        | records = List.filter(\t -> t.id /= recordId) model.records
      }
        ! []

    --These following two methods are used to just update the global variables holding the input
    UpdatePlainText string ->
      { model | plainText = string }
        ! []

    UpdatePassphrase string ->
      { model | passPhrase = string }
        ! []

    --When we click the submit button, this method is called first,
    --It calls the javascript port 'getHashes' and we must give it a single element because thats how it wants it
    ComputeHashes ->
      ( model, getHashes ([model.plainText, model.passPhrase]))

-- This is the main view, every function returns an Html virtual dom element.
-- Creates the navbar and then the input/records output.
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

-- Simple bootstrap navbar with some links, as well as the PDF link
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
        ,
          li []
          [
            Html.a [ href "WildingTyler_Assignment1.pdf" ]
            [
              text "Encryption Writeup PDF"
            ]
          ]
        ]
      ]
    ]
  ]

--Input fields, you can see how the input fields will call the functions whenever the user types
--As well as the button will call a function when its clicked.
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
      , id "plaintext-input"
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
      , id "passphrase-input"
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

--So to view the records we perform a map operation, basically, apply a function to every
--element in a list
viewRecords : List Record -> Html Msg
viewRecords records = 
  div [ class "container", id "allRecords" ]
  [ 
    h1 [] 
    [
      text "Records"
    ]
  ,
    div []
      (List.map viewHashesInRecord records)
  ]

--For every record, we are going to view its hashes
viewHashesInRecord : Record -> Html Msg
viewHashesInRecord record =
  viewSingleRecord (Array.toList record.hashes) record.id

--Once we have the list of hashes, use a map operation to create list elements for each.
--The list only contains the raw hash, so zip it together with some headings
--This makes a list of pairs, so we can bold the headings
viewSingleRecord : List String -> Int -> Html Msg
viewSingleRecord list id =
  div [ class "col-md-4" ]
  [
    ul [ class "record" ]
      (List.map createListItem (zip [ "Plain Text:"
                                    , "Passphrase:"
                                    , "AES:"
                                    , "DES:"
                                    , "Triple DES:"
                                    , "Rabbit:"
                                    , "RC4:"] list))
  ,
    div [ class "text-center" ] [

      button [ class "btn btn-danger", onClick (DeleteRecord id) ]
      [
        text "Delete"
      ]
    ]
  ]

createListItem : (String, String) -> Html Msg
createListItem (heading, content) = 
  li [ class "recordItem"]
  [
    label [ class "boldtext" ]
    [
      text heading
    ]
  ,  
    text content
  ]

--Simple zip function, takes two lists of elements and returns
--A list of pairs, using a built in function and the , operator is short for ((,) (a,b))
zip : List a -> List b -> List (a,b)
zip list1 list2 = List.map2 (,) list1 list2
