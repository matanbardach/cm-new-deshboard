// This component handles the App template used on every page.
import React, { PropTypes } from 'react';


// props.children: we pass in as children the all react component that we get from react-route.
class App extends React.Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired
};

export default App;
