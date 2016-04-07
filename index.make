# Use this makefile with: make -I(THISDIRECTORY)

BUILDIR ?= dist
PROCREGEXP ?=
WATCHOBJECT ?=
WATCHTARGET ?=

#.SILENT:
#.IGNORE:


.DEFAULT_GOAL := all

# Used to create a directory as a prerequisite of a file
.SECONDEXPANSION:

mirrorinto		= $(patsubst %, $1/%, $2)
collapseinto	= $(patsubst %, $1/%, $(notdir $2))

# Used to create a directory as a prerequisite of a file
%/.f:
	mkdir -p $(dir $@)
	touch $@

clean:
	rm -rf $(BUILDIR)


.phony: watch
watch:
	watchman $(WATCHOBJECT) "make $(WATCHTARGET)" &


.PHONY: show-procs
show-procs:
	@echo 'Processes in PROCREGEXP = $(PROCREGEXP), WATCHOBJECT = $(WATCHOBJECT)'
	@echo ' '
	$(if $(PROCREGEXP),  pgrep -l -f $(PROCREGEXP), @echo "PROCREGEXP not set")
	$(if $(WATCHOBJECT), pgrep -l -f ".*watchman.*$(WATCHOBJECT)", @echo "WATCHOBJECT not set")

.PHONY: kill-procs
kill-procs:
	@make show-procs
	$(if $(PROCREGEXP),  pkill -9 -f $(PROCREGEXP), @echo "PROCREGEXP not set")
	$(if $(WATCHOBJECT), pkill -9 -f ".*watchman.*$(WATCHOBJECT)", @echo "WATCHOBJECT not set")

show: show-procs

stop: kill-procs

include build.make
