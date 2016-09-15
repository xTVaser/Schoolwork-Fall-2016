#include <iostream>
#include <stdio.h>

using namespace std;

int main(int argc, char* argv[]) {

    cout << "Enter the side length of the square: ";
    
    int size;

    cin >> size;

    //When an error occurs, you have to reset the failbit, and clear the buffer up to the new line character.
    //Dont enter more than 256 characters or it will still crash :(
    while(size > 20 || size < 1 || !cin) {
        cin.clear();
        cin.ignore(256, '\n');
        cout << "Try again, (1-20): ";
        cin >> size;
    }

    if(size == 1) {
        cout << "*" << endl;
        return 0;
    }
    
    //Top row
    for(int i = 0; i < size; i++)
        cout << "*";
    
    cout << endl;

    //Sides
    for(int i = 0; i < size-2; i++) {
        cout << "*";
        for(int s = 0; s < size-2; s++)
            cout << " ";
        cout << "*" << endl;
    }
    
    //Bottom
    for(int i = 0; i < size; i++)
        cout << "*";
    
    cout << endl;

    return 0;
}
