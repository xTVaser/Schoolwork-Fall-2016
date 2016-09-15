module Lib where

import qualified Codec.Encryption.AES as AES
import qualified Data.ByteString.Char8 as BS

validSelection :: String -> Maybe Int
validSelection str = isValid (reads str :: [(Int, String)])
    where isValid[] = Nothing
          isValid((n, _):_)
            | outOfBounds n = Nothing
            | otherwise = Just n
          outOfBounds n = (n < 1) || (n > length (menuOptions "user input"))


menuOptions :: String -> [(Int, (String, String))]
menuOptions s = zip [1..] [
    ("AES Encryption", aesEncrypt s),
    ("RSA Encryption", rsaEncrypt s),
    ("Bcrypt", bEncrypt s),
    ("DES Encryption", desEncrypt s),
    ("MD5 Encryption", md5Encrypt s)
    ]

printOption :: Int -> String -> IO ()
printOption n oStr = do
    putStrLn ("Original String: " ++ oStr ++ "\n")

    let menuResults = (snd ((menuOptions oStr)!!(n-1)))
    putStrLn (fst menuResults ++ ": " ++ snd menuResults ++ "\n")


aesEncrypt :: Word128 -> String
aesEncrypt iStr = BS.unpack . AES.encrypt ("lol" fromIntegral BS.pack iStr)

rsaEncrypt :: String -> String
rsaEncrypt iStr = "RSA"

bEncrypt :: String -> String
bEncrypt iStr = "BCrypt"

desEncrypt :: String -> String
desEncrypt iStr = "DES"

md5Encrypt :: String -> String
md5Encrypt iStr = "MD5"

