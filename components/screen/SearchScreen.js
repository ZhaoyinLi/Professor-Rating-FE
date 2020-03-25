import * as React from 'react';

class SearchScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static navigationOptions = {
    title: 'Search Course',
  };

  render() {
    return 'Search Course Here';
  }
}

export default SearchScreen;
