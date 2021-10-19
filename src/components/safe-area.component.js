import { SafeAreaView } from 'react-native';
import styled from 'styled-components/native';

// NOTE: 若已經使用 react-navigation 的 NavigationContainer, 就可不用另外計算高度, NavigationContainer 會自動會產生 header 區域
// const statusBarHeight = StatusBar?.currentHeight ? StatusBar.currentHeight : 0;

// export const SafeArea = styled(SafeAreaView)`
//   flex: 1;
//   margin-top: ${statusBarHeight}px;
// `;

export const SafeArea = styled(SafeAreaView)`
  flex: 1;
`;
