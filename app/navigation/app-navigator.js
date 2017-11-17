import React from 'react';
import { StackNavigator, addNavigationHelpers } from 'react-navigation';
import { connect } from 'react-redux';
import Password from '../pages/password';
import Home from '../pages/home';
import Instructions from '../pages/instructions';
import Illustration from '../pages/illustration';
import Prepare from '../pages/prepare';
import Step1 from '../pages/step1';
import Step2 from '../pages/step2';
import Step3 from '../pages/step3';
import End from '../pages/end';

export const Navigator = StackNavigator(
  {
    Password: { screen: Password },
    Home: { screen: Home },
    Instructions: { screen: Instructions },
    Illustration: { screen: Illustration },
    Prepare: { screen: Prepare },
    Step1: { screen: Step1 },
    Step2: { screen: Step2 },
    Step3: { screen: Step3 },
    End: { screen: End },
  }, {
    headerMode: 'none',
    navigationOptions: {
      gesturesEnabled: false,
    },
  });

const AppNavigator = ({ dispatch, navState }) => (
  <Navigator navigation={addNavigationHelpers({ dispatch, state: navState })} />
);

const mapStateToProps = state => ({
  navState: state.nav,
});

// If mapDispatchToProps is not specificed, dispatch is passed as props.dispatch.
export default connect(mapStateToProps)(AppNavigator);

