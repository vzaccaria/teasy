#include "exportedFunctions.h"

using v8::FunctionTemplate;

// this represents the top level of the module.
// C++ constructs that are exposed to javascript are exported here

#define __js_expose_fn(name, function) (Nan::Set(target, Nan::New(name).ToLocalChecked(), Nan::GetFunction(Nan::New<FunctionTemplate>(function)).ToLocalChecked()));

NAN_MODULE_INIT(InitAll) {
    __js_expose_fn("windowList", windowList);
    __js_expose_fn("getImageBufferResized", getImageBufferResized);
}

NODE_MODULE(nativeSgrabHelper, InitAll)
