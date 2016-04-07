#include "OpenCVHelpers.hpp"

typedef std::pair<int, int> _pT;
#define _pV(v1, v2) std::pair<int,int>(v1, v2)

inline _pT _pSize(cv::Mat & m) {
    return _pV(m.cols, m.rows);
}

inline _pT _pScale(_pT x, float f ) {
    return _pV(x.first * f, x.second * f);
}

inline _pT _pSub(_pT p1, _pT p2) {
    return _pV(p1.first - p2.first, p1.second - p2.second);
}

std::pair<cv::Rect, cv::Size> pad(cv::Mat & m, float padding) {
    auto paddedSize = _pScale(_pSize(m), (1.0f - (padding)));
    auto borderSize = _pSub(_pSize(m),paddedSize);
    auto orig       = _pV(borderSize.first/2, borderSize.second/2);
    auto rect       = cv::Rect(orig.first, orig.second, paddedSize.first, paddedSize.second);
    auto rectSize   = cv::Size(paddedSize.first, paddedSize.second);
    return std::pair<cv::Rect, cv::Size>(rect, rectSize);
}

CGWindowResizeInfo resizeKeepAspectRatio(cv::Mat & in, cv::Mat & out) {
    float wWidth = out.cols;
    float wHeight = out.rows;
    debugMat(out);

    float iw = in.cols;
    float ih = in.rows;

    auto bigger = (iw > wWidth) || (ih > wHeight);

    if(bigger) {
        if(iw > wWidth) {
            float ratio = wWidth/ iw;
            iw = iw * ratio;
            ih = ih * ratio;
        }
        if(ih > wHeight) {
            float ratio = wHeight/ ih;
            iw = iw * ratio;
            ih = ih * ratio;
        }
    } else {
        float rw = wWidth / iw;
        float rh = wHeight / ih;
        if(rh > rw) {
            iw = std::min(wWidth,  iw * rw);
            ih = std::min(wHeight, ih * rw);
        } else {
            iw = std::min(wWidth,  iw * rh);
            ih = std::min(wHeight, ih * rh);
        }
    }
    // (iw x ih) Actual image size that i) keeps AR and ii) fits into final view
    auto iiw = (unsigned long) iw;
    auto iih = (unsigned long) ih;

    // (deltaW x deltaH) left-horizontal and top-vertical borders to fit final view
    auto deltaW = std::max<unsigned long>(0,(out.cols - iiw) >> 1);
    auto deltaH = std::max<unsigned long>(0,(out.rows - iih) >> 1);

    cv::Mat dst1;
    resize(in, dst1, cvSize(iw, ih), 0, 0, cv::INTER_CUBIC);

    // (_wRem x _hRem) right-horizontal and bottom-vertical borders ("remainders")
    auto _hRem = std::max<unsigned long>(0, out.rows - deltaH - dst1.rows);
    auto _wRem = std::max<unsigned long>(0, out.cols - deltaW - dst1.cols);

    debugShouldEqual(out.rows, dst1.rows + deltaH + _hRem);
    debugShouldEqual(out.cols, dst1.cols + deltaW + _wRem);

    // Resize image 'dst1' into 'out'.

    copyMakeBorder(dst1, out, deltaH, _hRem, deltaW, _wRem, cv::BORDER_CONSTANT, 0);

    return { deltaW, deltaH, _wRem, _hRem, (unsigned long) dst1.cols, (unsigned long) dst1.rows };
}
