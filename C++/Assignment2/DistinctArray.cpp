#include <iostream>

bool contains(int[], int, int);

int main(int argc, char * argv[]) {
    
    //Declare variables
    int array[10]; //Do not initialize with 0s because if the user enters a 0 = bad.
    int numDistinct = 0;

    std::cout << "Please Enter Ten Numbers: ";

    //Collect 10 numbers
    for(int i = 0; i < 10; i++) {

        int x = 0;

        std::cin >> x;

        if(!std::cin) //Error checking
            return -1;

        //As per the hint in the assignment, each time before we add it to the array,
        //Check that it isnt already in the array
        if(!contains(array, x, numDistinct)) {
            //If so, increment the number of distinct elements and add it to the array
            array[numDistinct++] = x;
        }
    }

    //Only print out the distinct numbers in the array, leave the extra padding alone.
    for(int i = 0; i < numDistinct; i++) {

        std::cout << array[i];

        if(i != numDistinct-1) //Get rid of the trailing comma
            std::cout << ", ";
    }

    std::cout << std::endl;

    return 0;
}

//Returns true or false if the array contains the given number
bool contains(int * array, int x, int numDistinct) {

    //Loop only through the numbers we have added, we dont need to loop through all 10.
    for(int i = 0; i < numDistinct; i++) {
        //If it be there, we say ye
        if(array[i] == x)
            return true;
    }

    return false;
}
