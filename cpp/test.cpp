#include "CoreGraphicsHelpers.hpp"
#include <stdio.h>


int main(int argc, char *argv[])
{
    printf("%s", getWindowListAsJsonString().c_str());
    return 0;
}
