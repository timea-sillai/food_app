import React, { useState } from "react";
import {
  View,
  TextInput,
  FlatList,
  Text,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { primary } from "../styles/styleGuide";
import { useDispatch, useSelector } from "react-redux";
import { resetSearchResults, searchMeal } from "../redux/actions/searchActions";
import { dimensions } from "../styles/dimens";

const SearchBar = () => {
  const dispatch = useDispatch();
  const searchMealResults = useSelector(
    (state: any) => state.searchMealResults
  );
  // const [number, onChangeNumber] = React.useState("");

  const resetSearchBar = () => {
    dispatch(resetSearchResults());
    //todo clear search text
  };

  const dispatchSearchMeal = (text: string) => {
    dispatch(searchMeal(text));
  };

  const debounce = (func, delay: number) => {
    let timeoutId;
    return function (...args) {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const debouncedDispatchSearchMeal = debounce(dispatchSearchMeal, 500);

  const handleSearch = (text: string) => {
    if (text.length === 0) {
      resetSearchBar();
    } else {
      debouncedDispatchSearchMeal(text);
    }
  };

  const handleOnSearchResultClicked = (item) => {
    resetSearchBar();
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleOnSearchResultClicked(item)}>
      <View
        style={{
          padding: 10,
        }}
      >
        <Text>{item.strMeal}</Text>
      </View>
    </TouchableOpacity>
  );
  return (
    <View>
      <View style={styles.mainViewStyle}>
        <Image
          source={require("../../assets/images/black_search.png")}
          style={styles.searchImageStyle}
        />

        <TextInput
          style={styles.textInputStyle}
          placeholder="Search meals..."
          onChangeText={handleSearch}
          // value={number}
        />
        <View style={styles.verticalLine} />
        {searchMealResults?.loading ? (
          <View>
            <ActivityIndicator
              size={dimensions.searchBarIconsSize}
              color={primary.green}
            />
          </View>
        ) : (
          <View style={styles.searchBarIconStyle}>
            {searchMealResults?.searchResult?.meals ? (
              <View style={styles.centerViewStyle}>
                <TouchableOpacity onPress={resetSearchBar}>
                  <Image
                    source={require("../../assets/images/reject.png")}
                    style={styles.searchImageStyle}
                  />
                </TouchableOpacity>
              </View>
            ) : null}
          </View>
        )}
      </View>
      <FlatList
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
    zIndex: 2,
    backgroundColor: primary.grey_light,
    marginHorizontal: 10,
  },
  textInputStyle: {
    flex: 1,
    height: 44,
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
    width: dimensions.searchBarIconsSize,
    height: dimensions.searchBarIconsSize,
  },
});

export default SearchBar;
