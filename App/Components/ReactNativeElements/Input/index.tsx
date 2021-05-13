/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useState} from 'react';

import {KeyboardTypeOptions} from 'react-native';
import {Input as InputElement, InputProps} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';

import colors from '../../../Theme/colors';

interface InputPropsComponent extends InputProps {
  placeholder?: string;
  securityField?: boolean;
  label?: string;
  focus?: boolean;
  iconColor?: string;
  keyboardType?: KeyboardTypeOptions;
  leftIcon?: {
    type: string;
    name: string;
  };
  righIcon?: {
    type: string;
    name: string;
  };
}

const Input = React.forwardRef(
  (
    {
      placeholder,
      label,
      securityField,
      keyboardType = 'default',
      focus,
      iconColor,
      leftIcon,
      ...rest
    }: InputPropsComponent,
    ref: any,
  ) => {
    const [enableSecurityText, setEnableSecurityText] = useState(true);

    function handleEnableSecurityText() {
      setEnableSecurityText(!enableSecurityText);
    }

    return securityField ? (
      <InputElement
        ref={ref}
        placeholder={placeholder}
        label={label}
        keyboardType={keyboardType}
        secureTextEntry={enableSecurityText}
        inputContainerStyle={{
          borderBottomColor: focus
            ? iconColor ?? colors.primary
            : colors.input_color,
        }}
        labelStyle={{
          color: focus ? iconColor ?? colors.primary : colors.input_color,
        }}
        placeholderTextColor={
          focus ? iconColor ?? colors.primary : colors.input_color
        }
        leftIcon={{
          type: 'ionicon',
          name: 'key-outline',
          color: focus ? iconColor ?? colors.primary : colors.input_color,
        }}
        rightIcon={
          <Icon
            name={
              enableSecurityText ? 'ios-eye-outline' : 'ios-eye-off-outline'
            }
            color={focus ? iconColor ?? colors.primary : colors.input_color}
            onPress={handleEnableSecurityText}
            size={24}
          />
        }
        {...rest}
      />
    ) : (
      <InputElement
        ref={ref}
        placeholder={placeholder}
        label={label}
        keyboardType={keyboardType}
        leftIcon={{
          color: focus ? iconColor ?? colors.primary : colors.input_color,
          ...leftIcon,
        }}
        inputContainerStyle={{
          borderBottomColor: focus
            ? iconColor ?? colors.primary
            : colors.input_color,
        }}
        labelStyle={{
          color: focus ? iconColor ?? colors.primary : colors.input_color,
        }}
        placeholderTextColor={
          focus ? iconColor ?? colors.primary : colors.input_color
        }
        {...rest}
      />
    );
  },
);

export default Input;
