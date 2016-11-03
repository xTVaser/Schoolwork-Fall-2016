//
// Created by tyler on 02/11/16.
//

#ifndef QUESTION2_SAVINGSACCOUNT_H
#define QUESTION2_SAVINGSACCOUNT_H


class SavingsAccount {

private:
    static double annualInterestRate;
    double savingsBalance;

public:
    SavingsAccount(double initialBalance = 1000, double rate = 3);
    void calculateMonthlyInterestRate(); //Store result back into savingsBalance
    double getBalance();
    double getRate();
    static void modifyInterestRate(double rate);

};


#endif //QUESTION2_SAVINGSACCOUNT_H
