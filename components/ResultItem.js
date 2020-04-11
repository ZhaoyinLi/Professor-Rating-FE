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
    //alert('result item has token: '+token);
    //alert('course_id: '+course_id);
    navigate('Comment', {
      course_id: course_id,
      url: url,
      token: token,
      comments: comments,
    });
    alert('id: '+course_id);
  }
  render() {
    let btn = [];
    return (
      <ScrollView>
        <Card style={styles.card}>
          <Card.Content>
            <Title>{this.props.title}</Title>
            <Avatar.Icon
              style={{ position: 'absolute', right: 12, top: 20 }}
              size={28}
              icon="heart"
            />
            <Paragraph>{this.props.description}</Paragraph>
          </Card.Content>
          <Card.Actions>
            <Button onPress={() => this.toComment()}>Detail</Button>
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
