//
// Created by tyler on 02/11/16.
//

#include "SavingsAccount.h"

double SavingsAccount::annualInterestRate = 0.03; //Declare static cause c++

/**
 * Gon get rich in here
 * Assignment doesnt say what parameters to take in, so i just assumed
 * @param initialBalance Money
 * @param rate a number
 * @return
 */
SavingsAccount::SavingsAccount(double initialBalance, double rate) {

    //put the $$ in the bank
    this->savingsBalance = initialBalance;
    //let er grow
    SavingsAccount::annualInterestRate = rate/100.0;
}

/**
 * Reduce down that false advertising
 */
void SavingsAccount::calculateMonthlyInterestRate() {

    //I store the rate as a percentage because i think thats pretty neat
    this->savingsBalance *= 1.0 + (annualInterestRate/12);
}

/**
 * Check how much money i got
 * @return
 */
double SavingsAccount::getBalance() {

    return this->savingsBalance;
}

/**
 * Check if i need to switch investment managers
 * @return
 */
double SavingsAccount::getRate() {

    return annualInterestRate*100;
}

/**
 * Acquire new investment manager
 * @param rate
 */
void SavingsAccount::modifyInterestRate(double rate) {

    annualInterestRate = rate/100.0;
}
