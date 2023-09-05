import React, { useEffect, useState } from "react";
import axios from "axios";
import { Text, View, TouchableOpacity, ScrollView, StatusBar } from "react-native";
import postsReducer from "./src/reducers/postReducer";
import store from "./src/store/store";
import Navigation from "./src/navigation";
import { useSelector, useDispatch } from "react-redux"; 

function App() {
  return (
    <Navigation/>
    );
}

export default App;