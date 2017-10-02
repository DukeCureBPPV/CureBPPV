import { fromJS } from 'immutable';
import * as actions from './actions';


const initialState = fromJS({
  treatmentSide: null,
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SET_TREATMENT_SIDE:
      return state.set('treatmentSide', action.treatmentSide);
    default:
      return state;
  }
};

export default reducer;
