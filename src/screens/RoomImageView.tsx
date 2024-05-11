import React, {useState} from "react";
import {ActionSheetIOS, ImageSourcePropType, Pressable, StyleSheet, TouchableOpacity, View} from "react-native";
import * as ImagePicker from "expo-image-picker";
import EditableTitle from "../components/EditableTitle";
import ImageViewer from "../components/ImageViewer";
import Marker from "../components/Marker";
import LabeledIconButton from "../components/buttons/LabeledIconButton";
import CircleButton from "../components/buttons/CircleButton";
import ItemPicker from "../components/ItemPicker";
import ItemList from "../components/ItemList";
import {StatusBar} from "expo-status-bar";
import {NavigationProp, useNavigation, useRoute} from "@react-navigation/native";
import {RootStackParamList} from "../navigation";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const placeholderImage = require('../assets/images/sample.png')

const RoomImageView = () => {

    const navigation = useNavigation<NavigationProp<RootStackParamList>>();


    const {params} = useRoute();
    let item = params;
    console.log("RoomImageView", item);

    const [selectedImg, setSelectedImage] = useState(null);
    const [showTagOptions, setShowTagOptions] = useState(false);
    const [showMarker, setMarker] = useState(false);
    const [pickedItem, setPickedItem] = useState<ImageSourcePropType | null>(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const openActionSheetAsync = async () =>
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

    const pickImageAsync = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permissionResult.granted) {
            alert("Allow this app access to your photos");
            return;
        }

        let result: any = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 1
        });

        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri);
            setShowTagOptions(true);
        } else {
            alert('No image selected.');
        }
    }

    const openCameraAsync = async () => {
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

        if (!permissionResult.granted) {
            alert("Allow this app access to your camera");
            return;
        }

        let result: any = await ImagePicker.launchCameraAsync();

        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri);
            setShowTagOptions(true);
        } else {
            alert('No image selected.');
        }
    }

    const onReset = () => {
        setSelectedImage(null);
        setShowTagOptions(false);
    };

    const onSetMarker = () => {
        setMarker(true);
    }

    const onShowRaster = () => {
        alert('Here will be a raster image.')
    }

    const onShowList = () => {
        //alert('You pressed list button.')
        setIsModalVisible(true);
    }

    const onAddItem = () => {
        // implement this later
        alert('You pressed plus button.')
        // for dragging pins on the screen
    };

    const onSearch = async () => {
        alert('You pressed search button')
    };

    const onModalClose = () => {
        setIsModalVisible(false);
    };

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                {showTagOptions ? (
                    <EditableTitle
                        defaultTitle={"Room Default"}
                        onReset={onReset}
                        onAddMarker={onSetMarker}/>
                ) : (
                    <EditableTitle
                        defaultTitle={"Room Default"}
                        onReset={onReset}
                        onAddMarker={() => {
                            alert('First select an image')
                        }}/>
                )}
            </View>
            <View style={styles.imageContainer}>
                {showTagOptions ? (
                    <View>
                        <Pressable onPress={onShowRaster}>
                            <ImageViewer
                                placeholderImageSource={placeholderImage}
                                selectedImage={selectedImg}/>
                        </Pressable>
                        {showMarker && <Marker imageSize={40}/>}
                    </View>
                ) : (
                    <Pressable onPress={openActionSheetAsync}>
                        <ImageViewer
                            placeholderImageSource={placeholderImage}
                            selectedImage={selectedImg}/>
                    </Pressable>
                )}
            </View>
            <View style={styles.optionsContainer}>
                <View style={styles.optionsRow}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={{ backgroundColor: '#FFFF', borderRadius: 999, padding: 5}}>
                        <MaterialIcons name={"arrow-back"} size={28} color={'#D97706'}/>
                    </TouchableOpacity>
                    <LabeledIconButton icon="list" label="List" onPress={onShowList}/>
                    <CircleButton onPress={onAddItem}/>
                    <LabeledIconButton icon="search" label="Search" onPress={onSearch}/>
                </View>
            </View>
            <ItemPicker isVisible={isModalVisible} onClose={onModalClose}>
                <ItemList onSelect={setPickedItem} onCloseModal={onModalClose}/>
            </ItemPicker>
            <StatusBar style="auto"/>
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
        marginHorizontal: 60,
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

export default RoomImageView;