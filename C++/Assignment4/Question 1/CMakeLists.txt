cmake_minimum_required(VERSION 3.6)
project(Question_1)

set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -std=c++11")

set(SOURCE_FILES main.cpp Account.cpp Account.h SavingsAccount.cpp SavingsAccount.h CheckingAccount.cpp CheckingAccount.h)
add_executable(Question_1 ${SOURCE_FILES})