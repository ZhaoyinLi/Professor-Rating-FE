import * as React from 'react';

class CourseSearchScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static navigationOptions = {
    title: 'Course',
  };

  render() {
    return 'Search Course';
  }
}

export default CourseSearchScreen;
