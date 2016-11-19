//
// Created by tyler on 18/11/16.
//

#include <iostream>
#include "CheckingAccount.h"

CheckingAccount::CheckingAccount() {}

CheckingAccount::CheckingAccount(double initBalance, double fee) : Account(initBalance) {
    transactionFee = abs(fee);
}

void CheckingAccount::credit(double deposit) {

    if(deposit < 0.0)
        std::cout << "Nice try hackar, cant add a negative amount to the account!" << std::endl;
    else
        Account::credit(deposit-transactionFee);
}

bool CheckingAccount::debit(double withdrawl) {

    return Account::debit(withdrawl+transactionFee);  //Have to check the fee as well, Which means we have nothing to do.
}