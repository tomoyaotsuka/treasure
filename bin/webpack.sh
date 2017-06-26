#!/bin/sh
NODE_ENV=${1:-DEV} webpack --progress --colors $2
