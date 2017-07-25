class PingChannel < ApplicationCable::Channel
  def ping(data)
    Rails.logger.debug data.inspect
    stop_all_streams
    ipaddr = data['ipaddr'].to_s
    stream_from "pong:#{ipaddr}"
    PingJob.perform_later(ipaddr)
  end
end
