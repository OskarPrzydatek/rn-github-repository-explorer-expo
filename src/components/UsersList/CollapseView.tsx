import React, { ReactNode, useState } from 'react';
import { LayoutChangeEvent, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { collapseStyles } from '@/components/UsersList/CollapseView.styles';

interface ICollapseView {
  expanded: boolean;
  children: ReactNode;
}

export const CollapseView = ({ expanded, children }: ICollapseView) => {
  const animatedHeight = useSharedValue(0);
  const [height, setHeight] = useState(0);

  const onLayout = (event: LayoutChangeEvent) => {
    const layoutHeight = event.nativeEvent.layout.height;

    if (layoutHeight > 0 && height !== layoutHeight) {
      setHeight(layoutHeight);
    }
  };

  const collapsableAnimatedStyle = useAnimatedStyle(() => {
    animatedHeight.value = expanded ? withTiming(height) : withTiming(0);

    return {
      height: animatedHeight.value,
    };
  }, [expanded, height]);

  return (
    <Animated.View style={[collapsableAnimatedStyle, collapseStyles.collapse]}>
      <View style={collapseStyles.contentWrapper} onLayout={onLayout}>
        {children}
      </View>
    </Animated.View>
  );
};
