import {
  View,
  Text,
  StyleSheet,
  type StyleProp,
  type ViewStyle,
  Animated,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { SHADOW } from '../../styles/shadow';
import { LayoutAnimation } from 'react-native';
import type { TextStyle } from 'react-native';

export interface AccordionProps {
  elevation?: 0 | 1 | 2 | 3 | 4;
  style?: StyleProp<ViewStyle>;
  headerStyle?: StyleProp<ViewStyle>;
  activeOpacity?: number | undefined;
  customHeader?: (expanded: boolean) => JSX.Element;
  customHeaderIcon?: (expanded: boolean) => JSX.Element;
  children: JSX.Element;
  title?: String;
  initialState?: boolean;
  animationTiming?: number;
  titleStyle?: StyleProp<TextStyle>;
}

export function Accordion({
  activeOpacity = 1,
  elevation = 2,
  style,
  customHeader,
  headerStyle,
  customHeaderIcon,
  title,
  initialState = false,
  animationTiming = 300,
  titleStyle,
  children,
}: AccordionProps) {
  const [isExpanded, setIsExpanded] = React.useState(initialState);
  const expandedAnimation = React.useRef(new Animated.Value(0)).current;
  const shadow = SHADOW[elevation];

  const toggle = () => {
    setIsExpanded(!isExpanded);
    Animated.timing(expandedAnimation, {
      toValue: isExpanded ? 0 : 1,
      duration: animationTiming,
      useNativeDriver: true,
    }).start();
    LayoutAnimation.configureNext({
      duration: animationTiming,
      update: {
        duration: animationTiming,
        property: LayoutAnimation.Properties.opacity,
        type: LayoutAnimation.Types.easeInEaseOut,
      },
      delete: {
        duration: animationTiming,
        property: LayoutAnimation.Properties.opacity,
        type: LayoutAnimation.Types.easeInEaseOut,
      },
    });
  };
  return (
    <View style={[styles.container, shadow, style]}>
      <TouchableOpacity activeOpacity={activeOpacity} onPress={toggle}>
        {customHeader ? (
          customHeader(isExpanded)
        ) : (
          <View style={[styles.header, headerStyle]}>
            <Text style={titleStyle}>{title}</Text>
            {customHeaderIcon ? (
              customHeaderIcon(isExpanded)
            ) : (
              <Text>{isExpanded ? '-' : '+'}</Text>
            )}
          </View>
        )}
      </TouchableOpacity>
      <View>{isExpanded && children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 4,
    padding: 12,
    backgroundColor: '#FAFAFA',
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
