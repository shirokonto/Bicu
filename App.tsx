import { StatusBar } from 'expo-status-bar';
import {StyleSheet, View} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import ImageViewer from "./components/ImageViewer";
import Button from "./components/Button";

const PlaceholderImage = require('./assets/sample.png')

export default function App() {
  const pickImageAsync = async() => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      alert("Allow this app access to your photos");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1
    });

    if(!result.canceled) {
      console.log(result);
    } else {
      alert('No image selected.');
    }
  }

  const openCameraAsync = async() => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (!permissionResult.granted) {
      alert("Allow this app access to your camera");
      return;
    }

    let result = await ImagePicker.launchCameraAsync();

    if (!result.canceled) {
      console.log(result);
    } else {
      alert('No image selected.');
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer placeholderImageSource={PlaceholderImage} />
      </View>
      <View style={styles.footerContainer}>
        <Button label="Take a photo"  iconname={"camera"} onPress={pickImageAsync}/>
        <Button label="Add new item" iconname={"plus"} onPress={openCameraAsync}/>
        <Button label="Search" iconname={"search"} onPress={() => alert('You pressed search button.')}/>
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

  footerContainer: {
    flexDirection: 'row',
    flex: 1 / 3,
    alignItems: 'center',
  }
});
