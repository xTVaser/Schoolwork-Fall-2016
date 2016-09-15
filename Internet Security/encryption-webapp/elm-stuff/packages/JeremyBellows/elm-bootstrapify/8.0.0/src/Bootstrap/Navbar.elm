module Bootstrap.Navbar exposing
  (
   NavbarType(DefaultNavbar, InverseNavbar, FormNavbar),
   navbar,
   navbarHeader,
   navbarBrand,
   navbarCollapse,
   navbarHamburger,
   NavbarListAdjustment(NavbarDefault,NavbarRight,NavbarLeft,NavbarJustified),
   NavbarPillsOptions(PillsNotStacked, PillsStacked),
   NavbarOptions(NavbarNav, NavbarTabs, NavbarPills),
   navbarList
  )

{-| Functions for generating Bootstrap navbar elements

# Navbar
@docs NavbarType, navbar, navbarHeader, navbarBrand, navbarCollapse, navbarHamburger

# Navbar List
@docs NavbarListAdjustment, NavbarPillsOptions, NavbarOptions, navbarList

-}

import Html exposing (..)
import Html.Attributes exposing (..)

--Navbar
----------------------------------------------------------------------------

{-|
  Different types of Navbar styles
-}
type NavbarType =
    DefaultNavbar
  | InverseNavbar
  | FormNavbar

{-| Generates a navbar html element

    navbar DefaultNavbar [] []
-}
navbar : NavbarType ->  List (Attribute msg) -> List (Html msg) -> Html msg
navbar navbarType attributes htmlList =
  let
    navbarTypeClass =
      case navbarType of
        DefaultNavbar -> "navbar-default"
        InverseNavbar -> "navbar-inverse"
        FormNavbar -> "navbar-form"
    navbarClass = "navbar " ++ navbarTypeClass
    attributes = class navbarClass :: attributes
  in
    nav attributes htmlList

{-| Generates a navbar header html element

    navbarHeader [] []
-}
navbarHeader : List (Attribute msg) -> List (Html msg) -> Html msg
navbarHeader attributes htmlList =
  let
    attributes = class "navbar-header" :: attributes
  in
    div attributes htmlList

{-| Generates a navbarBrand html element

    navbarBrand [] []
-}
navbarBrand : List (Attribute msg) -> List (Html msg) -> Html msg
navbarBrand attributes htmlList =
  let
    attributes = class "navbar-brand" :: attributes
  in
    a attributes htmlList

{-| Generates a collapse div for navbar lists

    navbarCollapse [ id "collapseMe" ]
     [
      navbarList (NavbarPills PillsStacked) NavbarRight []
       [
        li []
         [
          a []
           [
            text "One"
           ]
         ]
       ]
     ]
-}
navbarCollapse : List (Attribute msg) -> List (Html msg) -> Html msg
navbarCollapse attributes htmlList =
  let
    attributes = class "collapse navbar-collapse" :: attributes
  in
    div attributes htmlList

{-| Generates a collapse breadcrumb button for navbar lists. Parameter is for css selector depicting collapsable target

    navbarHamburger "#collapseMe"

-}
navbarHamburger : String -> Html msg
navbarHamburger target =
  let
    dataTargetAttribute = attribute "data-target" target
    attributes =  [ attribute "data-toggle" "collapse", class "navbar-toggle", dataTargetAttribute ] ++ attributes
  in
    button attributes
     [
      span [ class "icon-bar" ] [],
      span [ class "icon-bar" ] [],
      span [ class "icon-bar" ] []
     ]

{-| A set of options for adjusting a navbar list
-}
type NavbarListAdjustment =
    NavbarDefault
  | NavbarRight
  | NavbarLeft
  | NavbarJustified

{-|
  Option for Navbar Pills
-}
type NavbarPillsOptions =
    PillsNotStacked
  | PillsStacked

{-|
  A set of Navbar Options
-}
type NavbarOptions =
    NavbarNav
  | NavbarTabs
  | NavbarPills NavbarPillsOptions

{-| Generates a navbarList html element

    navbarList (NavbarPills PillsStacked) NavbarRight []
     [
     ]
-}
navbarList : NavbarOptions -> NavbarListAdjustment -> List (Attribute msg) -> List (Html msg) -> Html msg
navbarList navbarOption navbarListAdjustment attributes htmlList =
  let
    navbarListAdjustmentClass =
      case navbarListAdjustment of
        NavbarDefault -> ""
        NavbarLeft -> "navbar-left"
        NavbarRight -> "navbar-right"
        NavbarJustified -> "nav-justified"
    getNavbarPillsOptionClass pillsOption =
      case pillsOption of
        PillsNotStacked -> ""
        PillsStacked -> "nav-stacked"
    getNavbarOptionClass navbarOption =
      case navbarOption of
        NavbarNav -> "navbar-nav"
        NavbarTabs -> "navbar-tabs"
        NavbarPills pillsOption -> "nav-pills " ++ (getNavbarPillsOptionClass pillsOption)
    navbarClass = "nav " ++ (getNavbarOptionClass navbarOption) ++ " " ++ navbarListAdjustmentClass
    attributes = class navbarClass :: attributes
  in
    ul attributes htmlList

----------------------------------------------------------------------------
