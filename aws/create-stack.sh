#!/bin/bash
set -e

script_dir=$(dirname "$0")
aws cloudformation create-stack --stack-name dev-toolbox --template-body file://"$script_dir"/cloud-formation-template.json --no-cli-pager