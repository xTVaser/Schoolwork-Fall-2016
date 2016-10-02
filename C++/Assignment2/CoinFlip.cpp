#include <cstdlib>
#include <iostream>

int flip();

int main(int argc, char * argv[]) {
    
    //Randomize the random seed so you have a harder time debugging it
    unsigned int currentTime = time(0);
    srand(currentTime);

    //Counters
    int numTails = 0;
    int numHeads = 0;
    int numFlips = 0;

    //Get the number of flips you want to do (optional)
    std::cout << "Enter number of flips: ";
    std::cin >> numFlips;

    //Error detection
    if(numFlips < 0 || !std::cin) {
        std::cout << "Please try again";
        return -1;
    }

    //Loop n times, each time get the result of the flip, print it out, inc counters
    for(int i = 0; i < numFlips; i++) {

        int result = flip();
        
        if(result == 0) { //Tails = 0
            std::cout << "Flip #: " << (i+1) << " Resulted in: TAILS" << std::endl;
            numTails++;
        }
        else if(result == 1) {//Heads = 1
            std::cout << "Flip #: " << (i+1) << " Resulted in: HEADS" << std::endl;
            numHeads++;
        }
    }
    
    //Print final results
    std::cout << "After " << numFlips << " flips, Heads: " << numHeads << " Tails: " << numTails << std::endl;

    return 0;
}

//Simple function that just returns either 0 or 1, 0 is tails, 1 is heads.
int flip() {
    
    return rand() % 2;
}
