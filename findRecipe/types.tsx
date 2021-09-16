import { ImageSourcePropType, ImageStyle, StyleProp } from "react-native";

export interface Data {
  content: string;
}
export type RootStackParamList = {
  Home: undefined;
  Recipe: { operation: Data[] };
};
export interface Recipes {
  strMeal: string;
  strMealThumb: string;
  idMeal: string;
}
export interface Thumbnail {
  style: StyleProp<ImageStyle>;
  source: ImageSourcePropType;
}
