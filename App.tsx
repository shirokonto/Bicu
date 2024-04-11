import { StatusBar } from 'expo-status-bar';
import {ActionSheetIOS, StyleSheet, View} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import ImageViewer from "./components/ImageViewer";
import Button from "./components/Button";
import {useState} from "react";

const placeholderImage = require('./assets/sample.png')

const App = () => {

  const [selectedImg, setSelectedImage] = useState(null);

  const openActionSheetAsync = async() =>
      ActionSheetIOS.showActionSheetWithOptions(
          {
            options: ['Cancel', 'Camera', 'Gallery'],
            cancelButtonIndex: 0,
            userInterfaceStyle: 'dark',
          },
          buttonIndex => {
            if (buttonIndex === 0) {
              // cancel action
            } else if (buttonIndex === 1) {
              openCameraAsync();
            } else if (buttonIndex === 2) {
              pickImageAsync();
            }
          },
      );

  const pickImageAsync = async() => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      alert("Allow this app access to your photos");
      return;
    }

    let result : any = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1
    });

    if(!result.canceled) {
      setSelectedImage(result.assets[0].uri);
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

    let result : any = await ImagePicker.launchCameraAsync();

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri)
      console.log(result);
    } else {
      alert('No image selected.');
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer
            placeholderImageSource={placeholderImage}
            selectedImage={selectedImg} />
      </View>
      <View style={styles.footerContainer}>
        <Button label="Select image"  iconname={"camera"} onPress={openActionSheetAsync}/>
        <Button label="Add new item" iconname={"plus"} onPress={() => alert('You pressed search button.')}/>
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

export default App;
