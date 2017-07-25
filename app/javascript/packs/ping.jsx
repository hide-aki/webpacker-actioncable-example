import ping_channel from "../ping/channels/ping_channel";

const React = require('react');
const PingChannel = require('../ping/channels/ping_channel');
const styles = require('../ping/styles/ping');

export default class Ping extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ipaddr: '127.0.0.1',
      results: []
    };
  }

  componentDidMount() {
    this.subscribeId = ping_channel.subscribe(this.pong.bind(this));
  }

  componentWillUnmount() {
    pong_channel.unsubscribe(this.subscribeId);
  }

  ping() {
    ping_channel.ping(this.state.ipaddr);
  }

  pong(text) {
    console.log(text);
    let results = this.state.results.concat();
    results.push(text);
    this.setState({results: results});
  }

  render() {
    return (
      <div className={styles.ping}>
        <div className={styles.form}>
          <input type="text" value={this.state.ipaddr} onChange={(event) => {
            this.setState({ipaddr: event.target.value})
          }}/>
          <button onClick={this.ping.bind(this)}>Ping</button>
        </div>
        <div className={styles.results}>
          {
            this.state.results.map((result, index) => {
              console.log(result);
              return <p key={`result${index}`}>{result}</p>;
            }).reverse()
          }
        </div>
      </div>
    );
  }
}
