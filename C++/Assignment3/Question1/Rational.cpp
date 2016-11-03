#include "Rational.hpp"

Rational::Rational(int n, int d) {

    int gcf = Rational::gcf(n, d);

    this->numerator = n/gcf;
    this->denominator = d/gcf;
}

Rational* Rational::add(Rational * frac) {

    int commonDenominator = this->denominator*frac->denominator;

    int newNum1 = this->numerator*(commonDenominator/this->denominator);
    int newNum2 = frac->numerator*(commonDenominator/frac->denominator);

    int resultNum = newNum1 + newNum2;

    int gcf = Rational::gcf(resultNum, commonDenominator);

    this->numerator = resultNum/gcf;
    this->denominator = commonDenominator/gcf;

    return this;
}

Rational* Rational::subtract(Rational * frac) {

    int commonDenominator = this->denominator*frac->denominator;

    int newNum1 = this->numerator*(commonDenominator/this->denominator);
    int newNum2 = frac->numerator*(commonDenominator/frac->denominator);

    int resultNum = newNum1 - newNum2;

    int gcf = Rational::gcf(resultNum, commonDenominator);

    this->numerator = resultNum/gcf;
    this->denominator = commonDenominator/gcf;

    return this;
}

Rational* Rational::multiply(Rational * frac) {

    int resultNum = this->numerator*frac->numerator;
    int resultDenom = this->denominator*frac->denominator;

    int gcf = Rational::gcf(resultNum, resultDenom);

    this->numerator = resultNum/gcf;
    this->denominator = resultDenom/gcf;

    return this;
}

Rational* Rational::divide(Rational * frac) {

    int commonDenominator = this->denominator*frac->denominator;

    int resultNum = this->numerator*(commonDenominator/this->denominator);
    int resultDenom = frac->numerator*(commonDenominator/frac->denominator);

    int gcf = Rational::gcf(resultNum, resultDenom);

    this->numerator = resultNum/gcf;
    this->denominator = resultDenom/gcf;

    return this;
}

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
