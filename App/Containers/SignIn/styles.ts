import {Dimensions} from 'react-native';
import styled from 'styled-components/native';
import colors from '../../Theme/colors';

export const SafeAreaView = styled.SafeAreaView`
  flex: 1;
  background: ${colors.primary};
`;

export const Container = styled.View`
  flex: 1;
  width: 100%;
  padding: 0 40px;

  align-items: center;
  justify-content: space-between;
`;

export const ButtonContainer = styled.View`
  width: 100%;
  align-items: center;

  margin-bottom: ${`${String(Dimensions.get('screen').height / 4)}px`};
`;

export const Logo = styled.Image`
  width: 120px;
  height: 120px;

  margin-top: ${`${String(Dimensions.get('screen').height / 4)}px`};
`;
