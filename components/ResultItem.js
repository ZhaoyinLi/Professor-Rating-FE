import * as React from 'react';

import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  List,
} from 'react-native-paper';
import { View, StyleSheet, Text, ScrollView, FlatList } from 'react-native';

class ResultItem extends React.Component {
  constructor(props) {
    super(props);
    this.state;
  }

  static navigationOptions = {
    title: 'Course Name', //var need to be changed
  };

  toComment() {
    const { course_id, url, navigate, token, comments} = this.props;
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
        id:this.props.course_id,
      })
    })
      .then(response => {
        return response.json();
      })
      .then(result => {
        if (result.success === true) {
          const terms = result.data;
          const token = terms.token;
          alert("You have added " + terms.name + " to your favorite list.");
        } else {
          alert("You have already added this course to your favorite list.");
        }
      })
      .catch(err => {
        alert(err);
      });

     navigate('Saved', {
      id:id,
      course_id: course_id,
      url: url,
      token:token,
      email:email,
    });
  }

  render() {
    return (
      <ScrollView>
        <Card style={styles.card}>
          <Card.Content>
            <Title>{this.props.title}</Title>

            <Paragraph>{this.props.description}</Paragraph>
          </Card.Content>
          <Card.Actions>
            <Button onPress={() => this.toComment()}>Detail</Button>
            <Button onPress={() => this.toSaved()}>Saved</Button>
          </Card.Actions>
        </Card>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  card: { width: '94%', marginLeft: '3%', marginTop: '3%' },
});

export default ResultItem;
