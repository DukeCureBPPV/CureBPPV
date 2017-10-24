import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Button, Text, View, Linking } from 'react-native';
import * as navActions from '../navigation/actions';
import * as appActions from '../actions';
import VideoPlayer from './video-player';
import sampleVideo from '../../assets/video/sample.mp4';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  section: {
    paddingTop: 30,
    paddingBottom: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingTop: 80,
    paddingBottom: 15,
  },
  description: {
    paddingLeft: 30,
    paddingRight: 30,
    textAlign: 'center',
  },
  sideChoicesBox: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  videoPlayer: {
    width: 300,
    height: 230,
    justifyContent: 'center',
  },
});

const SURVEY_URL = 'https://redcap.duke.edu/redcap/surveys/?s=YDW8TRLKPJ';

const HomePage = ({ setTreatmentSide, goTo }) => (
  <View style={styles.container} >
    <View style={styles.section}>
      <Text style={styles.title}>Cure BPPV</Text>
      <Text style={styles.description}>
        Once you are diagnosed with BPPV,
        this app guides you with self-treatment.
      </Text>
    </View>

    <VideoPlayer
      source={sampleVideo}
      style={styles.videoPlayer}
    />

    <View style={styles.section}>
      <Text>Which side for treatment:</Text>
      <View style={styles.sideChoicesBox}>
        <Button
          title="left"
          onPress={() => {
            setTreatmentSide('left');
            goTo('Illustration');
          }}
        />
        <Button
          title="right"
          onPress={() => {
            setTreatmentSide('right');
            goTo('Illustration');
          }}
        />
      </View>
    </View>
    <View style={styles.section}>
      <Button
        title="Survey"
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
