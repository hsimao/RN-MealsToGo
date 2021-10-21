import React from 'react';
import { Platform } from 'react-native';

const isWeb = Platform.OS === 'web';

export const SvgWrapper = ({ width, height, Svg }) => {
  return isWeb ? (
    <img src={Svg} width={width} height={height} />
  ) : (
    <Svg width={width} height={height} />
  );
};
