import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from "../screens/Home";
import RoomScreen from "../screens/Room";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Room } from "types"

const Stack = createNativeStackNavigator();

export type RootStackParamList = {
    Home: undefined;
    Room: {
        room: Room;
        itemId?:  string | number[];
    };
    TodoConvert: undefined;
};

const RootNavigator = () => {
    return (
        <NavigationContainer>
            {/* HomeStackNavigator */}
            <Stack.Navigator screenOptions={{
                headerShown: false
            }}>
                <Stack.Screen name="Home" component={HomeScreen}/>
                <Stack.Screen name="Room" component={RoomScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default RootNavigator;