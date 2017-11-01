import React from 'react';
import StepTemplate from './step-template';
import Quaternion from '../math/quaternion';

const INSTRUCTIONS_LEFT = 'Turn your head 90° to the right (do not raise it off of the pillow) and wait again for 30 seconds.';

const INSTRUCTIONS_RIGHT = 'Turn your head 90° to the left (do not raise it off of the pillow) and wait again for 30 seconds.';

const Step2 = () => (
  <StepTemplate
    instructionsLeft={INSTRUCTIONS_LEFT}
    instructionsRight={INSTRUCTIONS_RIGHT}
    rotationLeft={new Quaternion(0.730, 0.514, -0.166, -0.419)}
    rotationRight={new Quaternion(0.677, 0.639, 0.335, 0.149)}
    allowedDistance={0.04}
    noticeTime={20}
    totalTime={30}
    noticeSoundFile={'ten_seconds.mp3'}
    nextPageName={'Step3'}
    stepNumberText={'step 2 / 3'}
  />
);

export default Step2;
