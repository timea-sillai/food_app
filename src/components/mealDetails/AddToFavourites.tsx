import { useEffect, useState } from "react";
import { Alert, TouchableOpacity, ViewStyle } from "react-native";
import { Heart, EmptyHeart } from "../../utils/svg";
import asyncStorage from "../../storage";
import alertDialog, { AlertDialogObject } from "../AlertDialog";
import { useTranslation } from "react-i18next";

export interface FavouritesDetails {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

interface AddToFavouritesProps {
  style?: ViewStyle;
  meal: FavouritesDetails;
  doAfterRemoveFromFavourites?: () => void;
}

const AddToFavourites: React.FC<AddToFavouritesProps> = (props) => {
  const [isLiked, setLiked] = useState<boolean>(false);
  const { t } = useTranslation();

  const alertInfo: AlertDialogObject = {
    title: t("warning"),
    message: t("removeFavouriteMessage"),
    actionButtonTitle: t("yes"),
    action: () => {
      asyncStorage
        .toggleFavourites(props.meal)
        .then((data) => {
          if (data != undefined) setLiked(data);
          if (props.doAfterRemoveFromFavourites != undefined)
            props.doAfterRemoveFromFavourites();
        })
        .catch((error) => {
          console.error(error);
        });
    },
  };

  useEffect(() => {
    asyncStorage
      .isMealLiked(props.meal.idMeal)
      .then((data) => {
        data && setLiked(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const onFavouritesClick = () => {
    if (isLiked) alertDialog.showAlert(alertInfo);
    else {
      asyncStorage
        .toggleFavourites(props.meal)
        .then((data) => {
          if (data != undefined) setLiked(data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <TouchableOpacity onPress={onFavouritesClick} style={props.style}>
      {isLiked ? (
        <Heart width={30} height={30} />
      ) : (
        <EmptyHeart width={30} height={30} />
      )}
    </TouchableOpacity>
  );
};

export default AddToFavourites;
