//
// Created by tyler on 18/11/16.
//

#include <iostream>
#include "Account.h"

Account::Account() {

    balance = 0.0;
}

Account::Account(double initBalance) {

    if(initBalance >= 0.0)
        balance = initBalance;
    else {
        balance = 0.0;
        std::cout << "Balance cannot be less than 0, balance set to 0.0 automatically!" << std::endl;
    }
}

void Account::credit(double deposit) {

    if(deposit < 0.0)
        std::cout << "Nice try hackar, cant add a negative amount to the account!" << std::endl;
    else
        balance += deposit;
}

bool Account::debit(double withdrawl) {

    if(balance-withdrawl < 0.0 || withdrawl < 0.0) {
        std::cout << "Nice try hackar, cant withdrawl a negative amount either" << std::endl;
        return false;
    }

    balance -= withdrawl;
    return true;
}

double Account::getBalance() {
    return balance;
}