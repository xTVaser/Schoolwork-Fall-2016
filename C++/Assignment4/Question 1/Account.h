//
// Created by tyler on 18/11/16.
//

#ifndef QUESTION_1_ACCOUNT_H
#define QUESTION_1_ACCOUNT_H

#include <stdexcept>

class Account {
private:
    double balance;
public:
    Account();
    Account(double initBalance); //Check if >= 0.0, and if not then set to 0 and throw exception

    void credit(double deposit);
    bool debit(double withdrawl); //ensure debit amount doesnt exceed balance amount, it does dont touch money display error "Debit amount exceeded account balance"//Return true if successful
    double getBalance();

};


#endif //QUESTION_1_ACCOUNT_H
