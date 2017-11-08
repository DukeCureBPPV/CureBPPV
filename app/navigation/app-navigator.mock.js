import React from 'react';
import { StackNavigator, addNavigationHelpers } from 'react-navigation';
import { connect } from 'react-redux';

const Password = () => <div>Password</div>;
const Home = () => <div>Home</div>;
const Illustration = () => <div>Illustration</div>;
const Prepare = () => <div>Prepare</div>;
const Step1 = () => <div>Step1</div>;
const Step2 = () => <div>Step2</div>;
const Step3 = () => <div>Step3</div>;
const End = () => <div>End</div>;

export const Navigator = StackNavigator(
  {
    Password: { screen: Password },
    Home: { screen: Home },
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

