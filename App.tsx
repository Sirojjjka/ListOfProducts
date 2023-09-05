import React, { useEffect, useState } from "react";
import axios from "axios";
import { Text, View, TouchableOpacity, ScrollView, StatusBar } from "react-native";
import postsReducer from "./src/reducers/postReducer";
import store from "./src/store/store";
import Navigation from "./src/navigation";
import { useSelector, useDispatch } from "react-redux"; 

function App() {
  const [posts, setPosts] = useState([]);

  const dispatch = useDispatch()
  const datasets = useSelector((state) => state.posts)

  useEffect(() => {
      console.log(datasets, "aasdasd")
  }, [datasets]);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts/")
      .then((response) => {
        // setPosts(response.data);
      })
      .catch((error) => {
        console.error("Ошибка при получении данных:", error);
      });
  }, []);

  const addPost = (id) => {
    return {
      type: 'ADD_TODO',
      payload: id,
    };
  };

  const createPost = (postId) => {
    dispatch(addPost(postId));
  };

  const removePost = (id) => {
    return {
      type: 'REMOVE_TODO',
      payload: id,
    };
  };

  const deletePost = (postId) => {
    dispatch(removePost(postId));
  };



  return (
<Navigation/>
  );
}

export default App;