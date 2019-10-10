import styled from "styled-components/native";

export const Container = styled.View`
  background: #fff;
  height: 50%;
  width: 100%;
  position: absolute;
  shadow-color: #000;
  shadow-offset: 0 0;
  shadow-opacity: 0.2;
  shadow-radius: 10;
  elevation: 3;
  border: 1px solid #ddd;
  align-items: center;
  margin-top: 50%;
  padding: 20px;
  
`;

export const TypeTitle = styled.Text`
  font-size: 20px;
  color: #222;
`;

export const TypeDescription = styled.Text`
  color: #666;
  font-size: 14px;
  placeholv
`;

export const TypeImage = styled.Image`
  height: 64px;
  width: 64px;
  margin: 10px 0;
`;

export const RequestButton = styled.TouchableOpacity`
  background: #28983C;
  justify-content: center;
  align-items: center;
  height: 44px;
  align-self: stretch;
  margin-top: 10%;
`;

export const RequestButtonText = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 10px;
`;