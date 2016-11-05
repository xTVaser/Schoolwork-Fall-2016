cmake_minimum_required(VERSION 3.6)
project(Question1)

set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -std=c++11 -masm=intel")

set(SOURCE_FILES Main.cpp Rational.cpp Rational.hpp)
add_executable(Question1 ${SOURCE_FILES})