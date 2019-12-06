#!/bin/sh

node bedrock-manager/src/input_piper.js | LD_LIBRARY_PATH=. ./bedrock_server
