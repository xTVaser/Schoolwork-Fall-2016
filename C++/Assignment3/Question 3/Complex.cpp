//
// Created by tyler on 03/11/16.
//

#include "Complex.h"
#include <string>
#include <iomanip>

using namespace std;

/**
 * This constructor is very complex
 * @param real it is both real
 * @param imag and imaginary
 * @return but it always comes home
 */
Complex::Complex(double real, double imag) {

    this->real = real;
    this->imaginary = imag;
}

/**
 * C++ Programmers dont like words, their keyboards are only symbols
 * @param x
 * @return A new complex number unlike quesiton 1
 */
Complex Complex::operator+(const Complex &x) const {

    //Math below v
    return Complex(real + x.real, imaginary + x.imaginary);
}

/**
 * Subtract
 * @param x
 * @return
 */
Complex Complex::operator-(const Complex &x) const {

    return Complex(real - x.real, imaginary - x.imaginary);
}

/**
 * Multiply
 * @param x
 * @return
 */
Complex Complex::operator*(const Complex &x) const {

    double newReal = (real*x.real) + ((imaginary*x.imaginary)*-1);
    double newImag = (real * x.imaginary) + (imaginary*x.real);

    return Complex(newReal, newImag);
}

/**
 * Equals
 * @param x
 * @return
 */
bool Complex::operator==(const Complex &x) const {

    return real == x.real && imaginary == x.imaginary;
}

/**
 * Opposite equals
 * @param x
 * @return
 */
bool Complex::operator!=(const Complex &x) const {

    //I tried to just xor the == result but compiler yelled
    return !(real == x.real && imaginary == x.imaginary);
}

/**
 * You give me some words, ill give you a complex
 * @param stm the stream
 * @param x what we want to print
 * @return another stream
 */
istream &operator>>(istream &stm, Complex &x) {

    //Assuming syntax for input is (<double>,<double>)
    stm.ignore(1);
    stm >> x.real;
    stm.ignore(1);
    stm >> x.imaginary;
    stm.ignore(2);

    return stm;
}

/**
 * Print it out in a nice syntax, i even added brackets
 * @param stm
 * @param x
 * @return
 */
ostream &operator<<(ostream &stm, const Complex &x) {

    stm << fixed << showpoint << setprecision(4) << "(" << x.real << ", " << x.imaginary << ")";
    return stm;
}
