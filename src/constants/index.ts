import { ImageSourcePropType } from "react-native";
import { Item, Room } from "types";

export type RoomScreenParams = {
    room: Room;
    itemId?: string;
};

export interface ImageViewerProps {
    selectedImage: ImageSourcePropType | null | undefined;
    maximized: boolean;
}

export interface ImageModalProps {
    visible: boolean;
    onClose: () => void;
    selectedImage: ImageSourcePropType | null | undefined;
    room: Room;
    onMarkerUpdate: (selectedItems: Item[]) => void;
    highlightedItemId?: string | number[] | null;
}

export interface AddItemModalProps {
    visible: boolean;
    onClose: () => void;
    onAddItem: (item: Item) => void;
    itemToEdit?: Item | null;
}

export interface EditableTitleProps {
    defaultTitle: string;
    onReset: () => void;
    onAddMarker: () => void;
}

export type ItemRowProps = {
    room: Room;
    onItemPress: (itemId: string | number[] ) => void;
    onRoomUpdate: (updatedRoom: Room) => void;
};

export type ItemCardProps = {
    item: Item;
    index: number;
    onPress: () => void;
    onEdit: (item : Item) => void;
    onDelete: (itemId: string | number[]) => void;
    onImageUpdate: (itemId: string | number[], uri: string, dominantColor: string | undefined) => void;
};

export const colorPalette = [
    { name: 'WHITE', rgb: [255, 255, 255] },
    { name: 'YELLOW', rgb: [255, 255, 0] },
    { name: 'ORANGE', rgb: [255, 165, 0] },
    { name: 'PINK', rgb: [255, 192, 203] },
    { name: 'MAGENTA', rgb: [255, 0, 255] },
    { name: 'RED', rgb: [255, 0, 0] },
    { name: 'GREEN', rgb: [0, 128, 0] },
    { name: 'OLIVE', rgb: [128, 128, 0] },
    { name: 'BLUE', rgb: [0, 0, 255] },
    { name: 'NAVY', rgb: [0, 0, 128] },
    { name: 'BROWN', rgb: [165, 42, 42] },
    { name: 'GRAY', rgb: [128, 128, 128] },
    { name: 'BLACK', rgb: [0, 0, 0] },
];


export const categories = [
    {
        id: 1,
        name: 'Clothing',
        image: require('../assets/images/categories/clothing.png'),
    },
    {
        id: 2,
        name: 'Food',
        image: require('../assets/images/categories/food.png'),
    },
    {
        id: 3,
        name: 'Tech',
        image: require('../assets/images/categories/technology.png'),
    },
    {
        id: 4,
        name: 'Garden',
        image: require('../assets/images/categories/garden.png'),
    },
    {
        id: 5,
        name: 'Furniture',
        image: require('../assets/images/categories/furniture.png'),
    },
    {
        id: 6,
        name: 'Media',
        image: require('../assets/images/categories/media.png'),
    },
    {
        id: 7,
        name: 'Toys',
        image: require('../assets/images/categories/toy.png'),
    },
    {
        id: 8,
        name: 'Household',
        image: require('../assets/images/categories/household.png'),
    },
    {
        id: 9,
        name: 'Misc',
        image: require('../assets/images/categories/misc.png'),
    },
]