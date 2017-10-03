import React from 'react';
import StepTemplate from './step-template';
import Quaternion from '../math/quaternion';

const INSTRUCTIONS_LEFT = 'Keep your nose pointing to the black nose. Rotate head and phone together so that your nose move towards the large hollow nose.\n\nNow turn your head 90 degrees right, so that it is facing 45 degrees right up';

const INSTRUCTIONS_RIGHT = 'Keep your nose pointing to the black nose. Rotate head and phone together so that your nose move towards the large hollow nose.\n\nNow turn your head 90 degrees left, so that it is facing 45 degress left up';

const Step2 = () => (
  <StepTemplate
    instructionsLeft={INSTRUCTIONS_LEFT}
    instructionsRight={INSTRUCTIONS_RIGHT}
    rotationLeft={new Quaternion(0.730, 0.514, -0.166, -0.419)}
    rotationRight={new Quaternion(0.677, 0.639, 0.335, 0.149)}
    allowedDistance={0.04}
    totalTime={20}
    noticeSoundFile={'ten_seconds.mp3'}
    nextPageName={'Step3'}
    stepNumberText={'step 2 / 3'}
  />
);

export default Step2;
