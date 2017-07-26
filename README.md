Webpacker + ActionCable
==

## Docker Compose

- Docker for Windows 17.06.0-ce
- Bash on Ubuntu on Windows 10 (Creaters Update)
  - Docker version 17.06.0-ce, build 02c1d87
  - docker-compose version 1.14.0, build c7bdf9e
  - dokcer-sync 0.4.6

export DOCKER_HOST=tcp://127.0.0.1:2375

docker-compose -f docker-compose.yml -f docker-compose.sync.yml build

## Demo

bundle exec rails s

bundle exec webpack-dev-server

### for Docker compose

docker-compose -f docker-compose.yml -f docker-compose.sync.yml build

docker-sync-stack start

docker-compose -f docker-compose.yml -f docker-compose.sync.yml run -p 8080:8080 app bundle exec ruby ./bin/webpack-dev-server

Open http://127.0.0.1:3000


## ActionCable

yarn add actioncable

```js
const ActionCable = require('actioncable');
const cable = ActionCable.createConsumer();
let PingChannel = cable.subscriptions.create('PingChannel', {});
```
