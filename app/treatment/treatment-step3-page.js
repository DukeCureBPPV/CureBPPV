import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { NavigationActions } from 'react-navigation';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});

class TreatmentStepThreePage extends React.Component {
  resetNavigation(targetRoute) {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: targetRoute }),
      ],
    });
    this.props.navigation.dispatch(resetAction);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>This is step three.</Text>
        <Button
          title="Go Back Home"
          color="#2c4c91"
          onPress={() => { this.resetNavigation('Home'); }}
        />
      </View>
    );
  }
}

export default TreatmentStepThreePage;
