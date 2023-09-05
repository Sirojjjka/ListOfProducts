import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Image, TouchableOpacity, StatusBar } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from 'reselect';
import { useNavigation } from '@react-navigation/native';
import {
    Container,
    Card,
    Row,
    ProductImage,
    ProductDetails,
    ProductTitle,
    ProductPrice,
    BuyButton,
    BuyButtonText,
    Description,
    BackButton,
    BackButtonText,
  } from "./styles";

const getPosts = (state) => state.posts;



function CommentComponent({ route }) {
  const postId = route.params;
  const dispatch = useDispatch();
  const navigation = useNavigation()
  const [newCommentText, setNewCommentText] = useState('');
  const [editedComment, setEditedComment] = useState({ id: null, text: '' });
  const comments = useSelector((state) => state.posts);
  const selectedPost = comments.find((post) => post.id === postId);

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
    <Container>
      <Card>
        <Row>
          <ProductImage source={{ uri: selectedPost?.image }} />
          <ProductDetails>
            <ProductTitle>{selectedPost?.title}</ProductTitle>
            <ProductPrice>${selectedPost?.price}</ProductPrice>
            <BuyButton>
              <BuyButtonText>Buy</BuyButtonText>
            </BuyButton>
          </ProductDetails>
        </Row>
        <Description>{selectedPost?.description}</Description>
      </Card>
      <BackButton onPress={() => navigation.goBack()}>
        <BackButtonText>Back</BackButtonText>
      </BackButton>
    </Container>
  );
}

export default CommentComponent;