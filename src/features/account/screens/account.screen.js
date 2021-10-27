import React, { useRef, useEffect } from 'react';
import LottieView from 'lottie-react-native';
import { TouchableOpacity } from 'react-native';
import { Spacer } from '../../../components/spacer.component';
import {
  AccountBackground,
  AccountCover,
  AccountContainer,
  AuthButton,
  AnimationWrapper,
} from '../components/account.styles';
import * as Animatable from 'react-native-animatable';

import styled from 'styled-components/native';

const AnimatableWrapper = styled(Animatable.Text)`
  border: solid 1px red;
  background-color: blue;
  color: white;
  text-align: center;
`;

export const AccountScreen = ({ navigation }) => {
  const animaRef1 = useRef(null);
  const animaRef2 = useRef(null);

  const startAnimation = () => {
    animaRef2.current.animate(animationObj);
  };

  const animationObj = {
    0: {
      opacity: 1,
      scale: 1,
    },
    0.5: {
      opacity: 1,
      scale: 0.3,
    },
    1: {
      opacity: 1,
      scale: 10,
    },
  };

  const animationObj2 = {
    0: {
      scale: 10,
      backgroundColor: 'red',
    },
    1: {
      scale: 1,
      backgroundColor: 'yellow',
    },
    duration: 600,
  };

  useEffect(() => {
    console.log(animaRef1.current);

    setTimeout(() => {
      animaRef1.current.animate(animationObj, 300);
    }, 2000);
    setTimeout(() => {
      animaRef1.current.animate(animationObj2, 300);
    }, 4000);
  }, [animaRef1]);

  return (
    <AccountBackground>
      <AccountCover />
      <AnimationWrapper>
        {/* <LottieView
          autoPlay
          loop
          resizeMode="cover"
          source={require('../../../../assets/watermelon.json')}
        /> */}
      </AnimationWrapper>
      <AccountContainer>
        <AuthButton onPress={() => navigation.navigate('Login')}>
          Login
        </AuthButton>
        <Spacer size="large" />
        <AuthButton onPress={() => navigation.navigate('Register')}>
          Register
        </AuthButton>
      </AccountContainer>
      <AnimatableWrapper animation="bounceInLeft">
        Zoom me up, Scotty
      </AnimatableWrapper>
      {/* 點擊觸發範例 */}
      <TouchableOpacity onPress={() => startAnimation()}>
        <Animatable.Text ref={animaRef2}>Bounce me!</Animatable.Text>
      </TouchableOpacity>

      {/* 自定義時間觸發範例 */}
      <Animatable.Text ref={animaRef1}>Bounce me!</Animatable.Text>

      {/* 直接觸發範例 */}
      <Animatable.Text
        animation="slideInDown"
        iterationCount={5}
        direction="alternate"
      >
        Up and down you go
      </Animatable.Text>

      <Animatable.Text
        animation="pulse"
        easing="ease-out"
        iterationCount="infinite"
        style={{ textAlign: 'center' }}
      >
        ❤️
      </Animatable.Text>
    </AccountBackground>
  );
};
