import * as React from 'react';

class SavedCourseScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static navigationOptions = {
    title: 'Saved Courses',
  };

  render() {
    return 'Saved Courses';
  }
}

export default SavedCourseScreen;
