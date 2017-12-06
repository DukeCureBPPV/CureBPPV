import React from 'react';
import { Provider } from 'react-redux';
import KeepAwake from 'react-native-keep-awake';
import store from './store';
import AppNavigator from './navigation/app-navigator';
import startRotationTracking from './start-rotation-tracking';

class App extends React.Component {
  componentDidMount() {
    KeepAwake.activate();
    startRotationTracking();
  }

  render() {
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    );
  }
}

export default App;
