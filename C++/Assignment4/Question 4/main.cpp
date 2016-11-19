#include <iostream>

template < typename T >
T findMax(T arr[], int size);

using namespace std;

int main() {

    int intArray[25] = {2,5,67,2,34,23,76,475,435,345,345,34,346,47,45,245,234,23,357,45,45,32,4523,6543,63};

    double doubleArray[25] = {3453.4534,534634.5345,346375.58463,5346.45845,4634.34635,7454.345,45745.74653,463.7345,324534.634,534.534,34.53,463.45,3465.345,34.634,534.734,53.463,645.6456,4564.5645,634554,645.6346,457.4563,576.3453,453.45,34534.5435,34534.5345};

    char* stringArray[25] = {"is the enemy covered in sauce?",
                             "no",
                             "apply sauce",
                             "yes",
                             "you got a meatball?",
                             "no",
                             "you got your fork?",
                             "naw",
                             "electro-ghetti",
                             "yes",
                             "twirl your noodles",
                             "yes",
                             "mamma mia!",
                             "grande electro-ghetti",
                             "is your meatball spicy?",
                             "no",
                             "the maelstromi, is she full?",
                             "si",
                             "no",
                             "yes",
                             "bada-boom",
                             "is the enemy dead?",
                             "no",
                             "yes",
                             "perche si trovano a tua madre?"};

    cout << "Largest in Int Array: " << findMax(intArray, 25) << endl;
    cout << "Largest in Double Array: " << findMax(doubleArray, 25) << endl;
    cout << "Largest in Meme Array: " << findMax(stringArray, 25) << endl;

}

template < typename T>
T findMax(T arr[], int size) {

    T tempMax = arr[0];

    for(int i = 1; i < size; i++) {

        if(arr[i] > tempMax)
            tempMax = arr[i];
    }

    return tempMax;
}