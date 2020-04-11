import * as React from 'react';
import { IconButton } from 'react-native-paper';
import { View, StyleSheet, FlatList, ActivityIndicator, } from 'react-native';
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
      visible: true,
    };
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Search Result',
      headerRight: () =>
        <IconButton
          icon="account"
          color="black"
          size={35}
          onPress={() => {
            const { url, email } = navigation.state.params;
            navigation.navigate('Saved', {
              url: url,
              email: email,
            });
          }}
        />,
    };
  }

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
            visible: false,
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

  render() {
    return (
      <View>
        {this.state.visible && <ActivityIndicator style={{
          position: "absolute",
          marginTop: "40%",
          alignSelf: "center"
        }} size={60} color="#0000ff" />}
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

});

export default SearchResultScreen;