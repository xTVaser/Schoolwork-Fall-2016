#ifndef Rational_H
#define Rational_H

#include <string>

class Rational {

private:
    int numerator;
    int denominator;

    int gcf(int n, int d);

public:
    Rational(int n = 1, int d = 1);

    //Pass another fraction to these methods, will store result in Callers
    Rational add(Rational  &frac);
    Rational subtract(Rational  &frac);
    Rational multiply(Rational  &frac);
    Rational divide(Rational  &frac);

    Rational operator+(Rational &frac);
    Rational operator-(Rational &frac);
    Rational operator*(Rational &frac);
    Rational operator/(Rational &frac);

    bool operator==(Rational &frac);
    bool operator!=(Rational &frac);

    std::string toRationalString();
    double toDouble();

};

#endif
