import React from 'react';
import StepTemplate from './step-template';
import Quaternion from '../math/quaternion';

const TreatmentStepOne = ({ navigation }) => (
  <StepTemplate
    navigation={navigation}
    allowedDistance={0.04}
    totalTime={20}
    rotationLeft={new Quaternion(0.730, 0.514, -0.166, -0.419)}
    rotationRight={new Quaternion(0.677, 0.639, 0.335, 0.149)}
    nextPageName={'Step3'}
    stepNumberText={'step 2 / 3'}
    noticeSoundFile={'ten_seconds.mp3'}
  />
);

export default TreatmentStepOne;
