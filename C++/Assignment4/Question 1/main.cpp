#include <iostream>

#include "Account.h"
#include "SavingsAccount.h"
#include "CheckingAccount.h"

using namespace std;

int main() {

    cout << "Account Class --------------------------------------------------" << endl;
    Account a1 = Account();
    Account a2 = Account(1000);
    Account a3 = Account(-1000);

    cout << "Account 1's Balance: " << a1.getBalance() << endl;
    cout << "Account 2's Balance: " << a2.getBalance() << endl;
    cout << "Account 3's Balance: " << a3.getBalance() << endl;

    a1.debit(1000);
    a2.debit(1000);
    a3.debit(1000);

    cout << "Account 1's Balance: " << a1.getBalance() << endl;
    cout << "Account 2's Balance: " << a2.getBalance() << endl;
    cout << "Account 3's Balance: " << a3.getBalance() << endl;

    a1.credit(1000);
    a2.credit(1000);
    a3.credit(-1000);

    cout << "Account 1's Balance: " << a1.getBalance() << endl;
    cout << "Account 2's Balance: " << a2.getBalance() << endl;
    cout << "Account 3's Balance: " << a3.getBalance() << endl << endl;

    cout << "Savings Account Class --------------------------------------------------" << endl;
    SavingsAccount sa1 = SavingsAccount();
    SavingsAccount sa2 = SavingsAccount(1000, 10);
    SavingsAccount sa3 = SavingsAccount(-1000, -10);

    cout << "Account 1's Balance: " << sa1.getBalance() << endl;
    cout << "Account 2's Balance: " << sa2.getBalance() << endl;
    cout << "Account 3's Balance: " << sa3.getBalance() << endl;

    sa1.debit(1000);
    sa2.debit(1000);
    sa3.debit(1000);

    cout << "Account 1's Balance: " << sa1.getBalance() << endl;
    cout << "Account 2's Balance: " << sa2.getBalance() << endl;
    cout << "Account 3's Balance: " << sa3.getBalance() << endl;

    sa1.credit(1000);
    sa2.credit(1000);
    sa3.credit(-1000);

    cout << "Account 1's Balance: " << sa1.getBalance() << endl;
    cout << "Account 2's Balance: " << sa2.getBalance() << endl;
    cout << "Account 3's Balance: " << sa3.getBalance() << endl;

    sa1.credit(sa1.calculateInterest());
    sa2.credit(sa2.calculateInterest());
    sa3.credit(sa3.calculateInterest());

    cout << "Account 1's Balance: " << sa1.getBalance() << endl;
    cout << "Account 2's Balance: " << sa2.getBalance() << endl;
    cout << "Account 3's Balance: " << sa3.getBalance() << endl << endl;

    cout << "Checking Account Class --------------------------------------------------" << endl;
    CheckingAccount ca1 = CheckingAccount();
    CheckingAccount ca2 = CheckingAccount(1000, 10);
    CheckingAccount ca3 = CheckingAccount(-1000, -10);

    cout << "Account 1's Balance: " << ca1.getBalance() << endl;
    cout << "Account 2's Balance: " << ca2.getBalance() << endl;
    cout << "Account 3's Balance: " << ca3.getBalance() << endl;

    ca1.debit(1000);
    ca2.debit(1000);
    ca3.debit(1000);

    cout << "Account 1's Balance: " << ca1.getBalance() << endl;
    cout << "Account 2's Balance: " << ca2.getBalance() << endl;
    cout << "Account 3's Balance: " << ca3.getBalance() << endl;

    ca1.credit(1000);
    ca2.credit(1000);
    ca3.credit(-1000);

    cout << "Account 1's Balance: " << ca1.getBalance() << endl;
    cout << "Account 2's Balance: " << ca2.getBalance() << endl;
    cout << "Account 3's Balance: " << ca3.getBalance() << endl;

    return 0;

}