#!/bin/bash
set -e

s3_bucket_name=$(aws cloudformation  describe-stacks --stack-name dev-toolbox --no-cli-pager --output json | jq -r '.Stacks[0].Outputs[] | select(.OutputKey=="S3BucketName").OutputValue')
aws s3 rm s3://"$s3_bucket_name" --recursive
aws cloudformation delete-stack --stack-name dev-toolbox --no-cli-pager