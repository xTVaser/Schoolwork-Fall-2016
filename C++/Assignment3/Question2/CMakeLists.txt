cmake_minimum_required(VERSION 3.6)
project(Question2)

set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -std=c++11")

set(SOURCE_FILES Main.cpp Main.cpp Main.h SavingsAccount.cpp SavingsAccount.h)
add_executable(Question2 ${SOURCE_FILES})