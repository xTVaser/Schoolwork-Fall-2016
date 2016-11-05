#include "Rational.hpp"
#include <iostream>
#include <iomanip>

using namespace std;

int main(int argc, char * argv[]) {

    cout << "Testing Creating Rational Numbers and toRationalString()" << endl;
    cout << "------------================----------" << endl;

    Rational frac1 = Rational();
    Rational frac2 = Rational(2,1);
    Rational frac3 = Rational(1,4);
    Rational frac4 = Rational(7, 21);

    cout << "Fraction 1, No Args, Default, (1/1): " << frac1.toRationalString() << endl;
    cout << "Fraction 2, (2,4): " << frac2.toRationalString() << endl;
    cout << "Fraction 3, (1,4): " << frac3.toRationalString() << endl;
    cout << "Fraction 4, (7,21): " << frac4.toRationalString() << endl;
    try {
        Rational frac5 = Rational(0,0);
    }
    catch( const std::invalid_argument &e) {
        cout << "Fraction 5, (0,0): " << e.what() << endl << endl;
    }

    cout << "Testing Add Fractions" << endl;
    cout << "------------================----------" << endl;
    cout << frac1.toRationalString() + " + " + frac2.toRationalString() +": ";
    cout << (frac1+frac2).toRationalString() << endl;
    cout << frac2.toRationalString() + " + " + frac3.toRationalString() +": ";
    cout << (frac2+frac3).toRationalString() << endl;
    cout << frac3.toRationalString() + " + " + frac4.toRationalString() +": ";
    cout << (frac3+frac4).toRationalString() << endl << endl << endl;

    cout << "Testing Subtract Fractions" << endl;
    cout << "------------================----------" << endl;
    cout << frac1.toRationalString() + " - " + frac2.toRationalString() +": ";
    cout << (frac1-frac2).toRationalString() << endl;
    cout << frac2.toRationalString() + " - " + frac3.toRationalString() +": ";
    cout << (frac2-frac3).toRationalString() << endl;
    cout << frac3.toRationalString() + " - " + frac4.toRationalString() +": ";
    cout << (frac3-frac4).toRationalString() << endl << endl;

    cout << "Testing Multiply Fractions" << endl;
    cout << "------------================----------" << endl;
    cout << frac1.toRationalString() + " * " + frac2.toRationalString() +": ";
    cout << (frac1*frac2).toRationalString() << endl;
    cout << frac2.toRationalString() + " * " + frac3.toRationalString() +": ";
    cout << (frac2*frac3).toRationalString() << endl;
    cout << frac3.toRationalString() + " * " + frac4.toRationalString() +": ";
    cout << (frac3*frac4).toRationalString() << endl << endl;

    cout << "Testing Divide Fractions" << endl;
    cout << "------------================----------" << endl;
    cout << frac1.toRationalString() + " / " + frac2.toRationalString() +": ";
    cout << (frac1/frac2).toRationalString() << endl;
    cout << frac2.toRationalString() + " / " + frac3.toRationalString() +": ";
    cout << (frac2/frac3).toRationalString() << endl;
    cout << frac3.toRationalString() + " / " + frac4.toRationalString() +": ";
    cout << (frac3/frac4).toRationalString() << endl << endl;

    cout << "Testing toDouble() Fraction" << endl;
    cout << "------------================----------" << endl;
    cout << "Fraction 1 " + frac1.toRationalString() + ": " << fixed << showpoint << setprecision(2) << frac1.toDouble() << endl;
    cout << "Fraction 2 " + frac2.toRationalString() + ": " << fixed << showpoint << setprecision(2) << frac2.toDouble() << endl;
    cout << "Fraction 3 " + frac3.toRationalString() + ": " << fixed << showpoint << setprecision(2) << frac3.toDouble() << endl;
    cout << "Fraction 4 " + frac4.toRationalString() + ": " << fixed << showpoint << setprecision(2) << frac4.toDouble() << endl << endl;

    cout << "Testing Relational Operators" << endl;
    cout << "------------================----------" << endl;
    cout << frac1.toRationalString() + " < " << frac2.toRationalString() << ": " << ((frac1 < frac2) ? "True" : "False") << endl;
    cout << frac3.toRationalString() + " > " << frac4.toRationalString() << ": " << ((frac3 > frac4) ? "True" : "False") << endl;
    cout << frac1.toRationalString() + " <= " << frac1.toRationalString() << ": " << ((frac1 <= frac1) ? "True" : "False") << endl;
    cout << frac3.toRationalString() + " >= " << frac4.toRationalString() << ": " << ((frac3 >= frac4) ? "True" : "False") << endl << endl;

    cout << "Testing Equality and In-Equality" << endl;
    cout << "------------================----------" << endl;
    cout << frac1.toRationalString() + " == " << frac2.toRationalString() << ": " << ((frac1 == frac2) ? "True" : "False") << endl;
    cout << frac3.toRationalString() + " == " << frac3.toRationalString() << ": " << ((frac3 == frac3) ? "True" : "False") << endl;
    cout << frac1.toRationalString() + " != " << frac2.toRationalString() << ": " << ((frac1 != frac2) ? "True" : "False") << endl;
    cout << frac3.toRationalString() + " != " << frac4.toRationalString() << ": " << ((frac3 != frac4) ? "True" : "False") << endl;

    return 0;
}