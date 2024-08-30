import { ScrollView, StatusBar } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { SafeAreaView } from "react-native-safe-area-context";
import Categories from "../components/Categories";
import RoomRow from "../components/home/RoomRow";
import SearchBar from "../components/SearchBar";
import React, { useState } from "react";

type HomeScreenNavigationProp = NavigationProp<Record<string, object | undefined>, string>;


const Home = () => {
    const navigation = useNavigation<HomeScreenNavigationProp>();
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);


    return (
        <SafeAreaView style={{backgroundColor: '#fff'}}>
            <StatusBar barStyle="dark-content"/>

            {/*search bar */}
            <SearchBar onSearch={setSearchQuery}/>

            {/*main */}
            <ScrollView showsVerticalScrollIndicator={false}
                        contentContainerStyle={{paddingBottom: 20}}
            >
                {/*categories*/}
                <Categories onCategorySelect={setSelectedCategory}/>

                {/*room list*/}
                <RoomRow searchQuery={searchQuery}  selectedCategory={selectedCategory}/>
            </ScrollView>
        </SafeAreaView>
    );
};


export default Home;