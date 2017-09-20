import { StackNavigator } from 'react-navigation';
import VideoPage from './video-page';
import TreatmentStepOnePage from './treatment/treatment-step1-page';
import TreatmentStepTwoPage from './treatment/treatment-step2-page';
import TreatmentStepThreePage from './treatment/treatment-step3-page';
import TreatmentEndPage from './treatment/treatment-end-page';

const App = StackNavigator({
  Home: {
    screen: VideoPage,
  },
  TreatmentStepOne: {
    screen: TreatmentStepOnePage,
  },
  TreatmentStepTwo: {
    screen: TreatmentStepTwoPage,
  },
  TreatmentStepThree: {
    screen: TreatmentStepThreePage,
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
