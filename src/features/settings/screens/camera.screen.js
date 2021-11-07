import React, { useState, useEffect, useRef, useContext } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { Text } from '../../../components/text.component';
import { Spacer } from '../../../components/spacer.component';
import { colors } from '../../../infrastructure/theme/colors';
import styled from 'styled-components/native';
import { Camera } from 'expo-camera';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../../../services/auth/auth.context';

const ProfileCamera = styled(Camera).attrs({
  ratio: '16:9',
})`
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

export const CameraScreen = ({ navigation }) => {
  const cameraRef = useRef();
  const { user } = useContext(AuthContext);

  const [type, setType] = useState(Camera.Constants.Type.front);
  const toggleType = () => {
    setType(
      type === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  const [hasPermission, setHasPermission] = useState(null);
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleTakePicture = async () => {
    if (cameraRef) {
      const photo = await cameraRef.current.takePictureAsync();
      AsyncStorage.setItem(`${user.uid}-photo`, photo.uri);
      navigation.goBack();
    }
  };

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
          icon={() => (
            <MaterialIcons name="flip-camera-android" size={16} color="white" />
          )}
          mode="contained"
          onPress={toggleType}
        >
          Flip
        </CameraButton>
        <Spacer position="left" size="large" />
        <CameraButton
          icon="camera-outline"
          mode="contained"
          onPress={handleTakePicture}
        >
          TakePicture
        </CameraButton>
      </CameraButtonContainer>
    </ProfileCamera>
  );
};
