import { fromJS } from 'immutable';
import * as actions from './actions';

const initialState = fromJS({
  treatmentSide: null,
  quaternion: null,
  timestamp: null,
  initQuaternion: null,
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SET_TREATMENT_SIDE:
      return state.set('treatmentSide', action.treatmentSide);
    case actions.SET_QUATERNION:
      return state
        .set('quaternion', action.quaternion)
        .set('timestamp', action.timestamp);
    case actions.MARK_INIT_QUATERNION:
      return state.set('initQuaternion', state.get('quaternion'));
    default:
      return state;
  }
};

export default reducer;
