#include <iostream>

using namespace std;

int sum(int, int, int);
int avg(int, int, int);
int product(int, int, int);
int smallest(int, int, int);
int largest(int, int, int);

int main(int argc,  char* argv[] ) {

    int first, second, third;

    cout << "Please enter three integers: " << endl;

    cin >> first >> second >> third;

    cout << "Sum is: " << sum(first, second, third) << endl;
    cout << "Average is: " << avg(first, second, third) << endl;
    cout << "Product is: " << product(first, second, third) << endl;
    cout << "Smallest is: " << smallest(first, second, third) << endl;
    cout << "Largest is: " << largest(first, second, third) << endl;

    return 0;
}

int sum(int a, int b, int c) {

    return a + b + c;
}

int avg(int a, int b, int c) {

    return sum(a,b,c)/3;
}

int product(int a, int b, int c) {

    return a * b * c;
}

int smallest(int a, int b, int c) {

    if(a < b && a < c)
        return a;
    else if(b < c && b < a)
        return b;
    else
        return c;
}

int largest(int a, int b, int c) {

    if(a > b && a > c)
        return a;
    else if(b > c && b > a)
        return b;
    else
        return c;
}

