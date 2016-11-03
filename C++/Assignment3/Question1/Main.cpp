#include "Rational.hpp"
#include <iostream>
#include <iomanip>

using namespace std;

int main(int argc, char * argv[]) {

    cout << "Testing Creating Rational Numbers and toRationalString()" << endl;
    cout << "------------================----------" << endl;

    Rational * frac1 = new Rational();
    Rational * frac2 = new Rational(2,4);
    Rational * frac3 = new Rational(1,4);
    Rational * frac4 = new Rational(7, 21);
    cout << "Fraction 1, No Args, Default, (1/1): " << frac1->toRationalString() << endl;
    cout << "Fraction 2, (2,4): " << frac2->toRationalString() << endl;
    cout << "Fraction 3, (1,4): " << frac3->toRationalString() << endl;
    cout << "Fraction 4, (7,21): " << frac4->toRationalString() << endl << endl;

    cout << "Testing Add Fractions" << endl;
    cout << "------------================----------" << endl;
    cout << frac1->toRationalString() + " + " + frac2->toRationalString() +": ";
    cout << frac1->add(frac2)->toRationalString() << endl;
    cout << frac2->toRationalString() + " + " + frac3->toRationalString() +": ";
    cout << frac2->add(frac3)->toRationalString() << endl;
    cout << frac3->toRationalString() + " + " + frac4->toRationalString() +": ";
    cout << frac3->add(frac4)->toRationalString() << endl << endl << endl;

    cout << "Testing Subtract Fractions" << endl;
    cout << "------------================----------" << endl;
    cout << frac1->toRationalString() + " + " + frac2->toRationalString() +": ";
    cout << frac1->subtract(frac2)->toRationalString() << endl;
    cout << frac2->toRationalString() + " + " + frac3->toRationalString() +": ";
    cout << frac2->subtract(frac3)->toRationalString() << endl;
    cout << frac3->toRationalString() + " + " + frac4->toRationalString() +": ";
    cout << frac3->subtract(frac4)->toRationalString() << endl << endl;

    cout << "Testing Multiply Fractions" << endl;
    cout << "------------================----------" << endl;
    cout << frac1->toRationalString() + " + " + frac2->toRationalString() +": ";
    cout << frac1->multiply(frac2)->toRationalString() << endl;
    cout << frac2->toRationalString() + " + " + frac3->toRationalString() +": ";
    cout << frac2->multiply(frac3)->toRationalString() << endl;
    cout << frac3->toRationalString() + " + " + frac4->toRationalString() +": ";
    cout << frac3->multiply(frac4)->toRationalString() << endl << endl;

    cout << "Testing Divide Fractions" << endl;
    cout << "------------================----------" << endl;
    cout << frac1->toRationalString() + " + " + frac2->toRationalString() +": ";
    cout << frac1->divide(frac2)->toRationalString() << endl;
    cout << frac2->toRationalString() + " + " + frac3->toRationalString() +": ";
    cout << frac2->divide(frac3)->toRationalString() << endl;
    cout << frac3->toRationalString() + " + " + frac4->toRationalString() +": ";
    cout << frac3->divide(frac4)->toRationalString() << endl << endl;

    cout << "Testing toDouble() Fraction" << endl;
    cout << "------------================----------" << endl;
    cout << "Fraction 1 " + frac1->toRationalString() + ": " << fixed << showpoint << setprecision(2) << frac1->toDouble() << endl;
    cout << "Fraction 2 " + frac2->toRationalString() + ": " << fixed << showpoint << setprecision(2) << frac2->toDouble() << endl;
    cout << "Fraction 3 " + frac3->toRationalString() + ": " << fixed << showpoint << setprecision(2) << frac3->toDouble() << endl;
    cout << "Fraction 4 " + frac4->toRationalString() + ": " << fixed << showpoint << setprecision(2) << frac4->toDouble() << endl;

    asm(    "mov %dl,'A'"
            "mov %ah,0Ah"
            "int 10h");
}