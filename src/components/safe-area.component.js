import { SafeAreaView, StatusBar } from 'react-native';
import styled from 'styled-components/native';

const statusBarHeight = StatusBar?.currentHeight ? StatusBar.currentHeight : 0;

export const SafeArea = styled(SafeAreaView)`
  flex: 1;
  margin-top: ${statusBarHeight}px;
`;
