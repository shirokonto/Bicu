import React, {useState} from "react";
import {ImageSourcePropType, Pressable, StyleSheet, TouchableOpacity, View} from "react-native";
import EditableTitle from "../components/EditableTitle";
import ImageViewer from "../components/room/image/ImageViewer";
import Marker from "../components/Marker";
import LabeledIconButton from "../components/buttons/LabeledIconButton";
import CircleButton from "../components/buttons/CircleButton";
import ItemPicker from "../components/room/ItemPicker";
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
                                selectedImage={selectedImg}
                                maximized={false}
                            />
                        </Pressable>
                        {showMarker && <Marker imageSize={40}/>}
                    </View>
                ) : (
                    <Pressable onPress={() => alert('First select an image')}>
                        <ImageViewer
                            placeholderImageSource={placeholderImage}
                            selectedImage={selectedImg}
                            maximized={false}
                        />
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