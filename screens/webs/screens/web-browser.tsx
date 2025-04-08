import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { WebView } from 'react-native-webview';

export default class WebBrowser extends Component {
  constructor(props) {
  super(props);
  
  this.state = {
    url: 'https://www.reactnative.dev',
  };
  }
  
  handleNavigationStateChange = navState => {
  console.info(navState);
  };
  
  render() {
  // this javascript will be injected on page load 
  
  return (
    <WebView
      source={{ uri: 'https://www.reactnative.dev' }}
      bounces={true}
      style={[
        {
          flex: 1
        },
      ]} 
      startInLoadingState
      scalesPageToFit
      javaScriptEnabledAndroid={true}
      javaScriptEnabled={true}
      onNavigationStateChange={this.handleNavigationStateChange}
      onMessage={event => {
        alert('MESSAGE >>>>' + event.nativeEvent.data);
      }}
      onLoadStart={() => {
        alert("LOAD START ");
      }}
      onLoadEnd={() => {
        alert('LOAD END');
      }}
      onError={err => {
        alert('ERROR ');
        alert(err);
        return (
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text>Internet Lost</Text>
          </View>
        );
      }}
    />
  );
  }
  }