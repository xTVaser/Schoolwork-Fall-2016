//
// Created by tyler on 18/11/16.
//

#ifndef QUESTION_1_SAVINGSACCOUNT_H
#define QUESTION_1_SAVINGSACCOUNT_H


#include "Account.h"

class SavingsAccount : public Account {

private:
    double intRate; //Store as percentage / 100
public:
    SavingsAccount();
    SavingsAccount(double initBalance, double intRate);

    double calculateInterest(); //Multiply interest rate by balance, dont redefine credit() and debit()
};


#endif //QUESTION_1_SAVINGSACCOUNT_H
