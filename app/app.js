import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import AppNavigator from './navigation/app-navigator';
import startRotationTracking from './start-rotation-tracking';

class App extends React.Component {
  componentDidMount() {
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
