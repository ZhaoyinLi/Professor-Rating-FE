import * as React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-paper';
import Comment from '../CommentItem.js';

class CommentScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
    };
  }

  static navigationOptions = {
    title: 'Comments',
  };

  componentDidMount() {
    const { url, id } = this.props.navigation.state.params;
    fetch(url + '/v1/terms/courseId/' + id, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Accept: '*/*',
      },
    })
      .then(response => {
        return response.json();
      })
      .then(result => {
        if (result.success === true) {
          let terms = result.data;
          let comments = [];
          for (let i = 0; i < terms.length; i++) {
            for (let j = 0; j < terms[i].comments.length; j++) {
              comments.push(terms[i].comments[j]);
            }
          }
          this.setState({ comments: comments });
        }
      })
      .catch(err => {
        alert(err);
      });
  }

  render() {
    return (
      <View style={{ height: '100%' }}>
        <FlatList
          data={this.state.comments}
          renderItem={({ item }) => (
            <Comment
              date={item.lastModifiedDate}
              comment={item.content}
              rate={item.rate}
            />
          )}
          keyExtractor={item => item.id}
        />
        <Button
          style={{
            width: '80%',
            position: 'absolute',
            bottom: '3%',
            left: '10%',
          }}
          mode="contained">
          ADD COMMENT
        </Button>
      </View>
    );
  }
}

export default CommentScreen;
