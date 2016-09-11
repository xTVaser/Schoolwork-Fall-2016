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
      Just n -> putStrLn "Good"
      Nothing -> putStrLn "Please try again"

    where concatNums (i, (s, _)) = show i ++ ".) " ++ s

{-
menu :: IO ()
menu = do
        putStrLn . unlines $ map concatNums menuOptions
        choice <- getLine
        case validSelection choice of
                Just n  -> execute . read $ choice
                Nothing -> putStrLn "Please try again"

         where concatNums (i, (s, _)) = show i ++ ".) " ++ s

execute :: Int -> IO ()
execute n = doExec $ filter (\(i, _) -> i == n) menuOptions
   where doExec ((_, (_,f)):_) = f
-}
foo = undefined
bar = undefined


