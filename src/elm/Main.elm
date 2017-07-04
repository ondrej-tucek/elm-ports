port module Main exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import String
import Random exposing (Generator, generate, float, map, andThen, pair)
import Round



main : Program Never Model Msg
main =
    program
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }


-- MODEL

type alias Model =
    { item : String
    , itemList : List String
    , data : ( List Float, List Float )
    }


init : ( Model, Cmd Msg )
init =
    ( { item = ""
      , itemList = []
      , data = ( [], [] )
      }
    , (sendGraphData ( [], [] ))
    )


type Msg
    = AddItem String
    | PushItem
    | ItemList (List String)
    | UpdateRandom ( List Float, List Float )
    | Generate
    | Clear


-- port for sending strings out to JavaScript
port pushItem : String -> Cmd msg
port sendGraphData : ( List Float, List Float ) -> Cmd msg


-- SUBSCRIPTIONS
-- port for listening for itemList from JavaScript
port itemList : (List String -> msg) -> Sub msg

subscriptions : Model -> Sub Msg
subscriptions model =
    itemList ItemList


-- UPDATE
update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        AddItem newItem ->
            ( { model | item = newItem }, Cmd.none )

        PushItem ->
            ( model, (pushItem model.item) )

        ItemList newItemList ->
            ( { model | itemList = newItemList }, Cmd.none )

        UpdateRandom data_ ->
            ( { model | data = data_ }, (sendGraphData data_) )

        Generate ->
            ( model, generate UpdateRandom (genPairList 5) )

        Clear ->
            ( { model | data = ( [], [] ) }, (sendGraphData ( [], [] )) )


-- VIEW
view : Model -> Html Msg
view model =
    div []
        [ div
            [ style
                [ ( "border", "2px solid red" )
                , ( "margin", "30px 50px auto" )
                , ( "width", "300px" )
                , ( "padding", "10px 10px 10px 20px" )
                ]
            ]
            [ input [ style
                [ ( "margin", "0 10px" ) ]
                , onInput AddItem ] []
            , button [ onClick PushItem ] [ text "Push" ]
            , div [] [ text (String.join ", " model.itemList) ]
            ]
        , div
            [ style
                [ ( "border", "2px solid blue" )
                , ( "margin", "30px 50px auto" )
                , ( "width", "300px" )
                , ( "padding", "10px 10px 10px 50px" )
                ]
            ]
            [ button [ onClick Generate ] [ text "Generate" ]
            , span [ style [ ("padding", "0 60px 0 0") ] ] []
            , button [ onClick Clear ] [ text "Clear" ]
            ]
        , div
            [ style
                [ ( "border", "2px solid green" )
                , ( "margin", "30px 50px auto" )
                , ( "width", "300px" )
                , ( "padding", "10px 10px 10px 10px" )
                ]
            ]
            [ text ("dataX: " ++ toString (roundGraphData model "dataX"))
            , p [] []
            , text ("dataY: " ++ toString (roundGraphData model "dataY"))
            ]
        ]


genPairList : Int -> Generator ( List Float, List Float )
genPairList n =
    let
        minVal =
            0.5
        maxVal =
            9.5
    in
        pair (Random.list n (float minVal maxVal)) (Random.list n (float minVal maxVal))


roundGraphData : Model -> String -> List Float
roundGraphData model str =
    let
        numDig = 2
        data =
            case str of
                "dataX" -> List.sort (Tuple.first model.data)
                "dataY" -> Tuple.second model.data
                _ -> []

        roundData x =
            let
                r = Round.round numDig x
            in
                Result.withDefault x (String.toFloat r)
    in
        List.map roundData data
        -- List.map (\x -> Result.withDefault x (String.toFloat (Round.round numDig x)) ) data
        -- data
        --     |> List.map (toPrecision 2)
        --     |> List.map (Result.withDefault 0)

-- toPrecision : Int -> Float -> Result String Float
-- toPrecision digits value =
--     value
--     |>Round.round digits
--     |> String.toFloat

