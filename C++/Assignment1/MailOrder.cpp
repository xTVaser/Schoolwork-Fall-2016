#include <iostream>
#include <stdio.h>

using namespace std;

void addRevenue(long double (&revenue)[5][2], int pNum, int qSold) {

    //Finds the correct product, adds its cost as well as the number of products its sold
    switch(pNum) {

        case 1:
            revenue[0][0] += 2.98 * qSold;
            revenue[0][1] += qSold; break;
        case 2:
            revenue[1][0] += 4.50 * qSold; 
            revenue[1][1] += qSold; break;
        case 3:
            revenue[2][0] += 9.98 * qSold; 
            revenue[2][1] += qSold; break;
        case 4:
            revenue[3][0] += 4.49 * qSold; 
            revenue[3][1] += qSold; break;
        case 5:
            revenue[4][0] += 6.87 * qSold; 
            revenue[4][1] += qSold; break;
        default:
            break;
    }
}

void printResults(long double revenue[5][2]) {

    //The quantity is a float so we cast it a whole number.
    printf("Product 1 - ($2.98 x %d) = %5.2Lf\n",(int)revenue[0][1],revenue[0][0]);
    printf("Product 2 - ($4.50 x %d) = %5.2Lf\n",(int)revenue[1][1],revenue[1][0]);
    printf("Product 3 - ($9.98 x %d) = %5.2Lf\n",(int)revenue[2][1],revenue[2][0]);
    printf("Product 4 - ($4.49 x %d) = %5.2Lf\n",(int)revenue[3][1],revenue[3][0]);
    printf("Product 5 - ($6.87 x %d) = %5.2Lf\n",(int)revenue[4][1],revenue[4][0]);
    printf("Total Revenue = %5.2Lf\n",(revenue[0][0]+revenue[1][0]+revenue[2][0]+revenue[3][0]+revenue[4][0]));

    return;
}

int main(int argc, char* argv[]) {

    //If the store only has 5 products...we could have just asked how
    //much of each product was sold

    int pNum = 1; //We dont want to start at 0 or we won't loop.
    int qSold;

    bool actuallyInputtedSomething = false;

    long double revenue[5][2];

    //Get rid of the nans
    for(int row = 0; row < 5; row++)
        for(int col = 0; col < 2; col++)
            revenue[row][col] = 0.0;

    cout << "Enter product number '0' to exit..." << endl;

    while(pNum != 0) {

        cout << "Product Number: ";
        cin >> pNum;

        //My sentinel is 0, so ask the user again on an error or >5
        while(pNum > 5 || !cin) {

            cin.clear();
            cin.ignore(256, '\n');
            cout << "Valid product numbers are between range (1-5): ";
            cin >> pNum;
        }

        if(pNum == 0)
            break;

        cout << "Quantity Sold: ";
        cin >> qSold;
        
        //Ask for the quantity until positive.
        while(qSold < 0 || !cin) {

            cin.clear();
            cin.ignore(256, '\n');
            cout << "Sorry, enter a non-negative integer for quantity sold: ";
            cin >> qSold;
        }
        
        //Once we have the data add it to the array, and flag.
        addRevenue(revenue, pNum, qSold);
        actuallyInputtedSomething = true;
    }

    //Flag is so we dont print anything if the user immediately causes an error/stops the program.
    if(actuallyInputtedSomething)
        printResults(revenue);

    return 0;
}


