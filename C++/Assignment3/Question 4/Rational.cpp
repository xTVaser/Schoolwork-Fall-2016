#include <stdexcept>
#include "Rational.hpp"

/**
 * I aint gonna comment this class that much since its copy paste from question 1
 * All i did was change it to be reference based instead of pointer based
 * @param n
 * @param d
 * @return
 */
Rational::Rational(int n, int d) {

    if(d == 0)
        throw std::invalid_argument("Denominator cannot be Zero!");

    if(d < 0) {

        n *= -1;
        d = abs(d);
    }

    int gcf = Rational::gcf(n, d);

    this->numerator = n/gcf;
    this->denominator = d/gcf;
}

/**
 * My ingenius way of operator overloading, just call the method with the same name
 * @param frac
 * @return
 */
Rational Rational::operator+(Rational &frac) { return add(frac); }
Rational Rational::add(Rational &frac) {

    int commonDenominator = this->denominator*frac.denominator;

    int newNum1 = this->numerator*(commonDenominator/this->denominator);
    int newNum2 = frac.numerator*(commonDenominator/frac.denominator);

    int resultNum = newNum1 + newNum2;

    int gcf = Rational::gcf(resultNum, commonDenominator);

    this->numerator = resultNum/gcf;
    this->denominator = commonDenominator/gcf;

    return *this;
}

Rational Rational::operator-(Rational &frac) { return subtract(frac); }
Rational Rational::subtract(Rational &frac) {

    int commonDenominator = this->denominator*frac.denominator;

    int newNum1 = this->numerator*(commonDenominator/this->denominator);
    int newNum2 = frac.numerator*(commonDenominator/frac.denominator);

    int resultNum = newNum1 - newNum2;

    int gcf = Rational::gcf(resultNum, commonDenominator);

    this->numerator = resultNum/gcf;
    this->denominator = commonDenominator/gcf;

    return *this;
}

Rational Rational::operator*(Rational &frac) { return multiply(frac); }
Rational Rational::multiply(Rational &frac) {

    int resultNum = this->numerator*frac.numerator;
    int resultDenom = this->denominator*frac.denominator;

    int gcf = Rational::gcf(resultNum, resultDenom);

    this->numerator = resultNum/gcf;
    this->denominator = resultDenom/gcf;

    return *this;
}

Rational Rational::operator/(Rational &frac) { return divide(frac); }
Rational Rational::divide(Rational &frac) {

    int commonDenominator = this->denominator*frac.denominator;

    int resultNum = this->numerator*(commonDenominator/this->denominator);
    int resultDenom = frac.numerator*(commonDenominator/frac.denominator);

    int gcf = Rational::gcf(resultNum, resultDenom);

    this->numerator = resultNum/gcf;
    this->denominator = resultDenom/gcf;

    return *this;
}

/*
 * This next part is really intense, you can tell how good of a programmer I am because i was able to do it all in a single lines
 * If you are starting to think about potential floating point rounding errors, stop.
 */
bool Rational::operator==(Rational &frac) { return toDouble() == frac.toDouble(); }

bool Rational::operator!=(Rational &frac) { return toDouble() != frac.toDouble(); }

bool Rational::operator<(Rational &frac) { return toDouble() < frac.toDouble(); }

bool Rational::operator>(Rational &frac) { return toDouble() > frac.toDouble(); }

bool Rational::operator<=(Rational &frac) { return toDouble() <= frac.toDouble(); }

bool Rational::operator>=(Rational &frac) { return toDouble() >= frac.toDouble(); }

std::string Rational::toRationalString() {

    return "("+std::to_string(this->numerator) + "/" + std::to_string(this->denominator)+")";
}

double Rational::toDouble() {

    return (double)this->numerator/(double)this->denominator;
}

int Rational::gcf(int n, int d) {

    if (n > d) {
        int temp = n;
        n = d;
        d = temp;
    }

    int gcf = d % n;

    while(gcf != 0) {

        d = n;
        n = gcf;
        gcf = d % n;
    }

    return n;
}
