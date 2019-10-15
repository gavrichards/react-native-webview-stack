import React from 'react';
import {View} from 'react-native';
import { createNavigation } from './navigation';

const App = () => {
  const url = 'https://edition.cnn.com/';

  const AppContainer = createNavigation(url);

  return (
    <View style={{flex: 1}}>
      <AppContainer />
    </View>
  );
};

export default App;
