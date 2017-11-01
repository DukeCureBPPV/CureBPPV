import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Button, Text, View, Linking, AsyncStorage, AppState } from 'react-native';
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
    fontSize: 30,
    fontWeight: 'bold',
    paddingTop: 60,
    paddingBottom: 15,
  },
  description: {
    paddingLeft: 30,
    paddingRight: 30,
    textAlign: 'center',
    fontSize: 18,
  },
  sideChoicesBox: {
    paddingTop: 10,
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

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasSurvey: false,
    };
  }

  componentDidMount() {
    AsyncStorage.getItem('@CureBPPVf:finished')
      .then((value) => {
        if (value === 'true') {
          this.setState({ hasSurvey: true });
        }
      })
      .catch();
    AppState.addEventListener('change', (nextAppState) => {
      if (nextAppState === 'inactive' || nextAppState === 'background') {
        this.props.goTo('Home');
      }
    });
  }

  render() {
    const { setTreatmentSide, goTo } = this.props;
    return (
      <View style={styles.container} >
        <View style={styles.section}>
          <Text style={styles.title}>Cure BPPV</Text>
          <Text style={styles.description}>
            Once you are diagnosed with BPPV, this app will be an educational tool to aid you in at-home treatment.
          </Text>
        </View>

        <VideoPlayer
          source={sampleVideo}
          style={styles.videoPlayer}
        />

        <View style={styles.section}>
          <Text style={styles.description}>
            To begin, please select which ear is being treated:
          </Text>
          <View style={styles.sideChoicesBox}>
            <Button
              title="Left"
              onPress={() => {
                setTreatmentSide('left');
                goTo('Illustration');
              }}
            />
            <Button
              title="Right"
              onPress={() => {
                setTreatmentSide('right');
                goTo('Illustration');
              }}
            />
          </View>
        </View>
        <View style={styles.section}>
          {
            this.state.hasSurvey
              ? (
                <Button
                  title="Survey"
                  onPress={() => { Linking.openURL(SURVEY_URL); }}
                />
              )
              : null
          }
        </View>
      </View>
    );
  }
}

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
