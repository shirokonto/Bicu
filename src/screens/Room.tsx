import {
    ActionSheetIOS,
    Modal,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import {NavigationProp, RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import {RootStackParamList} from '../navigation/index'
import {RoomScreenParams} from "../constants";
import React, {useRef, useState} from "react";
import IconButton from "../components/buttons/IconButton";
import ItemRow from "../components/room/ItemRow";
import * as ImagePicker from "expo-image-picker";
import ImageViewer from "../components/room/image/ImageViewer";

const placeholderImage = require('../assets/images/sample.png')



const Room = () => {

    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const route = useRoute<RouteProp<RootStackParamList, "Room">>();
    const { room } = route.params as RoomScreenParams;
    const textInputRef = useRef<TextInput | null>(null);

    const [isImageMaximized, setIsImageMaximized] = useState(false);
    const [selectedImg, setSelectedImage] = useState(null);
    const [showTagOptions, setShowTagOptions] = useState(false);
    const [showMarker, setMarker] = useState(false);
    const [value, onChangeText] = useState(room.name || "Room");

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

    const onSetMarker = () => {
        setMarker(true);
    }

    return (
        <View>
            <ScrollView>
                <View style={{position: "relative"}}>

                    {/* title image */}
                    <Pressable onPress={() => setIsImageMaximized(true)}>
                        <ImageViewer
                            placeholderImageSource={placeholderImage}
                            selectedImage={selectedImg}/>
                    </Pressable>

                    {/* rest */}
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={{position: "absolute", top: 50, left: 15, backgroundColor: '#FFFF', borderRadius: 999, padding: 5}}>
                        <MaterialIcons name={"arrow-back"} size={28} color={'#D97706'}/>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => onSetMarker}
                        style={{position: "absolute", top: 50, right: 15, backgroundColor: '#FFFF', borderRadius: 999, padding: 5}}>
                        <MaterialIcons name={"bookmark-add"} size={28} color={'#D97706'}/>
                    </TouchableOpacity>
                </View>

                <View style={{ borderTopLeftRadius: 40, borderTopRightRadius: 40, backgroundColor: 'white', marginTop: -12, paddingTop: 6 }}>
                    <View style={{paddingHorizontal: 30}}>
                        <View>
                            <View style={styles.titleRow}>
                                <View style={{flexDirection: 'row',}}>
                                    <TextInput style={styles.titleLabel}
                                               maxLength={9}
                                               onChangeText={text => onChangeText(text)}
                                               value={value}
                                               ref={textInputRef}/>
                                    <IconButton icon="mode-edit" label="Marker" onPress={() => {
                                        if (textInputRef.current) {
                                            textInputRef.current.focus();
                                        }
                                    }}/>
                                </View>
                                    <TouchableOpacity
                                        onPress={openActionSheetAsync}
                                        style={{ right: 15, backgroundColor: '#FFFF', borderRadius: 999, padding: 5}}>
                                        <MaterialIcons name={"add-photo-alternate"} size={28} color={'#D97706'}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <TouchableOpacity onPress={() => navigation.navigate("TodoConvert")}>
                            <Text style={{fontSize: 11, paddingTop: 20, color: "#D97706", lineHeight: 16}}>See old view</Text>
                        </TouchableOpacity>
                    </View>

                    {/* items */}
                    <ItemRow room={room}/>
                </View>
            </ScrollView>

            {/* Modal for maximized image */}
            {isImageMaximized && (
                <Modal
                    transparent={true}
                    visible={isImageMaximized}
                    onRequestClose={() => setIsImageMaximized(false)}
                >
                    <View style={styles.modalContainer}>
                        <Pressable onPress={() => setIsImageMaximized(false)}>
                            <MaterialIcons name="close" size={28} color="#FFFFFF" />
                        </Pressable>
                        <ImageViewer
                            placeholderImageSource={placeholderImage}
                            selectedImage={selectedImg}
                        />
                    </View>
                </Modal>
            )}
        </View>

    );
};

const styles = StyleSheet.create({
    titleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    titleLabel: {
        fontSize: 30,
        fontWeight: 'bold',
        paddingVertical: 12,
    },
    emptyItemsList: {
        color: 'gray',
        fontStyle: 'italic',
        textAlign: 'center',
        marginTop: 20,
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        justifyContent: 'center',
        alignItems: 'center',
    },
});


export default Room;