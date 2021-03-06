import {
  StyleProp,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
} from 'react-native';
import React, {ComponentType, forwardRef, ReactElement, Ref} from 'react';
import {getStyle, getSymbols} from './utils';
import useFocusState from './useFocusState';

import styles from './CodeField.styles';

type Props = {
  rootStyle?: StyleProp<any>;
  textInputStyle?: StyleProp<TextStyle>;
  RootProps?: {};
  RootComponent?: ComponentType<any>;

  cellCount?: number;
  renderCell: (options: {
    symbol: string;
    index: number;
    isFocused: boolean;
  }) => ReactElement<any, any>;
} & Omit<TextInputProps, 'style'>;

const DEFAULT_CELL_COUNT = 4;

const CodeField = (
  {
    rootStyle,
    textInputStyle,
    onBlur,
    onFocus,
    value,
    renderCell,
    cellCount = DEFAULT_CELL_COUNT,
    RootProps = {},
    RootComponent = View,
    ...rest
  }: Props,
  ref: Ref<TextInput>,
) => {
  const [isFocused, handleOnBlur, handleOnFocus] = useFocusState({
    onBlur,
    onFocus,
  });
  const cells = getSymbols(value || '', cellCount).map(
    (symbol, index, symbols) => {
      const isFirstEmptySymbol = symbols.indexOf('') === index;

      return renderCell({
        index,
        symbol,
        isFocused: isFocused && isFirstEmptySymbol,
      });
    },
  );
  const onKeyPress=props.onKeyPress?props.onKeyPress:null;
  return (
    <RootComponent {...RootProps} style={getStyle(styles.root, rootStyle)}>
      {cells}
      <TextInput
        caretHidden
        disableFullscreenUI
        spellCheck={false}
        autoCorrect={false}
        blurOnSubmit={false}
        clearButtonMode="never"
        autoCapitalize="characters"
        underlineColorAndroid="transparent"
        maxLength={cellCount}
        {...rest}
        value={value}
        onBlur={handleOnBlur}
        onFocus={handleOnFocus}
        style={getStyle(styles.textInput, textInputStyle)}
        ref={ref}
        onKeyPress={onKeyPress}
      />
    </RootComponent>
  );
};

export default forwardRef(CodeField);
