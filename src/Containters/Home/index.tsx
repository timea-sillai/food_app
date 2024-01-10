import React from "react";
import { Button, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles";

// Actions
import TextView from "../../Components/TextView";
import { increaseRequest } from "./Actions";

const Home = () => {
  const dispatch = useDispatch();

  const { loading, number } = useSelector((store: any) => store.home);

  const handleOnPress = () => {
    dispatch(increaseRequest(number));
  };

  return (
    <View>
      <View>
        <TextView text={`The number is: ${number}`} />
        <TextView text={`Loading ${loading}`} />
      </View>
      <Button title={"Increase"} onPress={handleOnPress} />
    </View>
  );
};

export default Home;
