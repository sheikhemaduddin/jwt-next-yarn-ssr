#!/usr/bin/env bash
set -e
corepack enable
yarn install
echo "Generated yarn.lock"
