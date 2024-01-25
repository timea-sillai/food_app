import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  FlatList,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { primary } from "../styles/styleGuide";
import { useDispatch, useSelector } from "react-redux";
import { searchMeal } from "../redux/actions/searchActions";
import { Meal } from "../types/types";
import { useDebounce } from "../hooks";
import Loading from "./Loading";
import { Exit, Search } from "../utils/svg";
import { useTranslation } from "react-i18next";
import { generalStyles } from "../styles/generalStyleSheet";

const SearchBar = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const searchMealResults = useSelector(
    (state: any) => state.searchMealResults
  );
  const [textValue, onChangeText] = useState<string>("");
  const debouncedDispatchSearchMeal = useDebounce(textValue, 500);

  const resetSearchBar = () => {
    onChangeText("");
    dispatch(searchMeal(""));
  };

  const dispatchSearchMeal = (text: string) => {
    dispatch(searchMeal(text));
  };

  useEffect(() => {
    dispatchSearchMeal(debouncedDispatchSearchMeal);
  }, [debouncedDispatchSearchMeal]);

  const handleSearch = (text: string) => {
    onChangeText(text);
  };

  const renderItem = ({ item }: { item: Meal }) => (
    <TouchableOpacity onPress={() => resetSearchBar()}>
      <View
        style={{
          padding: 10,
        }}
      >
        <Text style={{ color: primary.black }}>{item.strMeal}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View>
      <View style={styles.mainViewStyle}>
        <Search width={20} height={20} style={{ margin: 8 }} />

        <TextInput
          style={styles.textInputStyle}
          placeholder={t("searchMeals")}
          placeholderTextColor={primary.black}
          onChangeText={handleSearch}
          value={textValue}
        />
        <View style={styles.verticalLine} />
        {searchMealResults?.loading ? (
          <Loading />
        ) : (
          <View style={styles.searchBarIconStyle}>
            {searchMealResults?.searchResult?.meals ? (
              <View style={styles.centerViewStyle}>
                <TouchableOpacity onPress={resetSearchBar}>
                  <Exit width={20} height={20}></Exit>
                </TouchableOpacity>
              </View>
            ) : null}
          </View>
        )}
      </View>
      <FlatList<Meal>
        style={styles.flatListStyle}
        data={searchMealResults?.searchResult?.meals}
        keyExtractor={(item) => item.idMeal.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  flatListStyle: {
    backgroundColor: primary.grey_light,
    marginHorizontal: 10,
  },
  textInputStyle: {
    flex: 1,
    height: 44,
    color: primary.black,
  },
  mainViewStyle: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
    padding: 8,
    borderColor: primary.search_bar_border_color,
    backgroundColor: primary.grey_light,
    borderRadius: 10,
    borderWidth: 1,
  },
  searchImageStyle: {
    width: 20,
    height: 20,
    margin: 8,
  },
  verticalLine: {
    height: "100%",
    width: 1,
    backgroundColor: primary.greenDO,
    marginHorizontal: 10,
  },
  centerViewStyle: {
    justifyContent: "center",
    alignItems: "center",
  },
  searchBarIconStyle: {
    width: 30,
    height: 30,
  },
});

export default SearchBar;
