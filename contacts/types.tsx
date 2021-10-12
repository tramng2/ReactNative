export interface Data {
  content: string;
}
export type RootStackParamList = {
  Home: undefined;
  Contacts: { operation: Data[] };
  TextToSpeech: undefined;
};
