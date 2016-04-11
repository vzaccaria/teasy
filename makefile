###################
# Preliminaries
###################

PROCREGEXP="node.*webpack|Electron"
include .make/index.make

WEBPACK=./node_modules/.bin/webpack
WEBPACK_PRODUCTION_FLAGS=--config webpack/webpack.config.production.js
WEBPACK_FLAGS=--progress --profile --colors


ELECTRON=./node_modules/.bin/electron

all: release

###################
# Release build
###################

.phony: release
release:
	make release-clean
	make release-build-modules
	make release-build-native

.phony: release-run
release-run:
	${ELECTRON} .

.phony: release-build-modules
release-build-modules:
	${WEBPACK} ${WEBPACK_PRODUCTION_FLAGS} ${WEBPACK_FLAGS}



.phony: release-build-native
release-build-native:
	HOME=~/.electron-gyp ./node_modules/.bin/node-gyp rebuild --target=0.37.2 --arch=x64 --dist-url=https://atom.io/download/atom-shell

.phony: release-package
release-package:
	make release
	cp ./assets/TeasyIcon.icns ./app/app.icns
	node package.js

.phony: release-clean
release-clean:
	rm -rf build
	rm -rf dist

######################
# Development targets
######################


WEBPACK_DEV_SERVER=./node_modules/.bin/webpack-dev-server
WEBPACK_DEV_SERVER_CONFIG=--config webpack/webpack-dev-server.config.js
WEBPACK_DEV_SERVER_HOT_CONFIG=--config webpack/webpack-hot-dev-server.config.js --hot
WEBPACK_DEV_SERVER_FLAGS=--progress --colors --port 2992 --inline

.phony: development-start
development-start:
	make release-build-native
	make hot-development-client-start &
	make hot-development-server-start &

.phony: development-server-start
development-server-start:
	${WEBPACK_DEV_SERVER} ${WEBPACK_DEV_SERVER_CONFIG} ${WEBPACK_DEV_SERVER_FLAGS}

.phony: hot-development-server-start
hot-development-server-start:
	${WEBPACK_DEV_SERVER} ${WEBPACK_DEV_SERVER_HOT_CONFIG} ${WEBPACK_DEV_SERVER_FLAGS}

hot-development-client-start:
	HOT=1 NODE_ENV=development ${ELECTRON} .

dev-show-procs: show-procs

dev-stop-procs: kill-procs

dev-restart:
	make dev-stop-procs
	make hot-development-server-start

############
# Shortcuts
############

start: development-start
stop: kill-procs
show: show-procs
