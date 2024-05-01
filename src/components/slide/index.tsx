import {
  View,
  FlatList,
  type FlatListProps,
  type NativeSyntheticEvent,
  type NativeScrollEvent,
} from 'react-native';
import React, { useEffect } from 'react';
import { Dimensions } from 'react-native';

interface SlideProps<T>
  extends Omit<
    FlatListProps<T>,
    | 'horizontal'
    | 'showsHorizontalScrollIndicator'
    | 'ref'
    | 'pagingEnabled'
    | 'getItemLayout'
    | 'onScroll'
    | 'data'
  > {
  data: T[];
  autoPlay?: boolean;
  timeInterval?: number;
  width?: number;
}

export function Slide<T>({
  data,
  autoPlay = false,
  timeInterval = 3000,
  width = Dimensions.get('screen').width,
  ...restProps
}: SlideProps<T[]>) {
  const refCarousel = React.useRef<FlatList<T[]> | null>();
  const [activeIndex, setActiveIndex] = React.useState(0);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const position = event.nativeEvent.contentOffset.x;
    const index = position / width;
    if (index % 1 === 0) {
      setActiveIndex(index);
    }
  };
  const getItemLayout = (_: any, index: number) => {
    return {
      length: width,
      offset: width * index,
      index,
    };
  };

  useEffect(() => {
    let setIntervalSlide: NodeJS.Timeout | number = 0;
    clearTimeout(setIntervalSlide);
    if (autoPlay) {
      if (data.length > 1) {
        setIntervalSlide = setTimeout(() => {
          if (activeIndex >= data.length - 1) {
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
  }, [activeIndex, autoPlay, data.length, timeInterval]);

  return (
    <View style={{ width }}>
      <FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
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
