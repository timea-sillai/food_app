import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { Heart, EmptyHeart } from "../../utils/svg";

const AddToFavourites = () => {
  const [isLiked, setLiked] = useState<boolean>(false);
  const toggleFavourites = () => {
    setLiked(!isLiked);
  };

  return (
    <TouchableOpacity onPress={toggleFavourites}>
      {isLiked ? (
        <Heart width={30} height={30} />
      ) : (
        <EmptyHeart width={30} height={30} />
      )}
    </TouchableOpacity>
  );
};

export default AddToFavourites;
