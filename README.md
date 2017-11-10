# Teasy

> A tiny tool to make teaching easier.

Teasy allows to select an application window to be mirrored into an
*external monitor window*. You can choose the application to mirror by
using the *control and preview window*. I use it during live programming
classes, where I project only the IDE, keeping my cluttered desktop for
myself :).

![Main
windows](https://dl.dropboxusercontent.com/u/5867765/images/teasy_main_windows_explained.png)

## Features

You have a customizable laser pointer, which appears whenever you hover
on the actual application window

![Main
windows](https://dl.dropboxusercontent.com/u/5867765/images/teasy_laser_customize.png)

You can also hide temporarily the app from the main monitor window and
show a clock (with a configurable timer) instead. I find this very
useful to signal when the lecture is going to be resumed during a break.

![Main
windows](https://dl.dropboxusercontent.com/u/5867765/images/teasy_timer.png)

## Todo

-   Tests
-   MOAR tests
-   Add a live twitter stream (with moderation). In this way students
    can participate by sending questions which can then be shown in
    realtime.
-   Add twitter polls.

## Contributing

The makefile exposes all the targets you may need to develop and release
a new app. Here's the description of the targets:

    target                         help
    ------                         ----
    help                           This help dialog.
    all                            = release
    release                        cleanup and build local electron app
    release-run                    run local electron app
    release-build-modules          build just js modules
    release-build-native           build just native cpp modules (coregraphics stuff)
    release-package                package local app into an OSX .app (`release` directory)
    release-on-github              To be fixed..
    release-clean                  cleanup local app
    stop                           stop development server
    show                           start development server (compile and hot reload)

# Prerequisites

- Install opencv:

  brew install opencv

## Licensing

The MIT License (MIT)

Teasy: Copyright (c) 2015 V. Zaccaria

Permission is hereby granted, free of charge, to any person obtaining a
copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be included
in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## Credits

-   Concept, design and implementation: [Vittorio
    Zaccaria](https://github.com/vzaccaria)
-   Original Electron Boilerplate [C. T.
    Lin](https://github.com/chentsulin)
