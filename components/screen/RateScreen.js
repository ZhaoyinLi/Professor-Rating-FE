import * as React from 'react';
import { View, Text, TextInput } from 'react-native';
import { Button } from 'react-native-paper';
import { Rating } from 'react-native-ratings';

class RateScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // termId: props.course_id,
      termId: "",
      token: "",
      // term
      rating: 5,
      comment: '',
    };
    // this.handleChangeText = this.handleChangeText.bind(this);
  }

  static navigationOptions = {
    title: 'Rate',
  };

  // ratingCompleted(rating) { //根本不需要这个傻逼方法我操他妈的，写教程的人就是肌把儿有病肏
  //   alert('ratingCompleted: '+rating); //works
  //   this.setState({ rating: rating }); //?
  // }

  onContentSizeChange(event) {
    this.setState({ height: event.nativeEvent.contentSize.height });
  }

  // handleChangeText(newText) {
  //   this.setState({ comment: newText });
  // }

  postComment() {
    const { navigate } = this.props.navigation;
    // const { url, token, course_id } = this.props.navigation.state.params;
    const { url, token, id } = this.props.navigation.state.params;
    //alert('postCmt: '+this.props.course_name);
    //alert('at rate page received token: '+token);
    // send POST request
    console.log('In postComment:');
    console.log(this.state);
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
        if(result.success === true){
          
          //alert('ciao: ' + JSON.stringify(result));
          
          // this.props.navigation.state.params.refresh(id);
          // alert('going back to comment scr'); // didn't appear
          // this.props.navigation.goBack();
          this.props.navigation.state.params.onNavigateBack(id); 
          this.props.navigation.goBack();
        } else {
          alert('commentPOST failed, result.sucess: '+result.success);
        }
      })
      .catch(err => {
        alert(err);
      });
    // jump to term page

    // navigate('Comment', {
    //   url: url,
    //   token: token,
    //   // course_id: course_id,
    //   course_id: id,
    // });
  }

  render() {
    const { course_name } = this.props.navigation.state.params;
    // alert('rtscr-course_name: '+course_name);
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
      <Text style={{ fontWeight: 'bold', color: '#666' }}>{ course_name }</Text>
          <View style={{ position: 'absolute', right: -5 }}>
            <Rating
              ratingCount={5}
              startingValue={5}
              imageSize={18}
              readyOnly={false}
              onFinishRating={rate => this.setState({rating: rate})}
            />
          </View>
        </View>
        <View style={{ 
          // alignItems: 'center',
          //
          borderRadius: 4,
          backgroundColor: '#fafafa',
          // borderWidth: '1', // this caused Android crashes
          // borderColor: '#777',
          padding: 10,
          marginTop: 15,
          marginBottom: 10,
          width: '100%',
          // height: Math.max(40, this.state.height),
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
