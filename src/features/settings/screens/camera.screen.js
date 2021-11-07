import React, { useState, useEffect, useRef } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import { Text } from '../../../components/text.component';
import { colors } from '../../../infrastructure/theme/colors';
import styled from 'styled-components/native';
import { Camera } from 'expo-camera';

const ProfileCamera = styled(Camera)`
  width: 100%;
  height: 100%;
`;

const CameraButtonContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  margin: 20px;
  margin-top: auto;
`;

export const CameraButton = styled(Button).attrs({
  mode: 'contained',
  color: colors.brand.primary,
})`
  padding: ${props => props.theme.space[2]};
`;

export const CameraScreen = () => {
  const cameraRef = useRef();
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.front);

  const toggleType = () => {
    setType(
      type === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <ProfileCamera ref={camera => (cameraRef.current = camera)} type={type}>
      <CameraButtonContainer>
        <CameraButton
          icon="lock-open-outline"
          mode="contained"
          onPress={() => toggleType()}
        >
          Flip
        </CameraButton>
      </CameraButtonContainer>
    </ProfileCamera>
  );
};
