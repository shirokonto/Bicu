import {ImageSourcePropType} from 'react-native';

export const getImageSource = (image: string | ImageSourcePropType | undefined): ImageSourcePropType | undefined => {
    if (typeof image === 'string') {
        return { uri: image };
    }
    return image;
};
