// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

const React = require('react');
const PropTypes = require('prop-types');
const styles = require('../hello_react/styles/hello-react');
console.log(styles);
export default class Hello extends React.Component {
  render() {
    return <div className={styles.hello}>Hello {this.props.name}!</div>;
  }
}

Hello.defaultProps = {
  name: 'David'
};

Hello.propTypes = {
  name: PropTypes.string
};
