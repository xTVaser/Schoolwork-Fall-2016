#ifndef Rational_H
#define Rational_H

class Rational {

    private:
        int numerator;
        int denominator;

        int gcf(int n, int d);

    public:
        Rational(int n, int d);

        //Pass another fraction to these methods, will store result in Callers
        void add(Rational * frac);
        void subtract(Rational * frac);
        void multiply(Rational * frac);
        void divide(Rational * frac);

        const char * toRationalString();
        double toDouble();
        
};

#endif

