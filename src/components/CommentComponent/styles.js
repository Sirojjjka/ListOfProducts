import styled from "styled-components/native";
import { Image, Text, TouchableOpacity, View } from "react-native";

export const Container = styled.View`
  margin: 5px;
  background-color: #e7faf6;
  flex: 1;
`;

export const Card = styled.View`
  elevation: 5;
  background-color: #fff;
  border-width: 0.2px;
  border-color: green;
  padding: 5px;
  margin: 5px;
`;

export const Row = styled.View`
  flex-direction: row;
  background-color: #fff;
`;

export const ProductImage = styled(Image)`
  width: 150px;
  height: 150px;
`;

export const ProductDetails = styled.View`
  width: 150px;
  margin-left: 50px;
`;

export const ProductTitle = styled.Text`
  font-size: 13px;
  font-weight: 600;
  color: black;
`;

export const ProductPrice = styled.Text`
  color: red;
  padding: 3px;
`;

export const BuyButton = styled.TouchableOpacity`
  background-color: green;
  width: 75px;
  height: 30px;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
`;

export const BuyButtonText = styled.Text`
  color: white;
`;

export const Description = styled.Text`
  margin-top: 5px;
  padding: 5px;
`;

export const BackButton = styled.TouchableOpacity`
  background-color: #dac741;
  width: 75px;
  height: 30px;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  margin: 5px;
`;

export const BackButtonText = styled.Text`
  color: white;
`;