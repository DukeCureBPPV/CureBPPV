import React from 'react';
import StepTemplate from './step-template';
import Quaternion from '../math/quaternion';

const INSTRUCTIONS_LEFT = 'Keep your nose pointing to the black nose. Rotate head and phone together so that your nose move towards the large hollow nose.\n\nNow turn your head right for another 90 degrees, and turn your body along, so that you are facing 45 degrees right down';

const INSTRUCTIONS_RIGHT = 'Keep your nose pointing to the black nose. Rotate head and phone together so that your nose move towards the large hollow nose.\n\nNow turn your head left for another 90 degrees, and turn your body along, so that you are facing 45 degress left down';

const Step3 = () => (
  <StepTemplate
    instructionsLeft={INSTRUCTIONS_LEFT}
    instructionsRight={INSTRUCTIONS_RIGHT}
    rotationLeft={new Quaternion(0.555, 0.086, -0.463, -0.686)}
    rotationRight={new Quaternion(0.259, 0.380, 0.706, 0.539)}
    allowedDistance={0.04}
    totalTime={20}
    noticeSoundFile={'ten_seconds.mp3'}
    nextPageName={'End'}
    stepNumberText={'step 3 / 3'}
  />
);

export default Step3;
