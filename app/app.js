// import React from 'react';
import {
  StyleSheet,
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import VideoPage from './video-page';
import * as TreatmentPages from './treatment-pages';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

const App = StackNavigator({
  Home: { screen: VideoPage },
  TreatmentStepOne: { screen: TreatmentPages.TreatmentStepOnePage },
  TreatmentStepTwo: { screen: TreatmentPages.TreatmentStepTwoPage },
  TreatmentStepThree: { screen: TreatmentPages.TreatmentStepThreePage },
  TreatmentEnd: { screen: TreatmentPages.TreatmentEndPage },
});

export default App;
