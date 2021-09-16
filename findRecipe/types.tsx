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
