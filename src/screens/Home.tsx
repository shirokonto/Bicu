import {ScrollView, StatusBar} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {SafeAreaView} from "react-native-safe-area-context";
import Categories from "../components/Categories";
import RoomsRow from "../components/RoomsRow";
import SearchBar from "../components/SearchBar";
import React from "react";

type HomeScreenNavigationProp = NavigationProp<Record<string, object | undefined>, string>;


const Home = () => {

    const navigation = useNavigation<HomeScreenNavigationProp>();

    return (
        <SafeAreaView style={{backgroundColor: '#fff'}}>
            <StatusBar barStyle="dark-content"/>

            {/*search bar */}
            <SearchBar/>

            {/*main */}
            <ScrollView showsVerticalScrollIndicator={false}
                        contentContainerStyle={{paddingBottom: 20}}
            >
                {/*categories*/}
                <Categories/>

                {/*room list*/}
                <RoomsRow/>
            </ScrollView>
        </SafeAreaView>
    );
};


export default Home;