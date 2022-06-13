import React from 'react';
import { View, StyleSheet, Modal, ActivityIndicator } from 'react-native';
// import AppText from '../components/AppText';
// import * as Progress from 'react-native-progress';
import LottieView from 'lottie-react-native';

function UploadScreen({ visible = false, onDone }) {
  // console.log('hi view?');
  return (
    <Modal visible={visible}>
      <View style={styles.container}>
        {visible ? (
          <ActivityIndicator
            animating={visible}
            size='large'
            style={{ marginTop: 50 }}
          />
        ) : (
          <LottieView
            autoPlay
            loop={false}
            onAnimationFinish={onDone}
            source={require('../assets/animations/done.json')}
            style={styles.animation}
          />
        )}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', justifyContent: 'center', flex: 1 },
  animation: {
    width: 150,
  },
});
export default UploadScreen;
