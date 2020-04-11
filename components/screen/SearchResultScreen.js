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
      token:'',
      id:'',
    };
  }

  static navigationOptions = {
    title: 'Search Result',
  };

  componentDidMount() {
    const { search, url, token, email, id} = this.props.navigation.state.params;
    //alert('id 30 : '+id);
    fetch(url + '/v1/terms/name/'+ search, {
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
            id: this.props.id,
          });
          //alert('id 52 : '+id);
        } 
        else {
          alert('Invalid Search');
        }
      })
      .catch(err => {
        alert(err);
      });
  }

  // componentDidMount() {
  //   const { search, url,token } = this.props.navigation.state.params;
  //   //alert('result-token: '+token);
  //   fetch(url + '/v1/terms/name/' + search, {
  //   //fetch(url + '/v1/courses/name/' + search, {
  //     method: '',
  //     mode: 'cors',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Accept: '*/*',
  //     },
  //   })
  //     .then(response => {
  //       return response.json();
  //     })
  //     .then(result => {
  //       if (result.message === 'success') {
  //         this.setState({
  //           courses: result.data,
  //           search: search,
  //           url: url,
  //           token:token,
  //         });
  //       } else {
  //         alert('Invalid Search');
  //       }
  //     })
  //     .catch(err => {
  //       alert(err);
  //     });
  // }

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
            token={this.state.token}
            comments = {item.comments}
          />
        )}
        keyExtractor={item => item.id}
      />
    );
  }
}

export default SearchResultScreen;