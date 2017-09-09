import React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationActions } from 'react-navigation';

class TreatmentStepTwoPage extends React.Component {
  static navigationOptions = {
    title: 'Step Two',
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

  componentDidMount() {
    setTimeout(
      () => {
        this.resetNavigation('TreatmentStepThree'); },
      5000
    );
  }

  render() {
    return (
      <View>
        <Text>This is step two.</Text>
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

export default TreatmentStepTwoPage;
