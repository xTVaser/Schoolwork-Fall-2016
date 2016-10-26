#include <iostream>
#include <cstdlib>
#include <iomanip>

using namespace std;

class Rectangle {
    
    private:
        double length;
        double width;
    
    public:
        Rectangle(double length = 1.0, double width = 1.0) {

            this->length = length;
            this->width = width;
        }

        void setLength(double length) {

            if(length > 0.0 && length < 20.0)
                this->length = length;
        }

        void setWidth(double width) {

            if(width > 0.0 && width < 20.0)
                this->width = width;
        }

        double getLength() {

            return length;
        }

        double getWidth() {

            return width;
        }
};

int main() {

    Rectangle *rec1 = new Rectangle(1.0, 5.0);

    cout << showpoint << fixed << setprecision(3) << rec1->getLength() << " " << rec1->getWidth();

}
    
