import { fromJS } from 'immutable';
import * as actions from './actions';

const initialState = fromJS({
  treatmentSide: null,
  initQuaternion: null,
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SET_TREATMENT_SIDE:
      return state.set('treatmentSide', action.treatmentSide);
    case actions.SET_INIT_QUATERNION:
      return state.set('initQuaternion', action.quaternion);
    default:
      return state;
  }
};

export default reducer;
