import * as React from 'react';

import {
  Button,
  Card,
  Title,
  Paragraph,
  IconButton,
} from 'react-native-paper';
import { View, StyleSheet } from 'react-native';

class ResultItem extends React.Component {
  constructor(props) {
    super(props);
    this.state;
  }

  static navigationOptions = {
    title: 'Course Name', 
  };

  toComment() {
    const { course_id, url, navigate, token, comments } = this.props;
    navigate('Comment', {
      course_id: course_id,
      url: url,
      token: token,
      comments: comments,
    });
  }

  toSaved() {
    const { course_id, url, navigate, token, email, id } = this.props;
    fetch(url + '/v1/terms/favorite', {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Accept: '*/*',
        token: token,
      },
      body: JSON.stringify({
        id: this.props.course_id,
      })
    })
      .then(response => {
        return response.json();
      })
      .then(result => {
        if (result.success === true) {
          const terms = result.data;
          alert("You have added " + terms.name + " to your favorite list.");
        } else {
          alert("You have already added this course to your favorite list.");
        }
      })
      .catch(err => {
        alert(err);
      });
  }

  render() {
    return (
      <View>
        <Card style={styles.card}>
          <Card.Content>
            <Title>{this.props.title}</Title>
            <Paragraph>{this.props.description}</Paragraph>
            <View style={{ position: "absolute", right: 3, top: 0 }}>
              <IconButton
                icon="heart-circle"
                color="#4630EB"
                size={30}
                onPress={() => this.toSaved()}
              />
            </View>
          </Card.Content>
          <Card.Actions>
            <Button onPress={() => this.toComment()}>Detail</Button>
          </Card.Actions>
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: { width: '94%', marginLeft: '3%', marginTop: '3%' },
});

export default ResultItem;
