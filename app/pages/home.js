import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Button, Text, View, Linking } from 'react-native';
import Video from 'react-native-video';
import sampleVideo from '../../assets/video/sample.mp4';
import * as navActions from '../navigation/actions';
import * as appActions from '../actions';

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

const SURVEY_URL = 'https://redcap.duke.edu/redcap/surveys/?s=YDW8TRLKPJ';

const VideoPage = ({ setTreatmentSide, goTo }) => (

  <View style={styles.container} >
    <View style={{ width: 300, height: 200 }}>
      <Video style={styles.video} source={sampleVideo} />
    </View>
    <Text>Cure BPPV</Text>
    <Text>Which side for treatment:</Text>
    <View>
      <Button
        title="left"
        color="#2c4c91"
        onPress={() => {
          setTreatmentSide('left');
          goTo('Step1');
        }}
      />
      <Button
        title="right"
        color="#2c4c91"
        onPress={() => {
          setTreatmentSide('right');
          goTo('Step1');
        }}
      />
    </View>
    <View>
      <Button
        title="Survey"
        color="#2c4c91"
        onPress={() => { Linking.openURL(SURVEY_URL); }}
      />
    </View>
  </View>
);


const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  setTreatmentSide: (treatmentSide) => {
    dispatch(appActions.setTreatmentSide(treatmentSide));
  },
  goTo: (destination) => {
    dispatch(navActions.goTo(destination));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(VideoPage);
