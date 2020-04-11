import * as React from 'react';
import { View, FlatList, Text } from 'react-native';
import { Button, ActivityIndicator } from 'react-native-paper';
import Comment from '../CommentItem.js';

class CommentScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      id: '',
      course_name: '',
      visible: true,
    };
  }

  static navigationOptions = {
    title: 'Comments',
  };

  init(cid) {
    fetch('http://172.220.7.76:8080' + '/v1/terms/' + cid, {
      //refresh the comments?
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
        // alert('GET after back to cmtscr: '+result.success);
        if (result.success == true) {
          //alert('back suc: '+result.success);
          //alert('back suc:'+JSON.stringify(result.data.comments[result.data.comments.length-1]));
          this.setState({ visible: false, comments: result.data.comments });
          // alert('comments: '+JSON.stringify(this.state.comments));
        } else {
          alert('otherwise: ' + result.sucess);
        }
      })
      .catch(err => {
        alert('err: ' + err);
      });
  }

  componentDidMount() {
    //const { url, course_id, token, comments } = this.props.navigation.state.params;
    const {
      url,
      course_id,
      token,
      comments,
    } = this.props.navigation.state.params;
    // alert('cmdscr-id: ' + course_id); // it's actually term_id
    fetch(url + '/v1/terms/' + course_id, {
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
        if (result.success === true) {
          this.setState({
            course_name: result.data.name,
            comments: result.data.comments,
            visible: false,
          }); // get name
        }
      })
      .catch(err => {
        alert(err);
      });
  }

  jumpToRate = () => {
    const { navigate } = this.props.navigation; //?
    const { url, token, course_id } = this.props.navigation.state.params; // course_id=term_id?
    navigate('Rate', {
      url: 'http://172.220.7.76:8080',
      token: token,
      //course_id: course_id,
      id: course_id,
      refresh: () => { this.init.bind(this) }, // this might not be the case
      course_name: this.state.course_name,
    });
  };

  render() {
    const { url, token, course_id } = this.props.navigation.state.params; // course_id=term_id?
    return (
      <View style={{ height: '100%' }}>
        {this.state.visible && <ActivityIndicator style={{
          position: "absolute",
          marginTop: "40%",
          alignSelf: "center"
        }} size={60} color="#0000ff" />}
        <FlatList
          contentContainerStyle={{ paddingBottom: '18%' }}
          data={this.state.comments}
          renderItem={({ item }) => (
            <Comment
              date={item.lastModifiedDate}
              comment={item.content}
              rate={item.rating}
            />
          )}
          keyExtractor={item => item.id}
        />
        <Button
          style={{
            width: '80%',
            position: 'absolute',
            bottom: '3%',
            left: '10%',
          }}
          onPress={() => this.props.navigation.navigate('Rate', {
            onNavigateBack: this.init.bind(this),
            url: 'http://172.220.7.76:8080',
            token: token,
            id: course_id,
            course_name: this.state.course_name,
          })}
          // onPress={() => this.jumpToRate()}
          mode="contained">
          ADD COMMENT
        </Button>
      </View>
    );
  }
}

export default CommentScreen;
