class PingJob < ApplicationJob
  def perform(addr)
    Rails.logger.debug("ping #{addr}")

    icmp = Net::Ping::ICMP.new(addr)
    rtary = []
    pingfails = 0
    repeat = 5

    broadcast(addr, 'starting to ping')
    (1..repeat).each do
      if icmp.ping
        rtary << icmp.duration
        broadcast(addr, "host(#{addr}) replied in #{icmp.duration}")
      else
        pingfails += 1
        broadcast(addr, 'timeout')
      end
      sleep 1
    end
    avg = rtary.inject(0) {|sum, i| sum + i}/(repeat - pingfails)
    broadcast(addr, "Average round-trip is #{avg}")
    broadcast(addr, "#{pingfails} packets were droped")
  end

  private

  def broadcast(addr, message)
    ActionCable.server.broadcast "pong:#{addr}", message
  end

end
