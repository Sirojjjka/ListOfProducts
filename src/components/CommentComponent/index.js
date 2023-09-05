import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Image, TouchableOpacity, StatusBar } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from 'reselect';
import { useNavigation } from '@react-navigation/native';

const getPosts = (state) => state.posts;



function CommentComponent({ route }) {
  const postId = route.params;
  const dispatch = useDispatch();
  const navigation = useNavigation()
  const [newCommentText, setNewCommentText] = useState('');
  const [editedComment, setEditedComment] = useState({ id: null, text: '' });
  const comments = useSelector((state) => state.posts);
  const selectedPost = comments.find((post) => post.id === postId);
  console.log('eee',comments)

  const handleAddComment = () => {
    const newComment = { id: Math.random(), text: newCommentText };
    dispatch({ type: 'ADD_COMMENT', payload: { postId, comment: newComment } });
    setNewCommentText('')
  };

  const handleRemoveComment = (id) => {
    dispatch({ type: 'REMOVE_COMMENT', payload: { postId, commentId: id } });
  };

  const handleEditComment = (id) => {
    const commentToEdit = selectedPost.comments.find((comment) => comment.id === id);
    setEditedComment({ id, text: commentToEdit.text });
  };
  const handleSaveComment = () => {
    dispatch({ type: 'EDIT_COMMENT', payload: { postId, commentId: editedComment.id, editedText: editedComment.text } });
    setEditedComment({ id: null, text: '' });
  };

  const handleCancelEdit = () => {
    setEditedComment({ id: null, text: '' });
  };
  const Item = ({title,description}) => {
    return(
        <>
        <Text>{title}</Text>
        <Text>{description}</Text>
        </>
    )
  }

  return (
    <View style={{margin:5, backgroundColor:'#e7faf6', flex:1}}>
        <View elevation={5} style={{backgroundColor:'#fff',borderWidth:0.2,borderColor:'green',padding:5,margin:5}}>
        <View  style={{flexDirection:'row',backgroundColor:'#fff'}}>
        <View>
        <Image style={{width:150, height:150}} src={selectedPost?.image}/>
        </View>

        <View style={{width:150, marginLeft:50}}>
        <Text style={{fontSize:13,fontWeight:600, color:'black'}}>{selectedPost?.title}</Text>
        <Text style={{color:'red',padding:3}}>${selectedPost?.price}</Text>
        <TouchableOpacity style={{backgroundColor:'green', width:75, height:30, justifyContent:'center',alignItems:'center', borderRadius:6}} ><Text style={{color:'white'}}>Buy</Text></TouchableOpacity>
        </View>
        </View>
        
        <View style={{marginTop:5,padding:5}}>
        <Text>{selectedPost?.description}</Text>
        </View>
        </View>

        <TouchableOpacity onPress={()=>navigation.goBack()} style={{backgroundColor:'#dac741', width:75, height:30, justifyContent:'center',alignItems:'center', borderRadius:6, margin:5}}>
        <Text style={{color:'white'}}>Back</Text>
        </TouchableOpacity>
    </View>
  );
}

export default CommentComponent;
