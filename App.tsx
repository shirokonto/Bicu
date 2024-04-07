import { StatusBar } from 'expo-status-bar';
import {Image, StyleSheet, Text, View} from 'react-native';

import ImageViewer from "./components/ImageViewer";
import Button from "./components/Button";

const PlaceholderImage = require('./assets/sample.png')

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer placeholderImageSource={PlaceholderImage} />
      </View>
      <View style={styles.footerContainer}>
        <Button label="Take a photo" />
        <Button label="Add new item" />
        <Button label="Search" />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    paddingTop: 60,
    flex: 1,
  },
  image: {
    width: 320,
    height: 440,
    borderRadius: 10,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  }
});
