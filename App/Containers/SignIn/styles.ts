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

  align-items: center;
  justify-content: space-between;
`;

export const FormSignin = styled.View`
  width: 100%;
  height: ${`${String((Dimensions.get('screen').height / 4) * 3)}px`};
`;

export const ButtonContainer = styled.View`
  width: 100%;
  align-items: center;
  padding: 0 40px;

  margin-bottom: ${`${String(Dimensions.get('screen').height / 4)}px`};
`;
