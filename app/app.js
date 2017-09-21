import { StackNavigator } from 'react-navigation';
import VideoPage from './video-page';
import TreatmentStepOne from './treatment/treatment-step-one';
import TreatmentStepTwo from './treatment/treatment-step-two';
import TreatmentStepThree from './treatment/treatment-step-three';
import TreatmentEndPage from './treatment/treatment-end-page';

const App = StackNavigator({
  Home: {
    screen: VideoPage,
  },
  TreatmentStepOne: {
    screen: TreatmentStepOne,
  },
  TreatmentStepTwo: {
    screen: TreatmentStepTwo,
  },
  TreatmentStepThree: {
    screen: TreatmentStepThree,
  },
  TreatmentEnd: {
    screen: TreatmentEndPage,
  },
}, {
  headerMode: 'none',
  initialRouteName: 'Home',
  navigationOptions: {
    gesturesEnabled: false,
  },
});

export default App;
