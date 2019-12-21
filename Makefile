export PATH := $(PATH):./node_modules/.bin

.PHONY: test

test:
	jest

lint-ci:
	eslint --ignore-pattern .
	prettier *.md
	dtslint --expectOnly types

lint:
	eslint --cache --fix .
	prettier --write *.md
