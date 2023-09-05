import React, { useEffect, useState } from "react";
import axios from "axios";
import { 
  Text, 
  View, 
  TouchableOpacity, 
  ScrollView, 
  TextInput, 
  FlatList, 
  Image, 
  Button, 
  StatusBar, 
  ActivityIndicator 
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";
import { Formik } from 'formik';
import * as yup from 'yup';
import { useSelector, useDispatch } from "react-redux";
import FormCommponent from "../FormComponent";
import { LoadingContainer, Container, Title } from "./styles";

function PostScreen() {
  const [myData, setMyData] = useState([]);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const datasets = useSelector((state) => state.posts);
  const [posts, setPosts] = useState({});

  useEffect(() => {
    axios
      .get('https://fakestoreapi.com/products')
      .then((response) => {
        const dataa = response?.data;
        AsyncStorage.setItem('products', JSON.stringify(dataa)).then(() => {
          AsyncStorage.getItem('products')
            .then((storedData) => {
              console.log('asyncStorage1', storedData);
            })
            .catch((error) => {
              console.error("Помилка при отриманні даних з AsyncStorage:", error);
            });
        });
        setPosts(response.data);
        createPost(response.data);
        response.data?.map(item => createPost(item));
      })
      .catch((error) => {
        console.error("Помилка при отриманні даних:", error);
      });
  }, []);

  useEffect(() => {
    AsyncStorage.getItem('products')
      .then((storedData) => {
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          setMyData(parsedData); 
        }
      })
      .catch((error) => {
        console.error("Помилка при отриманні даних з AsyncStorage:", error);
      });
  }, []);

  const Idd = datasets.length;

  const addPost = (datasets) => {
    return {
      type: "ADD_TODO",
      payload: datasets,
    };
  };

  const createPost = (datasets) => {
    dispatch(addPost(datasets));
  };

  const Item = React.memo(({ title, image, description, price, id }) => (
    <TouchableOpacity onPress={() => navigation.navigate('Comment', id)} style={{ alignItems: 'center', justifyContent: 'center', borderRadius:5, width:300, borderWidth:0.2, minHeight:150, marginTop:10 }}>
      <Image style={{ width: 50, height: 70 }} source={{ uri: image }} />
      <View style={{backgroundColor:'#fff', justifyContent:'center', alignItems:'center', width:'100%', borderBottomLeftRadius:10,borderBottomRightRadius:10,flex:1}}>
        <Text style={{fontWeight:600, maxWidth:'85%'}}>{title}</Text>
        <Text style={{color:'red'}}>${price}</Text>
      </View>
    </TouchableOpacity>
  ));

  return (
    <Container >
      <StatusBar backgroundColor='#e7faf6'/>
      <View style={{marginBottom:20}}>
        <Title>Список товарів</Title>
      </View>
      <Button onPress={() => navigation.navigate('FormComponent', {navigation, dispatch})} title="go to form"/>
      {myData.length > 1 && datasets.length < 1 ? 
        <FlatList
          data={myData}
          renderItem={({item}) => item.id && <Item id={item.id} price={item.price} description={item.description} image={item.image} title={item.title} />}
          keyExtractor={item => item.id}
        />: datasets.length > 1 ? 
          <FlatList
            data={datasets}
            renderItem={({item}) => item.id && <Item id={item.id} price={item.price} description={item.description} image={item.image} title={item.title} />}
            keyExtractor={item => item.id}
          />: 
          <LoadingContainer>
            <Text>Трошки зачекайте...</Text>
            <ActivityIndicator size="large"/>
          </LoadingContainer>}
    </Container>
  );
}

export default PostScreen;

