import React from 'react';
import PropTypes from 'prop-types';
import {Platform} from 'react-native';
import {StackActions} from 'react-navigation';
import WebView from 'react-native-webview';

class WebViewWrapper extends React.Component {
  static propTypes = {
    onTitleParsed: PropTypes.func,
    url: PropTypes.string.isRequired,
    navigation: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.instId = ('' + Math.floor(Math.random() * 1000)).padStart(4, ' ');
  }

  state = {
    title: '',
  };

  webview = React.createRef();

  /**
   * @docs https://github.com/react-native-community/react-native-webview/blob/master/docs/Guide.md#controlling-navigation-state-changes
   * @param event
   * @returns {boolean}
   */
  handleWebViewNavigationStateChange = event => {
    const {url, loading} = event;

    if (!url) {
      return;
    }

    console.log(`${this.instId} * Nav event`, event);

    const thisPageUrl = this.props.url;

    if (url !== thisPageUrl) {
      console.log(`${this.instId}   - URL differs: New: ${url} !== Current: ${thisPageUrl}`);

      if ((Platform.OS === 'android' && loading) || Platform.OS === 'ios') {

        console.log(`${this.instId}   - stopLoading()`);
        this.webview.current.stopLoading();

        this.props.navigation.dispatch(
          StackActions.push({
            routeName: 'DeepWebPage',
            params: {
              url,
              //title: this.state.title,
            },
          }),
        );

      }
    }
  };

  gotTitle = false;

  handleLoadProgress = ({nativeEvent}) => {
    // This event gets hold of the page's title a lot sooner than onLoad, so we can use it to update the header bar quicker
    if (
      !this.gotTitle &&
      nativeEvent.title &&
      !nativeEvent.url.includes(nativeEvent.title) // On Android the title can come through as the page's URL minus the protocol, before we get the actual title
    ) {
      this.gotTitle = true;
      if (this.props.onTitleParsed) {
        this.props.onTitleParsed(nativeEvent.title);
      }
      this.setState({title: nativeEvent.title});
    }
  };

  render() {
    let webViewProps = {};

    if (Platform.OS === 'android') {
      webViewProps.onShouldStartLoadWithRequest = event => {
        console.log(`* onShouldStartLoadWithRequest`, event, this.props.url);
        if (event.url === this.props.url) {
          console.log(`   - return FALSE!`);
          return false;
        } else {
          console.log(`   - return TRUE!`);
          return true;
        }
      };
    }

    return (
      <WebView
        ref={this.webview}
        source={{uri: this.props.url}}
        applicationNameForUserAgent={'RNWebViewAndroidIssue/1.0'}
        onNavigationStateChange={this.handleWebViewNavigationStateChange}
        onLoadProgress={this.handleLoadProgress}
        style={{flex: 1}}
        {...webViewProps}
      />
    );
  }
}

export default WebViewWrapper;
