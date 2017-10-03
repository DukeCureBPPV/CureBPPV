import React from 'react';
import StepTemplate from './step-template';
import Quaternion from '../math/quaternion';

const TreatmentStepOne = ({ navigation }) => (
  <StepTemplate
    navigation={navigation}
    allowedDistance={0.04}
    totalTime={20}
    rotationLeft={new Quaternion(0.361, 0.072, -0.031, -0.929)}
    rotationRight={new Quaternion(-0.361, 0.072, 0.031, -0.929)}
    nextPageName={'Step3'}
    stepNumberText={'step 2 / 3'}
    noticeSoundFile={'ten_seconds.mp3'}
  />
);

export default TreatmentStepOne;
