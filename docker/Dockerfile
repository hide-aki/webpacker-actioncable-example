# 開発環境 Dockerfile
#
# 基本方針
# - DockerイメージにAppソースやgemを含めずコンテナにマウントして使うことで、git checkoutなどではイメージのbuildは不要とする
# - Dockerコンテナが提供するのはアプリケーション実行に必要なミドルウェアやインタプリタなどのみとし、この環境構築を簡単にする
# - Dockerfile単体で使うことはない。docker-compose前提。

FROM ruby:2.4.1
MAINTAINER Yuichi Takeuchi <yuichi.takeuchi@takeyuweb.co.jp> (@takeyuweb)

ENV ENTRYKIT_VERSION 0.4.0

WORKDIR /

RUN wget https://github.com/progrium/entrykit/releases/download/v${ENTRYKIT_VERSION}/entrykit_${ENTRYKIT_VERSION}_Linux_x86_64.tgz \
  && tar -xvzf entrykit_${ENTRYKIT_VERSION}_Linux_x86_64.tgz \
  && rm entrykit_${ENTRYKIT_VERSION}_Linux_x86_64.tgz \
  && mv entrykit /bin/entrykit \
  && chmod +x /bin/entrykit \
  && entrykit --symlink

RUN curl -sL https://deb.nodesource.com/setup_6.x | bash -
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update -qq

# Install packages for building app
RUN apt-get install -y build-essential libmysqlclient-dev nodejs yarn

RUN rm -rf /var/cache/apk/*

COPY setup.sh /root/setup.sh

# docker-compose でRailsルートディレクトリをここにマウントしている
WORKDIR /app

ENV DOCKER 1

# Setup bundler
# 明示しないとみにいってくれないので指定した上で
# docker-composeで共有ボリュームに設定
ENV BUNDLE_APP_CONFIG /app/.bundle

ENTRYPOINT ["prehook", "bash /root/setup.sh", "--"]
