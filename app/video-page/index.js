import React from 'react';
import { StyleSheet, Button, Text, View } from 'react-native';
import Video from 'react-native-video';
import { NavigationActions } from 'react-navigation';
import sampleVideo from '../../assets/video/sample.mp4';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

class VideoPage extends React.Component {
  resetNavigation(targetRoute) {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: targetRoute }),
      ],
    });
    this.props.navigation.dispatch(resetAction);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ width: 300, height: 200 }}>
          <Video
            source={sampleVideo}
            style={styles.video}
          />
        </View>
        <Text>
          Cure BPPV
        </Text>
        <Text>
          Which side for treatment:
        </Text>
        <View>
          <Button
            title="left"
            color="#2c4c91"
            onPress={() => { this.resetNavigation('TreatmentStepOne'); }}
          />
          <Button
            title="right"
            color="#2c4c91"
            onPress={() => { this.resetNavigation('TreatmentStepOne'); }}
          />
        </View>
      </View>
    );
  }
}

export default VideoPage;
