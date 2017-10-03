import { NativeModules, NativeEventEmitter } from 'react-native';
import Quaternion from './math/quaternion';
import store from './store';
import * as appActions from './actions';

function startRotationTracking() {
  const { DeviceMotion } = NativeModules;
  const emitter = new NativeEventEmitter(DeviceMotion);
  emitter.addListener(
    'Rotation',
    ({ w, x, y, z, timestamp }) => {
      const quaternion = new Quaternion(w, x, y, z);
      store.dispatch(appActions.setQuaternion(
        quaternion, timestamp,
      ));
    },
  );
  DeviceMotion.startUpdates();
}

export default startRotationTracking;
