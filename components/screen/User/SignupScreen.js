import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { Button, TextInput } from 'react-native-paper';

class SignupScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
    };
  }

  static navigationOptions = {
    title: 'Register',
  };

  handleEmail = text => {
    this.setState({ email: text });
  };
  handlePassword = text => {
    this.setState({ password: text });
  };
  handleConfirmPassword = text => {
    this.setState({ confirmPassword: text });
  };

  addUser = () => {
    const url = this.props.navigation.state.params.url;
    const { email, password, confirmPassword } = this.state;
    if (
      !email ||
      !password ||
      !confirmPassword ||
      password !== confirmPassword
    ) {
      alert('Error');
    } else {
      const { navigate } = this.props.navigation;
      fetch(url + '/v1/users', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          passwd: password,
        }),
      })
        .then(response => {
          return response.json();
        })
        .then(result => {
          if (result.message === 'success') {
            alert('You got it!!');
            const { navigate } = this.props.navigation;
            navigate('Login');
          } else {
            alert('User exists, please try again!!!');
          }
        })
        .catch(err => {
          alert(err);
        });
    }
  };

  render() {
    return (
      <View>
        <TextInput
          label="Email"
          onChangeText={text => this.handleEmail(text)}
          style={styles.input}
        />
        <TextInput
          label="Password"
          onChangeText={text => this.handlePassword(text)}
          style={styles.input}
          secureTextEntry={true}
        />
        <TextInput
          label="Confirm Password"
          onChangeText={text => this.handleConfirmPassword(text)}
          style={styles.input}
          secureTextEntry={true}
        />

        <Button
          style={styles.btn}
          onPress={() => this.addUser()}
          mode="contained">
          REGISTER
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    marginLeft: '5%',
    marginTop: '3%',
    width: '90%',
  },
  btn: {
    width: '90%',
    margin: '5%',
  },
});

export default SignupScreen;
