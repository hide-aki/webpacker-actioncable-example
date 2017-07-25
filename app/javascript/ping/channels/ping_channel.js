const ActionCable = require('actioncable');
const cable = ActionCable.createConsumer();
let PingChannel = cable.subscriptions.create('PingChannel', {
  connected() {
    console.log('PingChannel connected');
  },
  ping(ipaddr) {
    console.log('PingChannel#ping');
    this.perform('ping', {ipaddr: ipaddr});
  },
  received(text) {
    console.log('PongChannel#pong');
    this.callbacks.forEach((callback) => {
      callback(text);
    });
  },
  // 応答を先を登録
  subscribe(callback) {
    this.callbacks.push(callback);
    return this.callbacks.length - 1;
  },
  unsubscribe(index) {
    this.callbacks.splice(index, 1);
  }
});

PingChannel.callbacks = [];

export default PingChannel;
