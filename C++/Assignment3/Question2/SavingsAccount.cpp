//
// Created by tyler on 02/11/16.
//

#include "SavingsAccount.h"

double SavingsAccount::annualInterestRate = 0.03; //Declare static

SavingsAccount::SavingsAccount(double initialBalance, double rate) {

    this->savingsBalance = initialBalance;
    SavingsAccount::annualInterestRate = rate/100.0;
}

void SavingsAccount::calculateMonthlyInterestRate() {

    this->savingsBalance *= 1.0 + (annualInterestRate/12);
}

double SavingsAccount::getBalance() {

    return this->savingsBalance;
}

double SavingsAccount::getRate() {

    return annualInterestRate*100;
}

void SavingsAccount::modifyInterestRate(double rate) {

    annualInterestRate = rate/100.0;
}
