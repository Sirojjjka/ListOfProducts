import React, { useEffect, useState } from "react";
import axios from "axios";
import { Text, View, TouchableOpacity, ScrollView, TextInput, FlatList, Image, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Formik } from 'formik';
import * as yup from 'yup';
import { useSelector, useDispatch } from "react-redux";


const FormCommponent = () => {
    const validationSchema = yup.object().shape({
        title: yup.string().required("Це поле обов'язкове"),
        price: yup.number().required("Це поле обов'язкове"),
        description: yup.string().required("Це поле обов'язкове"),
      });
    const dispatch = useDispatch()
    const navigation = useNavigation()

    const addItem = (datasets) => {
        return {
          type: "ADD_ITEMS",
          payload: datasets,
        };
      }
      const addPost = (datasets) => {
        return {
          type: "ADD_TODO",
          payload: datasets,
        };
      };
      const createPost = (datasets) => {
        dispatch(addPost(datasets));
      };
    
      const createItem = (datasets) => {
        dispatch(addPost(datasets));
      };
    return(
    <Formik
    initialValues={{ title: '', price: '', description: '' }}
    validationSchema={validationSchema} 
    onSubmit={(values) => {
        
        fetch('https://fakestoreapi.com/products', {
          method: "POST",
          body: JSON.stringify({
            title: values.title,
            price: values.price,
            description: values.description,
            image: 'https://i.pravatar.cc',
            category: 'electronic'
          })
        })
          .then(res => res.json())
          .then(json => {
            values.id = json?.id
            createItem(values);
            navigation.navigate('Home');
            console.log('res', json);
          });
      }}
  >
    {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
      <View style={{ backgroundColor:'#e7faf6',flex:1, alignItems:'center', paddingTop:20, }}>
        <Text>Додати товар</Text>
        <TextInput
          style={{backgroundColor:'white', width:300, borderWidth:0.2, margin:2}}
          onChangeText={handleChange('title')}
          onBlur={handleBlur('title')}
          value={values.title}
          placeholder="Назва товару:"
        />
        {touched.title && errors.title && (
          <Text style={{ color: 'red' }}>{errors.title}</Text>
        )}

        <TextInput
          style={{backgroundColor:'white', width:300, borderWidth:0.2, margin:2}}
          onChangeText={handleChange('price')}
          onBlur={handleBlur('price')}
          value={values.price}
          placeholder="Ціна товару:"
          keyboardType="numeric"
        />
        {touched.price && errors.price && (
          <Text style={{ color: 'red' }}>{errors.price}</Text>
        )}

        <TextInput
          style={{backgroundColor:'white', width:300, borderWidth:0.2, margin:2}}
          onChangeText={handleChange('description')}
          onBlur={handleBlur('description')}
          value={values.description}
          placeholder="Опис товару:"
          multiline
        />
        {touched.description && errors.description && (
          <Text style={{ color: 'red' }}>{errors.description}</Text>
        )}

        <Button onPress={handleSubmit} title="Submit" />
      </View>
    )}
  </Formik>)
}

export default FormCommponent