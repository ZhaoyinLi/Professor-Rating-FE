import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static navigationOptions = {
    title: 'Login',
  };

  // react lifecycle
  // https://reactjs.org/docs/state-and-lifecycle.html
  componentDidMount() {
    // setup data
  }

  // 1. main function logic here:
  login() {
    // how to send request:
    fetch('url', {
      method: 'POST', // get or post
      // header params
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
        'x-access-token': 'token',
        Connection: 'keep-alive',
        'cache-control': 'no-cache',
      },
      body: JSON.stringify(
        // data send to server
        {
          username: 'blah blah',
          password: 'blah bah blah',
        }
      ),
    })
      .then(response => {
        // convert response to JSON
        return response.json();
      })
      .then(result => {
        // deal with result
      });

    // how to go to another page
    const { navigate } = this.props.navigation;
    navigate(
      // page name, names are all in APP.js
      'Search',
      // data pass to destination screen
      {
        data: 'blah blah blah....',
      }
    );
  }

  register() {
    alert('???');
  }

  render() {
    // 2. React Components here:
    // // https://callstack.github.io/react-native-paper/
    return (
      <View style={styles.container}>
        <View style={styles.input_container}>
          <TextInput style={styles.inputs} label="Username" />
          <TextInput style={styles.inputs} label="Password" />
        </View>
        <View style={styles.btn_container}>
          <Button
            mode="contained"
            style={styles.btn}
            onPress={() => {
              this.login();
            }}>
            Login
          </Button>
          <Button
            mode="contained"
            style={styles.btn}
            onPress={() => {
              this.register();
            }}>
            Register
          </Button>
        </View>
      </View>
    );
  }
}

// 3. CSS style here:
const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  input_container: {
    padding: 40,
    alignItems: 'center',
  },
  inputs: {
    margin: 8,
  },
  btn_container: {
    width: '100%',
    alignItems: 'center',
  },
  btn: {
    width: 120,
    margin: 5,
  },
});
