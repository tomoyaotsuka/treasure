#!/bin/sh

# Generate json for ENV
echo '{ "ENV": "'${1:-DEV}'" }' > data/env.json

# Minify json
json-minify data/site.json > data/site.min.json

# Merge json files
json-merge data/env.json data/site.min.json > data/data.json

# Compile pug
pug src/template --out dist --pretty --silent --obj data/data.json $2
