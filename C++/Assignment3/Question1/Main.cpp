#include "Rational.hpp"
#include <iostream>

using namespace std;

int main(int argc, char * argv[]) {

    Rational * frac1 = new Rational(1,1);
    Rational * frac2 = new Rational(2,2);

    cout << frac1->toDouble() << endl << frac2->toRationalString();
    
    return 0;
}
