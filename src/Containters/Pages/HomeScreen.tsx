import * as React from "react";
import { Button, Text, View } from "react-native";
import { HomeScreenProps } from "../../Navigation/NavigationTypes";
import { useSelector } from "react-redux";

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const { loading, number } = useSelector((store: any) => store.home);
  console.log(loading, number);
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Home</Text>
      <Button
        title="Navigate to categories"
        onPress={() => navigation.navigate("Categories", {})}
      ></Button>
    </View>
  );
}
