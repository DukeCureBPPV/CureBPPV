import React from 'react';
import StepTemplate from './step-template';
import Quaternion from './quaternion';

const TreatmentStepOne = ({ navigation }) => (
  <StepTemplate
    navigation={navigation}
    allowedDistance={0.1}
    totalTime={20}
    targetQuaternion={new Quaternion(0.361, 0.072, -0.031, -0.929)}
    nextPageName={'TreatmentStepThree'}
    stepNumberText={'step 1 / 3'}
  />
);

export default TreatmentStepOne;
