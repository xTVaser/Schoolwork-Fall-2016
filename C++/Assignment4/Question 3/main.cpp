#include <iostream>
#include <fstream>
#include <iomanip>

using namespace std;

int main() {

    ofstream results;

    results.open("data-size.dat", ofstream::out);
    results << left << setw(25) << "char" << sizeof(char) << endl;
    results << left << setw(25) << "unsigned char" << sizeof(unsigned char) << endl;
    results << left << setw(25) << "short int" << sizeof(short int) << endl;
    results << left << setw(25) << "unsigned short int" << sizeof(unsigned short int) << endl;
    results << left << setw(25) << "int" << sizeof(int) << endl;
    results << left << setw(25) << "unsigned int" << sizeof(unsigned int) << endl;
    results << left << setw(25) << "long int" << sizeof(long int) << endl;  //my long ints are bigger than the author's lel
    results << left << setw(25) << "unsigned long int" << sizeof(unsigned long int) << endl; //and my long unsigned ints
    results << left << setw(25) << "float" << sizeof(float) << endl;
    results << left << setw(25) << "double" << sizeof(double) << endl;
    results << left << setw(25) << "long double" << sizeof(long double) << endl; //as well as my long doubles
    results.close();

    return 0;
}