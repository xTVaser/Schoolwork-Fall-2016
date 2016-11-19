//
// Created by tyler on 18/11/16.
//

#include "SavingsAccount.h"

SavingsAccount::SavingsAccount() {
    intRate = 0;
}

SavingsAccount::SavingsAccount(double initBalance, double intRate) : Account(initBalance) {
    this->intRate = abs(intRate) / 100.0;
}

double SavingsAccount::calculateInterest() {

    return getBalance() * intRate;
}
