export PATH := $(PATH):./node_modules/.bin

.PHONY: test

test:
	jest

lint-ci:
	eslint --ignore-pattern test/fixtures/* src test
	prettier *.md
	dtslint --expectOnly types

lint:
	eslint --cache --fix .
	prettier --write *.md
