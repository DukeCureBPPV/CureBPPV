import React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationActions } from 'react-navigation';

class TreatmentEndPage extends React.Component {
  static navigationOptions = {
    title: 'You\'ve finished!',
    headerBackTitle: null,
    headerLeft: null,
  };

  resetNavigation = (targetRoute) => {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: targetRoute }),
      ],
    });
    this.props.navigation.dispatch(resetAction);
  };

  render() {
    return (
      <View>
        <Button
          title="Go Back Home"
          color="#2c4c91"
          onPress={() => {
            this.resetNavigation('Home'); }}
        />
      </View>
    );
  }
}

export default TreatmentEndPage;
