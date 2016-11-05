#include <iostream>
#include "Complex.h"

using namespace std;

int main() {

    //The following looks extremely gross, but its all just stuff from the textbook mostly i swear dont hate me
    Complex x;
    Complex y(4.3, 8.2);
    Complex z(3.3, -1.1);

    cout << "x: " << x << "\ny: " << y << "\nz: " << z;

    x = y + z;
    cout << "\n\nx = y + z:\n" << x << " = " << y << " + " << z;

    x = y - z;
    cout << "\n\nx = y - z:\n" << x << " = " << y << " - " << z << endl;

    x = y * z;
    cout << "\n\nx = y * z:\n" << x << " = " << y << " * " << z << endl;

    bool equal = y == z;
    cout << "\n\ny == z: " << y << " == " << z << " = ";
    if(equal)
        cout << "True";
    else
        cout << "False";
    cout << endl;

    bool notEqual = y != z;
    cout << "\n\ny != z: " << y << " != " << z << " = ";
    if(notEqual)
        cout << "True";
    else
        cout << "False";
    cout << endl << endl;

    cout << "Enter a complex number in the form of (<double>, <double>i): ";
    cin >> x;
    cout << "New Complex Number: " << x << endl;

    return 0;
}