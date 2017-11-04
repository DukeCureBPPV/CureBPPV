/* eslint global-require: 0, import/first: 0 */
jest.mock('./app-navigator.js', () => require('./app-navigator.mock'));

import { Navigator } from './app-navigator.mock';
import * as actions from './actions';
import reducer from './reducer';

function NavigationStateEquals(received, expected) {
  expect(received.index).toEqual(expected.index);
  expect(received.routes.map(route => route.routeName)).toEqual(
    expected.routes.map(route => route.routeName),
  );
}

describe('navigation reducer', () => {
  it('should return the initial state', () => {
    const received = reducer(undefined, {});
    const expected = Navigator.router.getStateForAction(
      Navigator.router.getActionForPathAndParams('Home'),
    );
    NavigationStateEquals(received, expected);
  });

  it('should handle GO_TO next', () => {
    const received = reducer(
      Navigator.router.getStateForAction(
        Navigator.router.getActionForPathAndParams('Home'),
        null,
      ),
      {
        type: actions.GO_TO,
        destination: 'Illustration',
      },
    );
    const expected = Navigator.router.getStateForAction(
      Navigator.router.getActionForPathAndParams('Illustration'),
    );
    NavigationStateEquals(received, expected);
  });

  it('should handle GO_TO back', () => {
    const received = reducer(
      Navigator.router.getStateForAction(
        Navigator.router.getActionForPathAndParams('Step2'),
        null,
      ),
      {
        type: actions.GO_TO,
        destination: 'Home',
      },
    );
    const expected = Navigator.router.getStateForAction(
      Navigator.router.getActionForPathAndParams('Home'),
    );
    NavigationStateEquals(received, expected);
  });
});
