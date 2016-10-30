#include "Rational.hpp"
#include <string>

Rational::Rational(int n, int d) {

    int gcf = Rational::gcf(n, d);

    this->numerator = n/gcf;
    this->denominator = d/gcf;
}

void Rational::add(Rational * frac) {
    
    int numerator = this->numerator+frac->numerator;
    int denominator = this->denominator+frac->denominator;

    int gcf = Rational::gcf(numerator, denominator);

    this->numerator = numerator/gcf;
    this->denominator = denominator/gcf;
}

void Rational::subtract(Rational * frac) {

    int commonDenominator = this->denominator*frac->denominator;

    int newNum1 = this->numerator*(this->denominator/commonDenominator);
    int newNum2 = frac->numerator*(frac->denominator/commonDenominator);

    int resultNum = newNum1 - newNum2;

    int gcf = Rational::gcf(resultNum, commonDenominator);

    this->numerator = resultNum/gcf;
    this->denominator = commonDenominator/gcf;
}

void Rational::multiply(Rational * frac) {

    int resultNum = this->numerator*frac->numerator;
    int resultDenom = this->denominator*frac->denominator;

    int gcf = Rational::gcf(resultNum, resultDenom);

    this->numerator = resultNum/gcf;
    this->denominator = resultDenom/gcf;
}

void Rational::divide(Rational * frac) {

    int resultNum = this->numerator*frac->denominator;
    int resultDenom = this->denominator*frac->denominator;

    int gcf = Rational::gcf(resultNum, resultDenom);

    this->numerator = resultNum/gcf;
    this->denominator = resultNum/gcf;
}

char * Rational::toRationalString() {
    
    return std::to_string(this->numerator) + "/" + std::to_string(this->denominator);
}

double Rational::toDouble() {

    return 0.0+this->numerator/this->denominator;
}

int Rational::gcf(int n, int d) {

    if(n >= d)
        return 1;

    int gcf = d % n;

    while(gcf != 0) {

        int temp = n;
        n = d;
        d = gcf;
        gcf = d % n;
    }

    return gcf;
}
