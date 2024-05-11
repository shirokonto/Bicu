import {Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {NavigationProp, RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import {RootStackParamList} from '../navigation/index'
import {RoomScreenParams} from "../constants";
import React, {useState} from "react";
import IconButton from "../components/buttons/IconButton";
import ItemCard from "../components/ItemCard";


const Room = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const route = useRoute<RouteProp<RootStackParamList, "Room">>();
    const { room } = route.params as RoomScreenParams;

    const [selectedImg, setSelectedImage] = useState(null);
    const [showTagOptions, setShowTagOptions] = useState(false);
    const [showMarker, setMarker] = useState(false);
    const [value, onChangeText] = React.useState("New room");


    const onReset = () => { room
        setSelectedImage(null);
        setShowTagOptions(false);
    };

    const onSetMarker = () => {
        setMarker(true);
    }

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
                                               value={room.name}/>
                                    <IconButton icon="mode-edit" label="Marker" onPress={() => alert('No image selected.')}/>
                                </View>
                                    <TouchableOpacity
                                        onPress={() => navigation.goBack()}
                                        style={{ right: 15, backgroundColor: '#FFFF', borderRadius: 999, padding: 5}}>
                                        <MaterialIcons name={"room-preferences"} size={28} color={'#D97706'}/>
                                </TouchableOpacity>
                            </View>
                            <Text style={{fontSize: 18}}>{room.description}</Text>
                        </View>
                        <TouchableOpacity onPress={() => navigation.navigate("TodoConvert")}>
                            <Text style={{fontSize: 18, paddingTop: 20, color: "#D97706", lineHeight: 16}}>See old view</Text>
                        </TouchableOpacity>
                        <Text style={{paddingVertical: 12, fontWeight: 'bold', fontSize: 25,}}>Items</Text>
                    </View>
                    {/* items */}
                    <View >
                        {
                            room.items.map((item, index) => {
                                return (
                                    <ItemCard
                                        room = { room }
                                        key  = { index }
                                        index = { index }
                                    />
                                )
                            })
                        }
                    </View>


                </View>
            </ScrollView>

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
});


export default Room;