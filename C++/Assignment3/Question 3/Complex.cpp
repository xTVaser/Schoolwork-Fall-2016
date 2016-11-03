//
// Created by tyler on 03/11/16.
//

#include "Complex.h"
#include <string>
#include <iomanip>

using namespace std;

Complex::Complex(double real, double imag) {

    this->real = real;
    this->imaginary = imag;
}

Complex Complex::operator+(const Complex &x) const {

    return Complex(real + x.real, imaginary + x.imaginary);
}

Complex Complex::operator-(const Complex &x) const {

    return Complex(real - x.real, imaginary - x.imaginary);
}

Complex Complex::operator*(const Complex &x) const {

    double newReal = (real*x.real) + ((imaginary*x.imaginary)*-1);
    double newImag = (real * x.imaginary) + (imaginary*x.real);

    return Complex(newReal, newImag);
}

bool Complex::operator==(const Complex &x) const {

    return real == x.real == imaginary == x.imaginary;
}

bool Complex::operator!=(const Complex &x) const {

    return !(real == x.real == imaginary == x.imaginary);
}


istream &operator>>(istream &stm, Complex &x) {

    //Assuming syntax for input is (<double>,<double>)
    stm.ignore(1);
    stm >> x.real;
    stm.ignore(1);
    stm >> x.imaginary;
    stm.ignore(2);

    return stm;
}

ostream &operator<<(ostream &stm, const Complex &x) {

    stm << fixed << showpoint << setprecision(4) << "(" << x.real << ", " << x.imaginary << ")";
    return stm;
}
