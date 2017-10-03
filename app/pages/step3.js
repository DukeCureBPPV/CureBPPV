import React from 'react';
import StepTemplate from './step-template';
import Quaternion from '../math/quaternion';

const TreatmentStepOne = ({ navigation }) => (
  <StepTemplate
    navigation={navigation}
    allowedDistance={0.04}
    totalTime={20}
    rotationLeft={new Quaternion(0.555, 0.086, -0.463, -0.686)}
    rotationRight={new Quaternion(0.259, 0.380, 0.706, 0.539)}
    nextPageName={'End'}
    stepNumberText={'step 3 / 3'}
    noticeSoundFile={'ten_seconds.mp3'}
  />
);

export default TreatmentStepOne;
