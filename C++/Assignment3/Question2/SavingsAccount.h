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
    void calculateMonthlyInterestRate(); //Store result back into savingsBalance
    static void modifyInterestRate(double rate);
    


};


#endif //QUESTION2_SAVINGSACCOUNT_H
