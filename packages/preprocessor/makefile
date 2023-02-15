#-------------------------COMMON PART-------------------------
MAKEFLAGS += --silent
# mkfile_path := $(abspath $(lastword $(MAKEFILE_LIST)))
LocalNodeBin := ./node_modules/.bin

define workspace_exec
	../../$(LocalNodeBin)/$(1)
endef

define node_exec
	-($(LocalNodeBin)/$(1)) | $(call workspace_exec,$(1))
endef
#-------------------------------------------------------------

MdxCompilerFolder = preprocessor
MdxRmf = remark-mdx-frontmatter

Dist = dist
Build = build
Source = src/index.ts
Entry = main.js

define rimraf
	$(call node_exec,rimraf $(1))
endef

define tsup
	$(call node_exec,tsup $(1))
endef

.PHONY: build start serve
.SLINET: build start serve

#TODO:
# [ ] check dependency folder, make sure it exist
# [ ] auto generate path without hard coded relative pathes
# [ ] better node_exec lookup
build:
	echo building dependency...
	cd ../$(MdxRmf)
	-tsc --noEmit false
	cd ../$(MdxCompilerFolder)
	echo rm outdate dist...
	$(call rm,$(Dist))
	$(call rm,$(Build))
	echo building...
	$(call tsup,$(Source) --dts)
	echo build success!
	echo

start:
	node $(Entry)

serve: build start
