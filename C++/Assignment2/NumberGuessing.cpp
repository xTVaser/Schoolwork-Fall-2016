#include <iostream>
#include <cstdlib>

int setup();

int main(int argc, char * argv[]) {

    //Put the menu into a function because its annoying
    int answer = setup();
    int guess = 0;

    //Loop until the user gets the right answer
    while(guess != answer) {

        std::cin >> guess;

        if(!std::cin) //Error detection
            return -1;

        //If they are above the answer, say too high.
        if(guess > answer)
            std::cout << "Too high. Try Again!" << std::endl;

        //If they are below the answer, say too low.
        else if(guess < answer)
            std::cout << "Too low. Try Again!" << std::endl;

        //Else they must be correct, so ask if they want to play again
        else {
            std::cout <<    "Excellent! You guessed the number!" << std::endl <<
                            "Would you like to play again (Y or N):";
            
            //Hopefully they say no
            char replay = 'n';

            std::cin >> replay;

            //They didnt say no, :(, reset guess back to 0 so loop will continue, print menu and such again.
            if(replay == 'y' || replay == 'Y') {
                guess = 0;
                answer = setup();
            }
        }
    }

    return 0;
}

//Prints the menu as well as determines the answer to the game
int setup() {

    std::cout <<    "I have a number between 1 and 1000." << std::endl << 
                    "Can you guess my number?" << std::endl <<
                    "Please type your first guess: ";

    //Randomized the seed to make debugging for you harder.
    unsigned int currentTime = time(0);
    srand(currentTime);

    //% 1000 only returns 0-999, so we need to add 1 to make it 1-1000.
    return rand() % 1000 + 1;
}
