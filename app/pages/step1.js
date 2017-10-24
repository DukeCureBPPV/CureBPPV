import React from 'react';
import StepTemplate from './step-template';
import Quaternion from '../math/quaternion';

const INSTRUCTIONS_LEFT = 'Keep your nose pointing to the black nose. Rotate head and phone together so that your nose move towards the large hollow nose.\n\nStart sitting on a bed and turn your head 45 degrees to the left.\n\nLie back quickly keeping your head turned until your shoulders are on the pillow. Your head is reclined onto the bed. Wait for 30 seconds.';

const INSTRUCTIONS_RIGHT = 'Keep your nose pointing to the black nose. Rotate head and phone together so that your nose move towards the large hollow nose.\n\nStart sitting on a bed and turn your head 45 degrees to the right.\n\nLie back quickly keeping your head turned until your shoulders are on the pillow. Your head is reclined onto the bed. Wait for 30 seconds.';

const Step1 = () => (
  <StepTemplate
    instructionsLeft={INSTRUCTIONS_LEFT}
    instructionsRight={INSTRUCTIONS_RIGHT}
    rotationLeft={new Quaternion(0.614, 0.680, 0.360, 0.176)}
    rotationRight={new Quaternion(0.688, 0.611, -0.316, -0.231)}
    allowedDistance={0.04}
    noticeTime={20}
    totalTime={30}
    noticeSoundFile={'ten_seconds.mp3'}
    nextPageName={'Step2'}
    stepNumberText={'step 1 / 3'}
  />
);

export default Step1;
