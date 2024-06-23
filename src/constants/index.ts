import {ImageSourcePropType} from "react-native";
import {Item, Room} from "../types";

export type RoomScreenParams = {
    room: Room;
};

export interface ImageViewerProps {
    placeholderImageSource: ImageSourcePropType;
    selectedImage: ImageSourcePropType | null | undefined;
    maximized: boolean
}

export interface ImageModalProps {
    visible: boolean;
    onClose: () => void;
    onMarkerPress: () => void;
    placeholderImageSource: ImageSourcePropType;
    selectedImage: ImageSourcePropType | null | undefined;
}

export type ItemRowProps = {
    room: RoomScreenParams['room'];
};

export type ItemCardProps = {
    room: RoomScreenParams['room'];
    index: number;
};

export interface AddItemModalProps {
    visible: boolean;
    onClose: () => void;
    roomId: string | number[];
    onAddItem: (item: Item) => void;
}

export interface EditableTitleProps {
    defaultTitle: string;
    onReset: () => void;
    onAddMarker: () => void;
}

export const listedRooms = [
    {
        id: '1',
        name: 'Basement',
        image: require('../assets/images/sample.png'),
        items: [
            {
                id: '0',
                name: "item1",
                category: "Clothing",
                markers: [],
            },
            {
                id: '1',
                name: "item2",
                category: "Food",
                markers: [],
            },
            {
                id: '2',
                name: "item3",
                category: "Tech",
                markers: [],
            },
        ],
    },
    {
        id: '2',
        name: 'Room 02',
        image: require('../assets/images/favicon.png'),
        items: [
            {
                id: '0',
                name: "item1",
                category: "Clothing",
                markers: [],
            },
        ],
    },
    {
        id: '3',
        name: 'Room 03',
        image: require('../assets/images/bicuicon.png'),
        items: [
            {
                id: '0',
                name: "item1",
                category: "Clothing",
                markers: [],
            },
        ],
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
        image: require('../assets/images/categories/food.png'),
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