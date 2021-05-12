/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';

import {Button as ButtonComponent, ButtonProps} from 'react-native-elements';

interface ButtonComponentProps extends ButtonProps {
  fullWidth?: boolean;
  height?: number;
  shadowStyle?: any;
}

export function Button({
  fullWidth,
  height,
  shadowStyle,
  ...rest
}: ButtonComponentProps) {
  return (
    <ButtonComponent
      containerStyle={{
        width: fullWidth ? '100%' : 'auto',
        ...shadowStyle,
      }}
      {...rest}
    />
  );
}
