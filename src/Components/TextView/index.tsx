import React from "react";
import { Text } from "react-native";

interface IProps {
  text: string;
  styles?: any;
}

const TextView = (props: IProps) => {
  return <Text style={props.styles}>{props.text}</Text>;
};

export default TextView;
