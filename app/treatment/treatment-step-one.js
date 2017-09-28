import React from 'react';
import StepTemplate from './step-template';
import Quaternion from './quaternion';

const TreatmentStepOne = ({ navigation }) => (
  <StepTemplate
    navigation={navigation}
    allowedDistance={0.04}
    totalTime={20}
    targetQuaternion={new Quaternion(0.671, -0.201, -0.684, -0.201)}
    nextPageName={'TreatmentStepTwo'}
    stepNumberText={'step 1 / 3'}
  />
);

export default TreatmentStepOne;
