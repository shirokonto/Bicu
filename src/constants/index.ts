import {ImageSourcePropType} from "react-native";

export type RoomScreenParams = {
    room: {
        id: number;
        name: string;
        image: ImageSourcePropType;
        description: string;
    };
};
export const listedRooms = [
    {
        id: 1,
        name: 'Room 01',
        image: require('../assets/images/sample.png'),
        description: 'Place where your stuff is',
    },
    {
        id: 2,
        name: 'Room 02',
        image: require('../assets/images/favicon.png'),
        description: 'Place where your stuff is',
    },
    {
        id: 3,
        name: 'Room 03',
        image: require('../assets/images/bicuicon.png'),
        description: 'Place where your stuff is',
    },
]

export const categories = [
    {
        id: 1,
        name: 'Clothing',
        image: require('../assets/images/favicon.png'),
    },
    {
        id: 2,
        name: 'Food',
        image: require('../assets/images/favicon.png'),
    },
    {
        id: 3,
        name: 'Tech',
        image: require('../assets/images/favicon.png'),
    },
    {
        id: 4,
        name: 'Garden',
        image: require('../assets/images/favicon.png'),
    },
    {
        id: 5,
        name: 'Furniture',
        image: require('../assets/images/favicon.png'),
    },
    {
        id: 6,
        name: 'Media',
        image: require('../assets/images/favicon.png'),
    },
    {
        id: 7,
        name: 'Toys',
        image: require('../assets/images/favicon.png'),
    },
    {
        id: 8,
        name: 'Household',
        image: require('../assets/images/favicon.png'),
    },
    {
        id: 9,
        name: 'Misc',
        image: require('../assets/images/favicon.png'),
    },
]