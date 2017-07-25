Webpacker + ActionCable
==

docker-compose -f docker-compose.yml -f docker-compose.sync.yml build

docker-sync-stack start

docker-compose -f docker-compose.yml -f docker-composeync.yml run -p 8080:8080 app bundle exec ruby ./bin/webpack-dev-server
