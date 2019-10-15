import React from 'react';
import WebViewWrapper from './WebViewWrapper';

class WebPageScreen extends React.Component {
  static navigationOptions = ({navigation, navigationOptions, screenProps}) => {
    return {
      title: navigation.state.params.title, // Use the title passed through from either the StackNavigator config, or the parent. Will be overwritten once pages loads.
    };
  };

  render() {
    return (
      <WebViewWrapper
        onTitleParsed={title => this.props.navigation.setParams({title})}
        url={this.props.navigation.getParam('url')}
        navigation={this.props.navigation}
      />
    );
  }
}

export default WebPageScreen;
