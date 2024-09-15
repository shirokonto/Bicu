import { ScrollView, StatusBar } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { SafeAreaView } from "react-native-safe-area-context";
import Categories from "../components/Categories";
import RoomRow from "../components/home/RoomRow";
import SearchBar from "../components/SearchBar";
import React, { useState } from "react";
import ColorPalette from "@components/home/ColorPalette";

type HomeScreenNavigationProp = NavigationProp<Record<string, object | undefined>, string>;


const Home = () => {
    const navigation = useNavigation<HomeScreenNavigationProp>();
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedColor, setSelectedColor] = useState<string | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [isColorPaletteVisible, setIsColorPaletteVisible] = useState(false);

    const handleColorSelect = (color: string | null) => {
       setSelectedColor(color);
    };

    const toggleColorPalette = () => {
        setIsColorPaletteVisible(!isColorPaletteVisible);
    };

    return (
        <SafeAreaView style={{backgroundColor: '#fff'}}>
            <StatusBar barStyle="dark-content"/>

            {/*search bar */}
            <SearchBar
                onSearch={setSearchQuery}
                onFilterPress={toggleColorPalette}
            />

            {/*main */}
            <ScrollView showsVerticalScrollIndicator={false}
                        contentContainerStyle={{paddingBottom: 20}}
            >
                {/* Color Palette */}
                {isColorPaletteVisible && (
                    <ColorPalette
                        onSelectColor={handleColorSelect}
                        selectedColor={selectedColor}
                    />
                )}

                {/*categories*/}
                <Categories onCategorySelect={setSelectedCategory}/>

                {/*room list*/}
                <RoomRow
                    searchQuery={searchQuery}
                    selectedCategory={selectedCategory}
                    selectedColor={selectedColor}
                />
            </ScrollView>
        </SafeAreaView>
    );
};


export default Home;