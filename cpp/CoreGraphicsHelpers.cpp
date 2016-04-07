#include "CoreGraphicsHelpers.hpp"
#include "json11/json11.hpp"
#include "debug.hxx"
#include "cppformat/format.h"
#include <opencv2/opencv.hpp>
#include "OpenCVHelpers.hpp"

#include <utility>
// For returning a buffer from a pointer see:
// http://www.samcday.com.au/blog/2011/03/03/creating-a-proper-buffer-in-a-node-c-addon/
// See also https://github.com/nodejs/nan/blob/7b2ec2b742816c997cd652f7e22a91d0ab32651e/doc/buffers.md

auto wOptionAll    = kCGWindowListOptionAll;
auto wOnScreenOnly = kCGWindowListOptionOnScreenOnly;
auto wNullWindow   = kCGNullWindowID;
auto wNoDesktop    = kCGWindowListExcludeDesktopElements;

using namespace std;

#define  __a(x)        (CF::Array(x).GetValues())
#define  __d(x)        (static_cast< CFDictionaryRef >(x))
#define  __dv(x, k)    (CF::Dictionary(x).GetValue(k))
#define  __s(x)        (CF::String(x).GetValue())
#define  __n(x)        (CF::Number(x))
#define  _s(x)         (CF::String(x).GetCFObject())
#define  __p(x)        (CF::Data(x).GetMutableBytePtr())

auto _wlopts = kCGWindowListOptionIncludingWindow;
auto _wrect  = CGRectNull;
auto _wcopts = kCGWindowImageBoundsIgnoreFraming;


using namespace std;
using namespace json11;
Json getWindowList();

string getWindowListAsJsonString() {
    return getWindowList().dump();
}

Json getWindowList() {
    CGWindowInfoList l;
    vector<Json> windowInfoJson;


    auto windowList = __a(CGWindowListCopyWindowInfo(wOnScreenOnly | wNoDesktop, wNullWindow));
    for (auto window: windowList) {
        auto oname  = __s(__dv(window, _s("kCGWindowOwnerName")));
        auto name   = __s(__dv(window, _s("kCGWindowName")));
        auto wid    = __n(__dv(window, _s("kCGWindowNumber")));
        auto layer  = __n(__dv(window, _s("kCGWindowLayer")));
        CFDictionaryRef bounds = __d(__dv(window, _s("kCGWindowBounds")));
        CGRect r;
        CGRectMakeWithDictionaryRepresentation(bounds, &r);
        auto cname  = oname + " - " + name;
        auto p      = CGWindowInfo(cname, wid);
        l.push_back(p);
        windowInfoJson.push_back(Json::object {
                { "name", name },
                { "owner", oname },
                { "wid", (int) wid },
                { "layer", (int) layer },
                { "x", (int) r.origin.x },
                { "y", (int) r.origin.y },
                { "width", (float) r.size.width },
                { "height", (float) r.size.height}
            });
    }
    return windowInfoJson;
}

CGWindowID getWindowID(string wname) {
    auto windowList = __a(CGWindowListCopyWindowInfo(wOptionAll | wOnScreenOnly, wNullWindow));

    for (auto window: windowList) {
        auto name = __s(__dv(window, _s("kCGWindowOwnerName")));
        if (name == wname)
            return __n(__dv(window, _s("kCGWindowNumber")));
    }
    return NULL;
}

CGImageRef getWindowImage(CGWindowID windowId) {
    return CGWindowListCreateImage(_wrect, _wlopts, windowId, _wcopts);
}


cv::Mat cgBuffer;
unsigned int cgWidth;
unsigned int cgHeight;

void convertImageRefToCGBuf(CGImageRef imageRef) {
    cgWidth = CGImageGetWidth(imageRef);
    cgHeight = CGImageGetHeight(imageRef);
    auto colorSpace = CGImageGetColorSpace(imageRef);

    cgBuffer.create(cgHeight, cgWidth, CV_8UC4);


    CGContextRef contextRef = CGBitmapContextCreate(
        cgBuffer.data,             // Pointer to backing data
        cgWidth,                      // Width of bitmap
        cgHeight,                      // Height of bitmap
        8,                         // Bits per component
        cgBuffer.step[0],          // Bytes per row
        colorSpace,                // Colorspace
        kCGImageAlphaNoneSkipLast | kCGBitmapByteOrderDefault
        );                                        // Bitmap info flags

    CGContextDrawImage(contextRef, CGRectMake(0, 0, cgWidth, cgHeight), imageRef);
    CGContextRelease(contextRef);
    CGImageRelease(imageRef);
}

CGWindowBuffer convertImageRefToRGBAWSize(unsigned int finalWidth, unsigned finalHeight) {
    cv::Mat destBuffer(finalHeight, finalWidth, CV_8UC4);
    auto resizeInfo = resizeKeepAspectRatio(cgBuffer, destBuffer);
    auto sizeBytes = destBuffer.step[0] * destBuffer.rows;
    return { (const char *) destBuffer.data, sizeBytes, finalHeight, finalWidth, resizeInfo } ;
}

CGWindowBuffer convertImageRefToRGBAResize(CGImageRef imageRef, unsigned int finalWidth, unsigned int finalHeight) {
    convertImageRefToCGBuf(imageRef);
    return convertImageRefToRGBAWSize(finalWidth, finalHeight);
}

CGWindowBuffer getImageAsBufferResized(CGWindowID windowId, unsigned int finalWidth, unsigned int finalHeight) {
    auto ir = getWindowImage(windowId);
    return convertImageRefToRGBAResize(ir, finalWidth, finalHeight);
}
