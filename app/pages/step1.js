import React from 'react';
import StepTemplate from './step-template';
import Quaternion from '../math/quaternion';

const TreatmentStepOne = ({ navigation }) => (
  <StepTemplate
    navigation={navigation}
    allowedDistance={0.04}
    totalTime={20}
    rotationLeft={new Quaternion(0.614, 0.680, 0.360, 0.176)}
    rotationRight={new Quaternion(0.688, 0.611, -0.316, -0.231)}
    nextPageName={'Step2'}
    stepNumberText={'step 1 / 3'}
    noticeSoundFile={'ten_seconds.mp3'}
  />
);

export default TreatmentStepOne;
