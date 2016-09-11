module Main where

import Lib

main = menu

menu :: IO ()
menu = do

    putStrLn "Enter some text to be encrypted: "
    origString <- getLine

    putStrLn . unlines $ map concatNums (menuOptions origString)
    choice <- getLine

    case validSelection choice of
      Just n -> printOption n origString
      Nothing -> putStrLn "Please try again"

    where concatNums (i, (s, _)) = show i ++ ".) " ++ s

