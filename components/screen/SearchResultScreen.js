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
import ResultItem from '../ResultItem.js';

class SearchResultScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      courses: '',
      search: '',
    };
  }

  static navigationOptions = {
    title: 'Search Result',
  };

  componentDidMount() {
    const { search, url } = this.props.navigation.state.params;
    fetch(url + '/v1/courses/name/' + search, {
      method: '',
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
        if (result.message === 'success') {
          this.setState({
            courses: result.data,
            search: search,
            url: url,
          });
        } else {
          alert('Invalid Search');
        }
      })
      .catch(err => {
        alert(err);
      });
  }

  render() {
    return (
      <FlatList
        data={this.state.courses}
        renderItem={({ item }) => (
          <ResultItem
            title={item.name}
            course_id={item.id}
            description={item.description}
            navigate={this.props.navigation.navigate}
            url={this.state.url}
          />
        )}
        keyExtractor={item => item.id}
      />
    );
  }
}

export default SearchResultScreen;