import * as React from 'react';
import { View, Text, TextInput } from 'react-native';
import { Button } from 'react-native-paper';
import { Rating } from 'react-native-ratings';

class RateScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      termId: "",
      token: "",
      rating: 5,
      comment: '',
    };
  }

  static navigationOptions = {
    title: 'Rate',
  };

  onContentSizeChange(event) {
    this.setState({ height: event.nativeEvent.contentSize.height });
  }

  postComment() {
    const { token, id } = this.props.navigation.state.params;
    fetch('http://172.220.7.76:8080' + '/v1/comments/', {
      method: 'POST',
      headers: {
        token: token,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        termId: id,
        rating: this.state.rating,
        content: this.state.comment,
      }),
    })
      .then(response => {
        return response.json();
      })
      .then(result => {
        if (result.success === true) {
          this.props.navigation.state.params.onNavigateBack(id);
          this.props.navigation.goBack();
        } else {
          alert('commentPOST failed, result.sucess: ' + result.success);
        }
      })
      .catch(err => {
        alert(err);
      });
  }

  render() {
    const { course_name } = this.props.navigation.state.params;
    return (
      <View
        style={{
          height: '100%',
          alignItems: 'center',
        }}>
        <View
          style={{
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowRadius: 4,
            shadowOpacity: 0.13,
            borderRadius: 4,
            shadowColor: 'rgba(96,96,96,1)',
            width: '95%',
            height: 'auto',
            padding: 16,
            marginTop: 10,
            marginHorizontal: 8,
            backgroundColor: '#fff',
          }}>
          <View style={{ flexDirection: 'row', marginHorizontal: 10 }}>
            <Text style={{ fontWeight: 'bold', color: '#666' }}>{course_name}</Text>
            <View style={{ position: 'absolute', right: -5 }}>
              <Rating
                ratingCount={5}
                startingValue={5}
                imageSize={18}
                readyOnly={false}
                onFinishRating={rate => this.setState({ rating: rate })}
              />
            </View>
          </View>
          <View style={{
            borderRadius: 4,
            backgroundColor: '#fafafa',
            padding: 10,
            marginTop: 15,
            marginBottom: 10,
            width: '100%',
          }}>
            <TextInput
              placeholder="Type here"
              multiline={true}
              onChangeText={text => this.setState({ comment: text })}
              onContentSizeChange={this.onContentSizeChange.bind(this)}
            />
          </View>
        </View>
        <Button
          style={{
            width: '95%',
            marginVertical: 13,
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowRadius: 4,
            shadowOpacity: 0.13,
            borderRadius: 4,
            shadowColor: 'rgba(96,96,96,1)',
            padding: 2,
          }}
          onPress={() => this.postComment()}
          mode="contained">
          SUBMIT
      </Button>
      </View>
    );
  }
}

export default RateScreen;