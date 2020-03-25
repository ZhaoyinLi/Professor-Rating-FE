import * as React from 'react';

class SearchResultScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static navigationOptions = {
    title: 'Search Result',
  };

  render() {
    return 'Search Result';
  }
}

export default SearchResultScreen;
