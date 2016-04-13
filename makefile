#
# Preliminaries
#

PROCREGEXP="node.*webpack|Electron"
include .make/index.make

WEBPACK=./node_modules/.bin/webpack
WEBPACK_PRODUCTION_FLAGS=--config webpack/webpack.config.production.js
WEBPACK_FLAGS=--progress --profile --colors


ELECTRON=./node_modules/.bin/electron

SHELL := /bin/bash
help: ## This help dialog.
	@IFS=$$'\n' ; \
	help_lines=(`fgrep -h "##" $(MAKEFILE_LIST) | fgrep -v fgrep | sed -e 's/\\$$//' | sed -e 's/##/:/'`); \
	printf "%-30s %s\n" "target" "help" ; \
	printf "%-30s %s\n" "------" "----" ; \
	for help_line in $${help_lines[@]}; do \
		IFS=$$':' ; \
		help_split=($$help_line) ; \
		help_command=`echo $${help_split[0]} | sed -e 's/^ *//' -e 's/ *$$//'` ; \
		help_info=`echo $${help_split[2]} | sed -e 's/^ *//' -e 's/ *$$//'` ; \
		printf '\033[36m'; \
		printf "%-30s %s" $$help_command ; \
		printf '\033[0m'; \
		printf "%s\n" $$help_info; \
	done

all: release ## = release

#
# Release build
#

.phony: release
release: ## cleanup and build local electron app
	make release-clean
	make release-build-modules
	make release-build-native

.phony: release-run
release-run: ## run local electron app
	${ELECTRON} .

.phony: release-build-modules
release-build-modules:
	${WEBPACK} ${WEBPACK_PRODUCTION_FLAGS} ${WEBPACK_FLAGS}

.phony: release-build-native
release-build-native:
	HOME=~/.electron-gyp ./node_modules/.bin/node-gyp rebuild --target=0.37.2 --arch=x64 --dist-url=https://atom.io/download/atom-shell

.phony: release-package
release-package: ## package local app into an OSX .app (`release` directory)
	make release
	cp ./assets/TeasyIcon.icns ./app/app.icns
	node package.js

.phony: release-on-github
release-on-github: ## To be fixed..
	echo "Packing up release. Remember to source GITHUBTOKEN before using this target."
	./node_modules/.bin/electron-release --app=./release/darwin-x64/Teasy-darwin-x64/Teasy.app --token=$$GITHUBTOKEN

.phony: release-clean
release-clean: ## cleanup local app
	rm -rf build
	rm -rf dist
	rm -rf release

#
# Development targets
#


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

#
# Shortcuts
#

start: development-start
stop: kill-procs ## stop development server
show: show-procs ## start development server (compile and hot reload)
