#include <algorithm>
#include <utility>
#include <opencv2/opencv.hpp>
#include "debug.hxx"
#include "cppformat/format.h"

#ifndef __OPENCV_HELPERS__
#define __OPENCV_HELPERS__

typedef struct {
    unsigned long borderSizeLeft;
    unsigned long borderSizeTop;
    unsigned long borderSizeRight;
    unsigned long borderSizeBottom;
    unsigned long innerWidth;
    unsigned long innerHeight;
} CGWindowResizeInfo;

#define white  CV_RGB(255,255,255)
#define black  CV_RGB(0,0,0)

#define debugMat(name) debugm(fmt::format("{} ({}x{})", #name, name.cols, name.rows))
#define debugVal(name) debugm(fmt::format("temporary ({})", name))
#define debugShouldEqual(v1,v2) { debugm(fmt::format("{} ~ {}", v1, v2)) ; assert(v1 == v2); }
#define debugShouldGEQ(v1,v2) { printf(fmt::format("{} >= {}", v1, v2)) ; assert(v1 >= v2); }

extern std::pair<cv::Rect, cv::Size> pad(cv::Mat & m, float padding);
extern CGWindowResizeInfo resizeKeepAspectRatio(cv::Mat & in, cv::Mat & out);

#endif
