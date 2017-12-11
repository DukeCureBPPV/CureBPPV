import React from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, FlatList } from 'react-native';
import * as navActions from '../navigation/actions';
import ListItem from './list-item';
import Screenshot from '../../assets/images/step-screenshot.png';

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    paddingBottom: 30,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  list: {
    marginTop: 5,
  },
});

class Instructions extends React.Component {
  constructor(props) {
    super(props);

    this.instructionList = [
      {
        type: 'text',
        data: 'This app will help you move your head into the correct positions for the treatment maneuver.',
      },
      {
        type: 'text',
        data: 'You will see graphics like this:',
      },
      {
        type: 'image',
        data: Screenshot,
      },
      {
        type: 'text',
        data: 'To do this, keep your nose pointing to the black nose on the screen. ALWAYS rotate your head and phone together.',
      },
      {
        type: 'text',
        data: 'Instructions are provided for each step. Read or listen to each step prior to moving your head.',
      },
      {
        type: 'text',
        data: 'When your head is in the correct location the white nose and black nose will be on top of each other and the timer will begin. Once you are in the correct position, you will stay for 30 seconds before moving to the next step.  The app will tell you when to move to the next step.',
      },
      {
        type: 'text',
        data: 'If your head is not in the correct location, move your head and phone so that the white and black nose are lined up. The timer will not start until you are in the correct position.',
      },
      {
        type: 'button',
        data: 'Next',
        onPress: () => this.props.goTo('Illustration'),
      },
      {
        type: 'button',
        data: 'Go Back Home',
        onPress: () => this.props.goTo('Home'),
      },
    ];

    this.state = {
      instructions:
        [
          {
            index: 0,
            ...this.instructionList[0],
          },
        ],
    };
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      if (this.state.instructions.length < this.instructionList.length) {
        this.setState({
          instructions: [...this.state.instructions,
            {
              index: this.state.instructions.length,
              ...this.instructionList[this.state.instructions.length],
            },
          ],
        });
      }
    }, 1000);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          style={styles.list}
          data={this.state.instructions}
          renderItem={({ item }) => <ListItem item={item} />}
          keyExtractor={item => item.index}
          directionalLockEnabled
          showHorizontalScrollIndicator={false}
        />
      </View>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  goTo: (destination) => {
    dispatch(navActions.goTo(destination));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Instructions);
