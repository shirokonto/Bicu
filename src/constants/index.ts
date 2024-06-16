import {ImageSourcePropType} from "react-native";

export type RoomScreenParams = {
    room: {
        id: number;
        name: string;
        image: ImageSourcePropType;
        items: { name: string, category: string } [] | undefined;
    };
};

export interface ImageViewerProps {
    placeholderImageSource: ImageSourcePropType;
    selectedImage: ImageSourcePropType | null | undefined;
    maximized: boolean
}

export interface ImageModalProps {
    visible: boolean;
    onClose: () => void;
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

export type AddItemModalProps = {
    visible: boolean;
    onClose: () => void;
    onAddItem: (item: { name: string; category: string; image: string }) => void;
};

export interface EditableTitleProps {
    defaultTitle: string;
    onReset: () => void;
    onAddMarker: () => void;
}

export const listedRooms = [
    {
        id: 1,
        name: 'Basement',
        image: require('../assets/images/sample.png'),
        items: [
            {
                name: "item1",
                category: "Clothing",
            },
            {
                name: "item2",
                category: "Food",
            },
            {
                name: "item3",
                category: "Tech",
            },
        ],
    },
    {
        id: 2,
        name: 'Room 02',
        image: require('../assets/images/favicon.png'),
        items: [
            {
                name: "item1",
                category: "Clothing",
            },
        ],
    },
    {
        id: 3,
        name: 'Room 03',
        image: require('../assets/images/bicuicon.png'),
        items: [
            {
                name: "item1",
                category: "Clothing",
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