#!/bin/bash
set -e

# このファイルは docker-compose build によってイメージに含められ、
# コンテナの実行時にフックされます。

bundle config --local retry 5
bundle config --local jobs 4
bundle config --local path vendor/bundle

if [ ! -e vendor/bundle/ruby ]; then
  # ほかのコンテナからも同じ設定を参照するように --local を設定
  bundle install
fi

if [ -z "`ls node_modules`" ]; then
  yarn install
fi
