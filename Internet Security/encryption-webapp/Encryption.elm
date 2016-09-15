port module Encryption exposing (..)

import Dom
import Html exposing (..)
import String
import Task

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
    , subscriptions = \_ -> Sub.none
    }

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
  ,  plainText : String
  ,  passPhrase : String
  }

--Every record has the input, results, and an ordering
type alias Record = 
  { plainText : String
  , passPhrase : String
  , hashes : List String
  , id : Int
  }

ourModel : Model
ourModel = 
  { records = []
  , uid = 0
  }

--Define default record
newRecord : String -> String -> Int -> Record
newRecord orgText password id = 
  { plainText = orgText
  , passPhrase = password
  , hashes = [] --No computed hashes yet
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
    | AddRecord String String
    | DeleteRecord Int
    | UpdatePlainText String
    | UpdatePassphrase String

update : Msg -> Model -> ( Model, Cmd Msg )
update msg model = 
  case msg of
    NoOp ->
      model ! []

    AddRecord orgText password ->
      { model
        | records = 
            if String.isEmpty orgText then
               model.records
            else
               model.records ++ [newRecord orgText password model.uid]
               -- here when we make the record, we could call the cryptojs functions
               -- and pass the result it returns
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

-- Define the View finally

view : Model -> Html Msg
view model = 
  div
    [ class "container"
    , style [ ("visibility", "hidden") ]
    ]
    [ section
      [ class "app" ]
      [ viewInput model
      , viewRecords model.records
      ]
    ]

viewInput : Model -> Html Msg
viewInput model = 
  h1
    [ class "instructions" ]
    [ text "Please enter your plaintext and passphrase..." ]
  
  div
    [ class "formFields" ]
    [ section 
      [ input 
        [ class "formField" 
        , placeholder "Plaintext"
        , autofocus True
        , onInput UpdatePlainText
        ]
        []
      ]
      ,
      [ input
        [ class "formField"
        , placeholder "Passphrase"
        , autofocus False
        , onInput UpdatePassphrase
        ]
        []
      ]
      ,
      [ button
         [ onClick AddRecord model.plaintext model.passphrase
         ]
      ]
    ]
