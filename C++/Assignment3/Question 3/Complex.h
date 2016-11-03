//
// Created by tyler on 03/11/16.
//
#include <string>
#include <iostream>

#ifndef QUESTION_3_COMPLEX_H
#define QUESTION_3_COMPLEX_H

using namespace std;

class Complex {

    friend istream &operator>>(istream &stm, Complex & x);
    friend ostream &operator<<(ostream &stm, const Complex &x);

public:
    explicit Complex(double real = 0.0, double imag = 0.0);
    Complex operator+(const Complex &x) const;
    Complex operator-(const Complex &x) const;
    Complex operator*(const Complex &x) const;
    bool operator==(const Complex &x) const;
    bool operator!=(const Complex &x) const;
private:
    double real;
    double imaginary;

};


#endif //QUESTION_3_COMPLEX_H
