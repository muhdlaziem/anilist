// /* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {Modal, ActivityIndicator, View} from 'react-native';
import {StyleService, useStyleSheet} from '@ui-kitten/components';

const Loading = (props) => {
  const styles = useStyleSheet(themedStyles);

  return (
    <Modal animationType="slide" transparent visible={props.load}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      </View>
    </Modal>
  );
};

const themedStyles = StyleService.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 100,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
export default Loading;
