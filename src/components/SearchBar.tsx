import React, { useState } from "react";
import {
  View,
  TextInput,
  FlatList,
  Text,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { primary } from "../styles/styleGuide";
import { useDispatch, useSelector } from "react-redux";
import { searchMeal } from "../redux/actions/searchActions";

const SearchBar = () => {
  const dispatch = useDispatch();
  const searchMealResults = useSelector(
    (state: any) => state.searchMealResults
  );
  const [data, setData] = useState([
    { id: "1", name: "Item 1" },
    { id: "2", name: "Item 2" },
    { id: "3", name: "Item 3" },
    // Add more items as needed
  ]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (text: string) => {
    //dispatch(searchMeal(text));
    // setSearchQuery(text);
    // // Filter the data based on the search query
    // const filteredData = data.filter((item) =>
    //   item.name.toLowerCase().includes(text.toLowerCase())
    // );
    // // Update the data to show the filtered results
    // setData(filteredData);
  };

  const renderItem = ({ item }) => (
    <View style={{ padding: 10 }}>
      <Text>{item.name}</Text>
    </View>
  );

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          margin: 10,
          padding: 8,
          borderColor: primary.search_bar_border_color,
          backgroundColor: primary.grey_light,
          borderRadius: 10,
          borderWidth: 1,
        }}
      >
        <TouchableOpacity onPress={() => handleSearch(searchQuery)}>
          <Image
            source={require("../../assets/images/black_search.png")}
            style={{ width: 20, height: 20, marginHorizontal: 8 }}
          />
        </TouchableOpacity>

        <TextInput
          style={{
            flex: 1,
            height: 40,
          }}
          placeholder="Search meals..."
          //   onChangeText={handleSearch}
          value={searchQuery}
        />
        {searchMealResults?.loading ? (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        ) : null}
      </View>
      <FlatList
        data={searchMealResults?.searchResponse}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

export default SearchBar;
