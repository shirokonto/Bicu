import {ImageSourcePropType} from "react-native";
import {Item, Room} from "types";

export type RoomScreenParams = {
    room: Room;
};

export interface ImageViewerProps {
    selectedImage: ImageSourcePropType | null | undefined;
    maximized: boolean
}

export interface ImageModalProps {
    visible: boolean;
    onClose: () => void;
    onMarkerPress: () => void;
    selectedImage: ImageSourcePropType | null | undefined;
}

export interface AddItemModalProps {
    visible: boolean;
    onClose: () => void;
    onAddItem: (item: Item) => void;
}

export interface EditableTitleProps {
    defaultTitle: string;
    onReset: () => void;
    onAddMarker: () => void;
}

export type ItemRowProps = {
    room: Room;
};

export type ItemCardProps = {
    item: Item;
    index: number;
};

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