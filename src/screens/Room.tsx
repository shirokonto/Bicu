import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import {RootStackParamList} from '../navigation/index'
import {RoomScreenParams} from "../constants";


const Room = () => {
    const route = useRoute<RouteProp<RootStackParamList, "Room">>();
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const { room } = route.params as RoomScreenParams;
    // TODO refactor to remove one of RoomScreenParams or RootStackParamList

    return (
        <View>
            <ScrollView>
                <View style={{position: "relative"}}>
                    <Image source={room.image} style={{width: "100%", height: 320}}/>
                    {/* click for tag? */}

                </View>

                <View style={{flex: 1, paddingTop: 50, paddingHorizontal: 10}}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}>
                        <MaterialIcons name={"arrow-back"} size={28}/>
                    </TouchableOpacity>
                    <Text style={{fontSize: 18, paddingBottom: 12}}>Name: {room.name}</Text>
                    <Text style={{fontSize: 18}}>Description: {room.description}</Text>
                </View>
            </ScrollView>

        </View>

    );
};

export default Room;