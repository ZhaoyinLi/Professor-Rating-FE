import * as React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-paper';
import Comment from '../CommentItem.js';

class CommentScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      id: this.props.navigation.state.params.course_id,
      course_name: '',
    };
  }

  static navigationOptions = {
    title: 'Comments',
  };

  init(cid) {
    // const {
    //   url,
    //   course_id,
    // } = this.props.navigation.state.params;
    alert('Welcome to init(), used course_id:'+cid);
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
        //alert('GET after back to cmtscr: '+result.success);
        if (result.success == true) {
          //alert('back suc: '+result.success);
          //alert('back suc:'+JSON.stringify(result.data.comments[result.data.comments.length-1]));
          this.setState({ comments: result.data.comments });
        } else {
          alert('otherwise: '+result.sucess);
        }
      })
      .catch(err => {
        alert('err: '+err);
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
    alert('cmdscr-id: ' + course_id); // it's actually term_id
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
          // let terms = result.data;
          // let comments = [];
          // for (let i = 0; i < terms.length; i++) {
          //   for (let j = 0; j < terms[i].comments.length; j++) {
          //     comments.push(terms[i].comments[j]);
          //   }
          // }
          this.setState({ course_name: result.data.name }); // get name
          //alert('course_name: '+this.state.course_name);
          this.setState({ comments: result.data.comments });
        }
      })
      .catch(err => {
        alert(err);
      });
    //this.comments = comments;
    //alert(this.state.comments[0].content);
    // //alert('commentscr-token: '+token);
    // fetch(url + 'GET /v1/terms/courseId' + course_id, {
    // //fetch(url + '/v1/terms/courseId/' + course_id, { //changed to search by term
    //   method: 'GET',
    //   mode: 'cors',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Accept: '*/*',
    //   },
    // })
    //   .then(response => {
    //     return response.json();
    //   })
    //   .then(result => {
    //     if (result.success === true) {
    //       let terms = result.data;
    //       let comments = [];
    //       for (let i = 0; i < terms.length; i++) {
    //         for (let j = 0; j < terms[i].comments.length; j++) {
    //           comments.push(terms[i].comments[j]);
    //         }
    //       }
    //       this.setState({ comments: comments });
    //     }
    //   })
    //   .catch(err => {
    //     alert(err);
    //   });
  }

  jumpToRate = () => {
    // not sure about this function
    const { navigate } = this.props.navigation; //?
    //const { url, token, course_id} = this.props.navigation.state.params; // course_id=term_id?
    const { url, token, course_id } = this.props.navigation.state.params; // course_id=term_id?
    // TEST
    alert('cmtscr before navigate-course_name: '+this.state.course_name);
    //alert('going to rate page with token: '+token);
    navigate('Rate', {
      url: 'http://172.220.7.76:8080',
      token: token,
      //course_id: course_id,
      id: course_id,
      refresh: ()=>{this.init.bind(this)}, // this might not be the case
      course_name: this.state.course_name,
    });

    // if (this.state.search === '') {
    //   alert('Search is still empty');
    // } else {
    //   const { navigate } = this.props.navigation;
    //   const { url, email, token } = this.props.navigation.state.params;
    //   navigate('Result', {
    //     search: this.state.search,
    //     url: url,
    //     token: token,
    //     email: email,
    //   });
    // }
  };

  render() {
    return (
      <View style={{ height: '100%' }}>
        <FlatList
          data={this.props.navigation.state.params.comments}
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
          onPress={() => this.jumpToRate()}
          mode="contained">
          ADD COMMENT
        </Button>
      </View>
    );
  }
}

export default CommentScreen;
