import * as RNW from 'react-native-web';
import React, { useRef } from 'react';

// Helper to sanitize React Native style objects for Web/DOM compatibility
function sanitizeStyle(style) {
  if (!style) return style;
  if (Array.isArray(style)) {
    const flat = RNW.StyleSheet.flatten(style);
    return sanitizeStyle(flat);
  }
  if (typeof style === 'object') {
    const cleaned = { ...style };
    if ('paddingInline' in cleaned) {
      cleaned.paddingHorizontal = cleaned.paddingHorizontal ?? cleaned.paddingInline;
      delete cleaned.paddingInline;
    }
    if ('marginInline' in cleaned) {
      cleaned.marginHorizontal = cleaned.marginHorizontal ?? cleaned.marginInline;
      delete cleaned.marginInline;
    }
    return cleaned;
  }
  return style;
}

// Wrapped components with style sanitization
const OriginalView = RNW.View;
export const View = React.forwardRef((props, ref) => {
  const { style, ...rest } = props;
  return React.createElement(OriginalView, {
    ...rest,
    ref,
    style: sanitizeStyle(style),
  });
});

const OriginalText = RNW.Text;
export const Text = React.forwardRef((props, ref) => {
  const { style, ...rest } = props;
  return React.createElement(OriginalText, {
    ...rest,
    ref,
    style: sanitizeStyle(style),
  });
});

const OriginalPressable = RNW.Pressable;
export const Pressable = React.forwardRef((props, ref) => {
  const { style, ...rest } = props;
  const computedStyle =
    typeof style === 'function'
      ? (state) => sanitizeStyle(style(state))
      : sanitizeStyle(style);
  return React.createElement(OriginalPressable, {
    ...rest,
    ref,
    style: computedStyle,
  });
});

const OriginalAnimatedView = RNW.Animated.View;
const AnimatedView = React.forwardRef((props, ref) => {
  const { style, ...rest } = props;
  return React.createElement(OriginalAnimatedView, {
    ...rest,
    ref,
    style: sanitizeStyle(style),
  });
});

const OriginalAnimatedText = RNW.Animated.Text;
const AnimatedText = React.forwardRef((props, ref) => {
  const { style, ...rest } = props;
  return React.createElement(OriginalAnimatedText, {
    ...rest,
    ref,
    style: sanitizeStyle(style),
  });
});

export const Animated = {
  ...RNW.Animated,
  View: AnimatedView,
  Text: AnimatedText,
  createAnimatedComponent: (Component) => {
    const OriginalComponent = RNW.Animated.createAnimatedComponent(Component);
    return React.forwardRef((props, ref) => {
      const { style, ...rest } = props;
      return React.createElement(OriginalComponent, {
        ...rest,
        ref,
        style: sanitizeStyle(style),
      });
    });
  },
};

export const useAnimatedValue = (initialValue) => {
  const ref = useRef(null);
  if (ref.current === null) {
    ref.current = new RNW.Animated.Value(initialValue);
  }
  return ref.current;
};

export const PermissionsAndroid = {
  PERMISSIONS: {},
  RESULTS: { GRANTED: 'granted', DENIED: 'denied', NEVER_ASK_AGAIN: 'never_ask_again' },
  request: async () => 'granted',
  check: async () => true,
  requestMultiple: async () => ({}),
};

// Re-export all other RNW exports except the ones we patched
const {
  View: _v,
  Text: _t,
  Pressable: _p,
  Animated: _a,
  ...otherRNW
} = RNW;

export const {
  AccessibilityInfo,
  ActivityIndicator,
  Alert,
  AppRegistry,
  AppState,
  Appearance,
  BackHandler,
  Button,
  CheckBox,
  Clipboard,
  DeviceEventEmitter,
  Dimensions,
  Easing,
  FlatList,
  I18nManager,
  Image,
  ImageBackground,
  InteractionManager,
  Keyboard,
  KeyboardAvoidingView,
  LayoutAnimation,
  Linking,
  LogBox,
  Modal,
  NativeEventEmitter,
  NativeModules,
  PanResponder,
  Picker,
  PixelRatio,
  Platform,
  ProgressBar,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  SectionList,
  Share,
  StatusBar,
  StyleSheet,
  Switch,
  TextInput,
  Touchable,
  TouchableHighlight,
  TouchableNativeFeedback,
  TouchableOpacity,
  TouchableWithoutFeedback,
  UIManager,
  Vibration,
  VirtualizedList,
  YellowBox,
  findNodeHandle,
  processColor,
  render,
  unmountComponentAtNode,
  unstable_createElement,
  useColorScheme,
  useLocaleContext,
  useWindowDimensions,
} = otherRNW;

export default {
  ...otherRNW,
  View,
  Text,
  Pressable,
  Animated,
  useAnimatedValue,
  PermissionsAndroid,
};
