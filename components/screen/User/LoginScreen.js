import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'badger@wisc.edu',
      password: '123456',
      url: 'http://172.220.7.76:8080',
      token: '',
    };
  }

  static navigationOptions = {
    title: 'Login',
  };

  componentDidMount() {}

  login() {
    fetch(this.state.url + '/v1/auth/login', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Accept: '*/*',
      },
      body: JSON.stringify({
        email: this.state.email,
        passwd: this.state.password,
      }),
    })
      .then(response => {
        return response.json();
      })
      .then(result => {
        if (result.message === 'success') {
          const { navigate } = this.props.navigation;
          navigate('Search', {
            url: this.state.url,
            email: this.state.email,
            // and more infor.....
          });
        } else {
          alert('Invalid passwrod or username');
        }
      })
      .catch(err => {
        alert(err);
      });
  }

  register() {
    const { navigate } = this.props.navigation;
    navigate('SignUp', {
      url: this.state.url,
    });
  }

  render() {
    const { email, password } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.input_container}>
          <TextInput
            style={styles.inputs}
            label="Email"
            value={email}
            onChangeText={u => this.setState({ email: u })}
          />
          <TextInput
            style={styles.inputs}
            label="Password"
            value={password}
            onChangeText={p => this.setState({ password: p })}
            secureTextEntry={true}
          />
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

const styles = StyleSheet.create({
  input_container: {
    marginTop: '5%',
  },
  inputs: {
    width: '90%',
    marginLeft: '5%',
    marginTop: '3%',
  },
  btn_container: {
    marginTop: '5%',
  },
  btn: {
    marginTop: '3%',
    width: '80%',
    marginLeft: '10%',
  },
});
