import { StatusBar } from 'expo-status-bar';
import {ActionSheetIOS, Pressable, StyleSheet, TextInput, View} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import ImageViewer from "./components/ImageViewer";
import Button from "./components/Button";
import {useState} from "react";
import IconButton from "./components/IconButton";
import CircleButton from "./components/CircleButton";

const placeholderImage = require('./assets/sample.png')

const App = () => {

  const [selectedImg, setSelectedImage] = useState(null);
  const [showAppOptions, setShowAppOptions] = useState(false);

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
      setShowAppOptions(true);
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
      setSelectedImage(result.assets[0].uri);
      setShowAppOptions(true);
      console.log(result);
    } else {
      alert('No image selected.');
    }
  }

  const onReset = () => {
    setSelectedImage(null);
    //setShowAppOptions(false);
  };

  const onShowList = () => {
    alert('You pressed list button.')
  }

  const onAddItem = () => {
    // implement this later
    alert('You pressed plus button.')
  };

  const onSearch = async () => {
    alert('You pressed search button')
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <View style={styles.titleRow}>
          <TextInput style={styles.titleLabel}>RoomTitle</TextInput>
          <Button icon="refresh" label="Reset" onPress={onReset} />
        </View>
      </View>
      <View style={styles.imageContainer}>

        <Pressable onPress={openActionSheetAsync}>
          <ImageViewer
              placeholderImageSource={placeholderImage}
              selectedImage={selectedImg} />
        </Pressable>

      </View>
          <View style={styles.optionsContainer}>
            <View style={styles.optionsRow}>
              <IconButton icon="list" label="List" onPress={onShowList} />
              <CircleButton onPress={onAddItem} />
              <IconButton icon="search" label="Search" onPress={onSearch} />
            </View>
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
  titleContainer: {
    paddingTop: 50,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleLabel: {
    color: '#fff'
  },
  imageContainer: {
    paddingTop: 10,
    flex: 1,
  },

  footerContainer: {
    flexDirection: 'row',
    flex: 1 / 3,
    alignItems: 'center',
  },

  optionsContainer: {
    flex: 1,
    alignItems: 'center',
    position: 'absolute',
    bottom: 60,
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default App;
