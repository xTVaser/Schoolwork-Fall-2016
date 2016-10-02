#include <iostream>
#include <string>

int count(char *, char);

int main(int argc, char * argv[]) {

    //Collect the string from the user
    std::cout << "Enter a String: ";

    std::string str;
    std::getline (std::cin, str); //Store string into variable, this allows any size
    char * strPtr = &str[0];  //Initialize a pointer at the beginning of the string

    if(!std::cin) //Error detection
        return -1;

    //Get the character from the user, always takes the first entered character
    std::cout << "Enter a character: ";
    char character;
    std::cin >> character;

    if(!std::cin) //Error detection
        return -1;

    //Print out results by calling the function
    std::cout << "'" << character << "' occurs in the string: '" << str << "' " << count(strPtr, character) << " times." << std::endl;

    return 0;
}

//Counters the occurance of a character in a given string
//Takes in a pointer to a char array and a char.
int count(char * str, char c) {

    //Make a copy of the pointer, but its not really needed anymore
    char * i = str;
    int count = 0;

    //Loop until we find a null terminating character
    while(*i != '\0') {
        
        //If we find hte character, increment the conuter
        if(*i == c)
            count++;

        //Increment the pointer to the next byte
        i++;
    }

    return count;
}
