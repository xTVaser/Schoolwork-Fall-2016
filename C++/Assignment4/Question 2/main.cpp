#include <iostream>
#include <iomanip>

using namespace std;

int main() {

    cout << "Character" << setw(18) << "Decimal ASCII" << setw(13) << "Octal ASCII" << setw(21) << "Hexadecimal ASCII" << endl;
    for(char start = 33; start <= 126; start++) {

        cout << start << setw(15) << dec << (int)start << setw(15) << oct << (int)start << setw(15) << hex << (int)start << endl;
    }
}