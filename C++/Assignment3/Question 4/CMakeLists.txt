cmake_minimum_required(VERSION 3.6)
project(Question_4)

set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -std=c++11")

set(SOURCE_FILES Main.cpp Rational.cpp Rational.hpp)
add_executable(Question_4 ${SOURCE_FILES})