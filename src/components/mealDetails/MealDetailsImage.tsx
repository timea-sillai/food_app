import { useWindowDimensions, View, Image, StyleSheet } from "react-native";

interface MealDetailsImageProps {
  mealImage: string | undefined;
}
const MealDetailsImage: React.FC<MealDetailsImageProps> = (props) => {
  const { height } = useWindowDimensions();
  return (
    <View style={[styles.imageContainer, { top: height * 0.15 }]}>
      {props.mealImage && (
        <Image
          style={styles.imageStyle}
          source={{ uri: props.mealImage }}
          resizeMode="cover"
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  imageStyle: {
    width: 200,
    height: 200,
    borderRadius: 50,
  },
  imageContainer: {
    alignSelf: "center",
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MealDetailsImage;
