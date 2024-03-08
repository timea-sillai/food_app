import { Image, StyleSheet, View } from "react-native";
import { primary } from "../styles/styleGuide";

interface RoundImageContainerInterface {
  uri: string;
  fallbackImagePath?: string;
}

const RoundImageContainer: React.FC<RoundImageContainerInterface> = (props) => {
  return (
    <View style={styles.roundImageContainer}>
      <Image source={{ uri: props.uri }} style={styles.image} />
    </View>
  );
};

export default RoundImageContainer;

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  roundImageContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    overflow: "hidden",
    backgroundColor: primary.white,
    justifyContent: "center",
    alignItems: "center",
    borderColor: primary.greenDO,
    borderWidth: 5,
  },
});
