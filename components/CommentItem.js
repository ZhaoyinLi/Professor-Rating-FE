import * as React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text } from 'react-native';
import { Rating } from 'react-native-ratings';

export default class Comment extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View
        style={{
          shadowOffset: {
            // 设置阴影偏移量
            width: 0,
            height: 4,
          },
          shadowRadius: 4, // 设置阴影模糊半径
          shadowOpacity: 0.13, // 设置阴影的不透明度
          borderRadius: 4, // 设置圆角
          shadowColor: 'rgba(96,96,96,1)', // 设置阴影色
          height: 'auto',
          padding: 20,
          marginTop: 10,
          marginHorizontal: 8,
          backgroundColor: '#fff',
        }}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ fontWeight: 'bold', color: '#666' }}>
            {this.props.date}
          </Text>
          <View style={{ position: 'absolute', right: -5 }}>
            <Rating
              startingValue={this.props.rate}
              ratingCount={5}
              imageSize={18}
              readonly={true}
            />
          </View>
        </View>
        <Text style={{ color: '#666', marginTop: 12 }}>
          {this.props.comment}
        </Text>
      </View>
    );
  }
}
