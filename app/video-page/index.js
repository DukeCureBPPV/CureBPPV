import React from 'react';
import { StyleSheet, Button, View } from 'react-native';
import Video from 'react-native-video';
import { NavigationActions } from 'react-navigation';
import sampleVideo from '../../assets/video/sample.mp4';

const styles = StyleSheet.create({
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

class VideoPage extends React.Component {
  static navigationOptions = {
    title: 'Welcome',
    headerBackTitle: null,
    headerLeft: null,
  };

  resetNavigation = (targetRoute) => {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: targetRoute }),
      ],
    });
    this.props.navigation.dispatch(resetAction);
  };

  render() {
    return (
      <View>
        <Video
          source={sampleVideo}
          style={styles.video}
        />
        <View>
          <Button
            title="left"
            color="#2c4c91"
            onPress={() => {
              this.resetNavigation('TreatmentStepOne'); }}
          />
          <Button
            title="right"
            color="#2c4c91"
            onPress={() => {
              this.resetNavigation('TreatmentStepOne'); }}
          />
        </View>
      </View>
    );
  }
}

export default VideoPage;
