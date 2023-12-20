import {
  View,
  FlatList,
  type FlatListProps,
  type NativeSyntheticEvent,
  type NativeScrollEvent,
} from 'react-native';
import React, { useEffect } from 'react';
import { Dimensions } from 'react-native';

interface SlideProps
  extends Omit<
    FlatListProps<any>,
    | 'horizontal'
    | 'showsHorizontalScrollIndicator'
    | 'ref'
    | 'pagingEnabled'
    | 'getItemLayout'
    | 'onScroll'
  > {
  length: number;
  autoPlay?: boolean;
  timeInterval?: number;
}

export function Slide({
  length,
  autoPlay = false,
  timeInterval = 3000,
  ...restProps
}: SlideProps) {
  const refCarousel = React.useRef<FlatList<any[]> | null>();
  const [activeIndex, setActiveIndex] = React.useState(0);
  const screenWidth = Dimensions.get('screen').width;

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const position = event.nativeEvent.contentOffset.x;
    const index = position / screenWidth;
    if (index % 1 === 0) {
      setActiveIndex(index);
    }
  };
  const getItemLayout = (
    _: ArrayLike<any> | null | undefined,
    index: number
  ) => {
    return {
      length: screenWidth,
      offset: screenWidth * index,
      index,
    };
  };

  useEffect(() => {
    let setIntervalSlide: NodeJS.Timeout | number = 0;
    clearTimeout(setIntervalSlide);
    if (autoPlay) {
      if (length > 1) {
        setIntervalSlide = setTimeout(() => {
          if (activeIndex >= length - 1) {
            refCarousel?.current?.scrollToIndex({
              index: 0,
              animated: true,
            });
          } else {
            refCarousel.current?.scrollToIndex({
              index: activeIndex + 1,
              animated: true,
            });
          }
        }, timeInterval);
      }
    }
    return () => {
      clearTimeout(setIntervalSlide);
    };
  }, [activeIndex, length, autoPlay, timeInterval]);

  return (
    <View>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator
        pagingEnabled
        getItemLayout={getItemLayout}
        onScroll={handleScroll}
        ref={(ref) => {
          refCarousel.current = ref;
        }}
        {...restProps}
      />
    </View>
  );
}
