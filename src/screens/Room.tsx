import {ActionSheetIOS, ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {NavigationProp, RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import {RootStackParamList} from '../navigation/index'
import React, {useState} from "react";
import ImageModal from "../components/room/modals/ImageModal";
import TitleImage from "../components/room/image/TitleImage";
import RoomDetails from "../components/room/RoomDetails";
import {useImageHandler} from "../hooks/useImageHandler";
import {RoomScreenParams} from "../constants";


const placeholderImage = require('../assets/images/sample.png')



const Room = () => {

    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const route = useRoute<RouteProp<RootStackParamList, "Room">>();
    const { room } = route.params as RoomScreenParams;
    //const  { room } = route.params as Room;
    const { selectedImg, openGalleryAsync, openCameraAsync } = useImageHandler();

    const [isImageMaximized, setIsImageMaximized] = useState(false);
    const [showTagOptions, setShowTagOptions] = useState(false);
    const [showMarker, setMarker] = useState(false);

    // TODO replace with openActionSheet?
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
                    openCameraAsync()
                } else if (buttonIndex === 2) {
                    openGalleryAsync()
                }
            },
        );

    const onSetMarker = () => {
        alert("Add marker here")
        setMarker(true);
    }

    return (
        <View>
            <ScrollView>
                <View style={{position: "relative"}}>

                    {/* title image */}
                    <TitleImage selectedImg={selectedImg}
                    isImageMaximized={isImageMaximized}
                    onPress={() => setIsImageMaximized(true)}/>

                    {/* Action Buttons */}
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={styles.backButton}>
                        <MaterialIcons name={"arrow-back"} size={28} color={'#D97706'}/>
                    </TouchableOpacity>
                </View>

                {/* Room details with item list*/}
                <RoomDetails fetchedRoom={room} navigation={navigation} openActionSheetAsync={openActionSheetAsync}/>
            </ScrollView>

            {/* Modal for maximized image */}
            <ImageModal
                visible={isImageMaximized}
                onClose={() => setIsImageMaximized(false)}
                onMarkerPress={() => onSetMarker()}
                placeholderImageSource={placeholderImage}
                selectedImage={selectedImg}
            />
        </View>

    );
};

const styles = StyleSheet.create({
    backButton: {
        position: "absolute",
        top: 50,
        left: 15,
        backgroundColor: '#FFFF',
        borderRadius: 999,
        padding: 5
    },
})

export default Room;