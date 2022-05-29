import styled from "styled-components/native";

export const Container = styled.View`
  background-color: #141a30;
  flex: 1;
`;

//Header,HeaderButton

export const Header = styled.View`
  z-index: 99;
  position: absolute;
  top: 35px;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 14px;
`;

export const HeaderButton = styled.TouchableOpacity`
  width: 46px;
  height: 46px;
  background-color: rgba(25, 26, 48, 0.8);
  border-radius: 23px;
  justify-content: center;
  align-items: center;
`;

export const Banner = styled.Image`
  width: 100%;
  height: 350px;
  border-bottom-left-radius: 70px;
  border-bottom-right-radius: 70px;
`;

export const ButtonLink = styled.TouchableOpacity`
  background-color: #e72f49;
  border-radius: 32px;
  width: 64px;
  height: 64px;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 300px;
  right: 14px;
  z-index: 99;
`;
export const Title = styled.Text`
  color: #fff;
  font-size: 22px;
  font-weight: bold;
  padding: 8px 14px;
  margin-top: 8px;
`;

export const ContentArea = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 14px;
`;

export const Rate = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #fff;
`;

export const ListGenres = styled.FlatList`
  padding-left: 14px;
  margin: 8px 0;
  max-height: 35px;
  min-height: 31px;
`;

export const Description = styled.Text`
  padding: 0 14px;
  padding-bottom: 30px;
  color: #fff;
  font-size: 16px;
  line-height: 24px;
`;
