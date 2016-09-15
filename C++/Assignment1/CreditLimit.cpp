#include <iostream>
#include <stdio.h>

using namespace std;

//Create a struct to hold all the data because im showing off.
struct CreditAccount {

    int accNumber;
    long double balance;
    long double charges;
    long double credits;
    long double limit;
};

long double calcBalance(CreditAccount& cc);
bool exceedLimit(CreditAccount& cc);

int main(int argc, char* argv[]) {

    while (true) {
        
        //Declare the struct
        CreditAccount cc;

        //Get the account number
        cout << "Enter your account number or (or -1 to quit): ";
        cin >> cc.accNumber;

        //If its -1 or an error occurs, stop the program.
        if (cc.accNumber == -1 || !cin)
            break;

        cout << "Enter your initial balance: ";
        cin >> cc.balance;

        cout << "Enter your total charges: ";
        cin >> cc.charges;

        cout << "Enter your total credits: ";
        cin >> cc.credits;

        cout << "Enter your credit limit: ";
        cin >> cc.limit;

        //Output
        printf("New Balance: %10.2Lf\n", calcBalance(cc));

        //Print out the results
        //I used printf I hope you don't mind. Lf = Long float
        if(exceedLimit(cc) == true) {
            printf("Account: %10d\n", cc.accNumber);
            printf("Credit Limit: %10.2Lf\n", cc.limit);
            printf("Balance: %10.2Lf\n", cc.balance);
            printf("Credit Limit Exceeded!\n");
        }
    }

    return 0;
}

long double calcBalance(CreditAccount& cc) {

    //Make sure to set the value in addition to calculating it
    cc.balance = cc.balance + (cc.charges - cc.credits);

    return cc.balance;
}

bool exceedLimit(CreditAccount& cc) {

    return cc.balance >= cc.limit;
}



