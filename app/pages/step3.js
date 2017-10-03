import React from 'react';
import StepTemplate from './step-template';
import Quaternion from '../math/quaternion';

const TreatmentStepOne = ({ navigation }) => (
  <StepTemplate
    navigation={navigation}
    allowedDistance={0.04}
    totalTime={20}
    rotationLeft={new Quaternion(0.671, 0.201, -0.684, 0.201)}
    rotationRight={new Quaternion(-0.671, 0.201, 0.684, 0.201)}
    nextPageName={'End'}
    stepNumberText={'step 3 / 3'}
    noticeSoundFile={'ten_seconds.mp3'}
  />
);

export default TreatmentStepOne;
