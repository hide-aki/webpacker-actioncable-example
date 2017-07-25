if ENV['DOCKER']
  Rails.application.config.paths.add 'config/database', with: 'config/database.docker.yml'
end
