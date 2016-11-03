//
// Created by tyler on 02/11/16.
//

#include "Main.h"
#include "SavingsAccount.h"
#include <iostream>

using namespace std;

int main(int argc, char * argv[]) {

    SavingsAccount saver1(2000, 3);
    SavingsAccount saver2(3000, 3);

    cout << "Initial Balance ------------------------" << endl;
    cout << "Account 1 - Balance: $" << saver1.getBalance() << ", Annual Interest Rate: " << saver2.getRate() << "%" << endl;
    cout << "Account 2 - Balance: $" << saver1.getBalance() << ", Annual Interest Rate: " << saver2.getRate() << "%" << endl << endl;

    saver1.calculateMonthlyInterestRate();
    saver2.calculateMonthlyInterestRate();

    cout << "First Month Balance ------------------------" << endl;
    cout << "Account 1 - Balance: $" << saver1.getBalance() << ", Annual Interest Rate: " << saver2.getRate() << "%" << endl;
    cout << "Account 2 - Balance: $" << saver1.getBalance() << ", Annual Interest Rate: " << saver2.getRate() << "%" << endl << endl;

    saver1.modifyInterestRate(4); //Static, class wide, only change it for one object.
    saver1.calculateMonthlyInterestRate();
    saver2.calculateMonthlyInterestRate();

    cout << "Second Month Balance ------------------------" << endl;
    cout << "Account 1 - Balance: $" << saver1.getBalance() << ", Annual Interest Rate: " << saver2.getRate() << "%" << endl;
    cout << "Account 2 - Balance: $" << saver1.getBalance() << ", Annual Interest Rate: " << saver2.getRate() << "%" << endl;

    return 0;
}
