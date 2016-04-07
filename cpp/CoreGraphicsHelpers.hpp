#include "CF++.h"
#include <CoreGraphics/CoreGraphics.h>
#include <Carbon/Carbon.h>
#include <ImageIO/ImageIO.h>
#include <iostream>
#include <utility>
#include <unistd.h>
#include <vector>
#include "OpenCVHelpers.hpp"

typedef std::pair<std::string, CGWindowID> CGWindowInfo;
typedef std::vector<CGWindowInfo> CGWindowInfoList;

typedef struct {
    const char *pointer;
    unsigned long size;
    unsigned long rows;
    unsigned long cols;
    CGWindowResizeInfo resizeInfo;
} CGWindowBuffer;


#define _wbuf(p, i, m) { p, i, m }
#define _wbuf_getPointer(x)        (x.pointer)
#define _wbuf_getSize(x)           (x.size)

std::string getWindowListAsJsonString();

CGWindowID   getWindowID(std::string wname);
CGImageRef   getWindowImage(CGWindowID windowId);
CGWindowBuffer getImageAsBufferResized(CGWindowID windowId, unsigned int, unsigned int);
CGWindowBuffer convertImageRefToRGBA(CGImageRef imageRef);
