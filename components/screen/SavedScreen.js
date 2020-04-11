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
import ResultItem from '../ResultSaved.js';


class SavedScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      courses: '',
      search: '',
      terms: [],
      fav:[],
    };
  }

  static navigationOptions = {
    title: 'Saved Courses',
  };



 componentDidMount() {
    const { url, course_id,token,email, id } = this.props.navigation.state.params;
    fetch(url + '/v1/users/email/'+email, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Accept: '*/*'
      },
    })
      .then(response => {
        return response.json();
      })
      .then(result => {
        if (result.success === true) {
          // let terms = result.data;
          let terms =result.data.favorite; 
          this.setState({ terms: terms });

        }
      })
      .catch(err => {
        alert(err);
      });
  }



  render() {
    return (
      <View>
      <FlatList
        data={this.state.terms}
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




export default SavedScreen;