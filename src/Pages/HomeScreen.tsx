import * as React from "react";
import { Button, Text, View } from "react-native";
import { HomeScreenProps } from "../navigation/navigationTypes";
import { fetchPostsRequest } from "../actions/postsActions";
import { RootState } from "../redux/reducers/RootReducer";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { IPost } from "../types/types";

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const dispatch = useDispatch();
  const { pending, posts, error } = useSelector(
    (state: RootState) => state.posts
  );

  React.useEffect(() => {
    //dispatch(fetchPostsRequest());
    //axios.get<IPost[]>("https://jsonplaceholder.typicode.com/todos")
    fetchData();
  }, []);

  // Using the Fetch API
  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://www.themealdb.com/api/json/v1/1/categories.php"
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Home</Text>
      <Button
        title="Navigate to categories"
        onPress={() => navigation.navigate("Categories", {})}
      ></Button>
      <View>
        {pending ? (
          <Text>Loading...</Text>
        ) : error ? (
          <Text>Error</Text>
        ) : (
          posts?.map((todo, index) => (
            <Text key={todo.id}>
              {++index}. {todo.title}
            </Text>
          ))
        )}
      </View>
    </View>
  );
};

export default HomeScreen;
