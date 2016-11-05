#include "Rational.hpp"

/**
 * Gon construct a rational number
 * @param n numerator
 * @param d denominator
 * @return NOTHING
 */
Rational::Rational(int n, int d) {

    int gcf = Rational::gcf(n, d);

    this->numerator = n/gcf;
    this->denominator = d/gcf;
}

/**
 * Gone add the callar fraction to the parameter fraction and store result in the callar
 * @param frac The other fraction we gon add
 * @return Cascaded call to the caller
 */
Rational* Rational::add(Rational * frac) {

    //Find a common denominator because thats what i did in grade 4
    int commonDenominator = this->denominator*frac->denominator;

    //Adjust numerators
    int newNum1 = this->numerator*(commonDenominator/this->denominator);
    int newNum2 = frac->numerator*(commonDenominator/frac->denominator);

    //Get the addition by using addition
    int resultNum = newNum1 + newNum2;

    //Reduce the fractions, maybe i should have made this a function
    int gcf = Rational::gcf(resultNum, commonDenominator);
    this->numerator = resultNum/gcf;
    this->denominator = commonDenominator/gcf;

    //No dereferencing because its already a pointer
    return this;
}

/**
 * Same old same old just subtracting this time
 * @param frac you already know who it is
 * @return
 */
Rational* Rational::subtract(Rational * frac) {

    //Find a common denominator again
    int commonDenominator = this->denominator*frac->denominator;

    //Adjust numerators
    int newNum1 = this->numerator*(commonDenominator/this->denominator);
    int newNum2 = frac->numerator*(commonDenominator/frac->denominator);

    //Subtract
    int resultNum = newNum1 - newNum2;

    //Reduce
    int gcf = Rational::gcf(resultNum, commonDenominator);
    this->numerator = resultNum/gcf;
    this->denominator = commonDenominator/gcf;

    return this;
}

/**
 * Fancy multiplication of two fractions
 * @param frac
 * @return
 */
Rational* Rational::multiply(Rational * frac) {

    //Cross Multiply = every math question answer from grade 4->8
    int resultNum = this->numerator*frac->numerator;
    int resultDenom = this->denominator*frac->denominator;

    //Reduce
    int gcf = Rational::gcf(resultNum, resultDenom);
    this->numerator = resultNum/gcf;
    this->denominator = resultDenom/gcf;

    return this;
}

/**
 * Scary division
 * @param frac
 * @return
 */
Rational* Rational::divide(Rational * frac) {

    //Get a common denominator
    int commonDenominator = this->denominator*frac->denominator;

    //Adjust numerators at the same time as finding the result, so fancy.
    //Extreme optimization below
    //Beware the optimization
    //Seriously look out, its fast
    int resultNum = this->numerator*(commonDenominator/this->denominator);
    int resultDenom = frac->numerator*(commonDenominator/frac->denominator);

    int gcf = Rational::gcf(resultNum, resultDenom);

    this->numerator = resultNum/gcf;
    this->denominator = resultDenom/gcf;

    return this;
}

/**
 * I use the built in string library to make a string
 * @return
 */
std::string Rational::toRationalString() {

    return "("+std::to_string(this->numerator) + "/" + std::to_string(this->denominator)+")";
}


/**
 * Good thing we had to make this, or question 4 would have been a pain
 * @return
 */
double Rational::toDouble() {

    return (double)this->numerator/(double)this->denominator;
}

/**
 * Extreme third year analysis of algorithms content below, aka Eucliean Algorithm
 * @param n numerator
 * @param d denominator
 * @return the greatest coding function
 */
int Rational::gcf(int n, int d) {

    //If the numerator is bigger than the denominator, swap because wtf
    if (n > d) {
        int temp = n;
        n = d;
        d = temp;
    }

    //Start off by getting that first remainder
    int gcf = d % n;

    //If it aint 0, then lets go
    while(gcf != 0) {

        //Elements get shifted to the left in the formula
        d = n;
        n = gcf;
        //Repeat the process
        gcf = d % n;
    }

    //Once we got a remainder of 0, that means our previous n was out gcf, so return it.
    return n;
}
