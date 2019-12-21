export PATH := $(PATH):./node_modules/.bin

.PHONY: test

test:
	jest

lint-ci:
	eslint .
	prettier *.md

lint:
	eslint --cache --fix .
	prettier --write *.md
