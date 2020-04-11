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
      token: '',
      email: '',
      id: '',
    };
  }

  static navigationOptions = {
    title: 'Search Result',
  };



  componentDidMount() {
    const { search, url, token, email, id } = this.props.navigation.state.params;
    fetch(url + '/v1/terms/name/' + search, {
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
        if (result.message === 'success') {
          this.setState({
            courses: result.data,
            search: search,
            url: url,
            token: token,
            email: email,
            id: result.data.id,
          });
        }
        else {
          alert('Invalid Search');
        }
      })
      .catch(err => {
        alert(err);
      });

  }

  saved() {
    const { navigate, token, id } = this.props.navigation;
    navigate('Saved', {
      url: this.state.url,
      courses: this.state.courses,
      search: this.state.search,
      token: this.state.token,
      email: this.state.email,
      id: this.state.id,
    });
  }

  render() {
    return (
      <View>
        <Button
          mode="contained"
          style={styles.btn}
          onPress={() => {
            this.saved();
          }}>
          Saved Page
          </Button>
        <FlatList
          data={this.state.courses}
          renderItem={({ item }) => (
            <ResultItem
              title={item.name}
              course_id={item.id}
              description={item.description}
              navigate={this.props.navigation.navigate}
              token={this.state.token}
              url={this.state.url}
              email={this.state.email}
              id={this.state.id}
            />
          )}
          keyExtractor={item => item.id}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  btn: {
    width: 130,
    marginTop: '3%',
    left: 220,
  },
});

export default SearchResultScreen;