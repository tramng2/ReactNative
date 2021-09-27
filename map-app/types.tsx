import { StackNavigationProp } from "@react-navigation/stack";

export interface Locations {
  [key: string]: string | Object;
}
export interface LatLgn {
  [key: string]: number;
}

export type RootStackParamList = {
  Home: undefined;
  Search: undefined;
  Map: { location: Locations };
};

export type PropsNavigation = {
  navigation: StackNavigationProp<RootStackParamList, "Search">;
};
