import React, { useContext, useCallback, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { useFocusEffect } from '@react-navigation/native';
import { List, Avatar } from 'react-native-paper';
import { Text } from '../../../components/text.component';
import { Spacer } from '../../../components/spacer.component';
import { SafeArea } from '../../../components/safe-area.component';
import { AuthContext } from '../../../services/auth/auth.context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingsItem = styled(List.Item)`
  padding: ${props => props.theme.space[3]};
`;

const AvatarContainer = styled.View`
  align-items: center;
`;

export const SettingsScreen = ({ navigation }) => {
  const { onLogout, user } = useContext(AuthContext);
  const [photo, setPhoto] = useState(null);

  const getProfilePicture = async currentUser => {
    const photoUri = await AsyncStorage.getItem(`${currentUser.uid}-photo`);
    setPhoto(photoUri);
  };

  // NOTE: 使用 useFocusEffect, 可在每次導航改變時觸發
  useFocusEffect(
    useCallback(() => {
      getProfilePicture(user);
    }, [user])
  );

  return (
    <SafeArea>
      <AvatarContainer>
        <TouchableOpacity onPress={() => navigation.navigate('Camera')}>
          {!photo && (
            <Avatar.Icon size={100} icon="human" backgroundColor="#2182BD" />
          )}
          {photo && (
            <Avatar.Image
              size={100}
              source={{ uri: photo }}
              backgroundColor="#2182BD"
            />
          )}
        </TouchableOpacity>
        <Spacer position="top" size="large">
          <Text variant="label">{user.email}</Text>
        </Spacer>
      </AvatarContainer>
      <List.Section>
        <SettingsItem
          title="Favourites"
          description="View your favourites"
          left={props => <List.Icon {...props} color="black" icon="heart" />}
          onPress={() => navigation.navigate('Favourites')}
        />
        <SettingsItem
          title="Logout"
          left={props => <List.Icon {...props} color="black" icon="door" />}
          onPress={onLogout}
        />
      </List.Section>
    </SafeArea>
  );
};
