import { NavigationActions } from 'react-navigation';
import { Navigator } from './app-navigator';
import * as actions from './actions';

const INIT_PATH = 'Home';

const initialState = Navigator.router.getStateForAction(
  Navigator.router.getActionForPathAndParams(INIT_PATH),
);

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.GO_TO:
      return Navigator.router.getStateForAction(
        NavigationActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({ routeName: action.destination }),
          ],
        }),
      );
    default:
      return state;
  }
};

export default reducer;
