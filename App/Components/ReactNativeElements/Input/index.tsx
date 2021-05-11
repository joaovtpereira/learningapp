/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {KeyboardTypeOptions} from 'react-native';

import {Input as InputElement, InputProps} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';

interface InputPropsComponent extends InputProps {
  placeholder?: string;
  securityField?: boolean;
  label?: string;
  keyboardType?: KeyboardTypeOptions;
  leftIcon?:
    | {
        type: string;
        name: string;
      }
    | React.ReactNode;
  righIcon?:
    | {
        type: string;
        name: string;
      }
    | React.ReactNode;
}

function Input({
  placeholder,
  label,
  securityField,
  keyboardType = 'default',
  leftIcon,
  ...rest
}: InputPropsComponent) {
  const [enableSecurityText, setEnableSecurityText] = useState(true);

  function handleEnableSecurityText() {
    setEnableSecurityText(!enableSecurityText);
  }

  return securityField ? (
    <InputElement
      placeholder={placeholder}
      label={label}
      keyboardType={keyboardType}
      secureTextEntry={enableSecurityText}
      leftIcon={{type: 'ionicon', name: 'key-outline'}}
      rightIcon={
        <Icon
          name={enableSecurityText ? 'ios-eye-outline' : 'ios-eye-off-outline'}
          onPress={handleEnableSecurityText}
          size={24}
        />
      }
      {...rest}
    />
  ) : (
    <InputElement
      placeholder={placeholder}
      label={label}
      keyboardType={keyboardType}
      leftIcon={leftIcon}
      {...rest}
    />
  );
}

export default Input;
