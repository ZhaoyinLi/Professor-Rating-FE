import * as React from 'react';

import {
  Button,
  Card,
  Title,
  Paragraph,
  IconButton,
  Text,
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
    const { course_id, url, year, season, navigate, token, comments, title } = this.props;
    navigate('Comment', {
      course_id: course_id,
      url: url,
      token: token,
      comments: comments,
      header: title + " (" + season + "," + year + ")",
    });
  }

  toSaved() {
    const { url, token } = this.props;
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
          alert("added ");
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
            <Text style={{ fontSize: 11, color: "grey" }}>{this.props.season + ", " + this.props.year}</Text>
            <Paragraph style={{ marginTop: 15 }}>{this.props.description}</Paragraph>
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
