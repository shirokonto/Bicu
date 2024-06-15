import {Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {NavigationProp, RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import {RootStackParamList} from '../navigation/index'
import {RoomScreenParams} from "../constants";
import React, {useRef, useState} from "react";
import IconButton from "../components/buttons/IconButton";
import ItemCard from "../components/ItemCard";
import ItemModal from "../components/room/modals/ItemModal";


const Room = () => {

    {/* image view */}
        {/* select picture */}
        {/* set picture */}
        {/* set marker points */}

    {/* item list  - add new item with name and category */}
        {/* add modal */}

    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const route = useRoute<RouteProp<RootStackParamList, "Room">>();
    const { room } = route.params as RoomScreenParams;
    const textInputRef = useRef<TextInput | null>(null);


    const [selectedImg, setSelectedImage] = useState(null);
    const [showTagOptions, setShowTagOptions] = useState(false);
    const [showMarker, setMarker] = useState(false);
    const [value, onChangeText] = useState(room.name || "Room");
    const [isModalVisible, setModalVisible] = useState(false);
    const [items, setItems] = useState(room.items || []);


    const onReset = () => { room
        setSelectedImage(null);
        setShowTagOptions(false);
    };

    const onSetMarker = () => {
        setMarker(true);
    }

    const handleAddItem = (newItem: { name: string; category: string; image: string }) => {
        setItems([...items, newItem]);
    };


    return (
        <View>
            <ScrollView>
                <View style={{position: "relative"}}>
                    <Image source={room.image} style={{width: "100%", height: 320}}/>
                    {/* TODO add ImageViewer and click for tags etc */}
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={{position: "absolute", top: 50, left: 15, backgroundColor: '#FFFF', borderRadius: 999, padding: 5}}>
                        <MaterialIcons name={"arrow-back"} size={28} color={'#D97706'}/>
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
                                        onPress={() => navigation.goBack()}
                                        style={{ right: 15, backgroundColor: '#FFFF', borderRadius: 999, padding: 5}}>
                                        <MaterialIcons name={"room-preferences"} size={28} color={'#D97706'}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <TouchableOpacity onPress={() => navigation.navigate("TodoConvert")}>
                            <Text style={{fontSize: 18, paddingTop: 20, color: "#D97706", lineHeight: 16}}>See old view</Text>
                        </TouchableOpacity>
                        <View style={{flexDirection: 'row',}}>
                            <Text style={{paddingVertical: 12, fontWeight: 'bold', fontSize: 25,}}>Items</Text>
                            <IconButton icon="add" label="Add" onPress={() => setModalVisible(true)} />
                        </View>
                    </View>
                    {/* items */}
                    <View >
                        {room.items && room.items.length > 0 ? (
                            room.items.map((item, index) => (
                                <ItemCard
                                    room={room}
                                    key={index}
                                    index={index}
                                />
                            ))
                        ) : (
                            <Text style={styles.emptyItemsList}>Add items with plus icon</Text>
                        )}
                    </View>
                </View>
            </ScrollView>
            <ItemModal
                visible={isModalVisible}
                onClose={() => setModalVisible(false)}
                onAddItem={handleAddItem}
            />
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
});


export default Room;