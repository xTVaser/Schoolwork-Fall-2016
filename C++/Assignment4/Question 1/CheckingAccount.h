//
// Created by tyler on 18/11/16.
//

#ifndef QUESTION_1_CHECKINGACCOUNT_H
#define QUESTION_1_CHECKINGACCOUNT_H


#include "Account.h"

class CheckingAccount : public Account {

private:
    double transactionFee;
public:
    CheckingAccount();
    CheckingAccount(double initBalance, double fee);

    //Redefine Methods
    void credit(double deposit); //Subtract the fee everytime
    bool debit(double withdrawl); //Subtract the fee everytime //Should invoke base-class to perform the updates however //Debiut should only subtract fee if money is actually withdrawn
};


#endif //QUESTION_1_CHECKINGACCOUNT_H
