import styled from 'styled-components';
import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const guidelineBaseWidth = 913;
const guidelineBaseHeight = 410;

export const dw = (size) => (width / guidelineBaseWidth) * size;
export const dh = (size) => (height / guidelineBaseHeight) * size;

export const Container = styled.View`
  background-color: #e7faf6;
  flex: 1;
  justify-content: center;
  align-items: center;
  padding-bottom: ${dw(10)}px;
`;

export const Title = styled.Text`
  font-size: ${dw(17)}px;
  font-weight: 700;
`;

export const LoadingContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;