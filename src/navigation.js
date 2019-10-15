import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import WebPageScreen from './WebPageScreen';

export function createNavigation(startUrl) {
  const Stack = createStackNavigator(
    {
      WebPage: {
        screen: WebPageScreen,
        params: {
          title: 'Hello',
        },
      },
      DeepWebPage: {
        screen: WebPageScreen,
      },
    },
    {
      initialRouteName: 'WebPage',
      initialRouteParams: {
        url: startUrl,
      },
    },
  );

  return createAppContainer(Stack);
}
