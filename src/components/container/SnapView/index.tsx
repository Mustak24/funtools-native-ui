import { ThemeView } from '@core';
import React, {useEffect, useImperativeHandle, useRef, useState} from 'react';
import {
    FlatList,
    FlatListProps,
    NativeScrollEvent,
    NativeSyntheticEvent,
    View,
} from 'react-native';

type Direction = 'horizontal' | 'vertical';

export type SnapViewProps<T> = FlatListProps<T> & {
    data: T[];
    renderItem: ({item, index}: {item: T; index: number}) => React.ReactNode;

    width: number;
    height: number;

    direction?: Direction;

    keyExtractor?: (item: T, index: number) => string;
    autoScroll?: boolean;
    interval?: number;
    showDots?: boolean;
    loop?: boolean;
    onScrollIndexChange?: (index: number) => void;
    scrollIndex?: number;
}

export function SnapView<T>({
    data,
    renderItem,
    width,
    height,
    direction = 'horizontal',
    autoScroll = false,
    interval = 3000,
    showDots = false,
    loop = true,
    onScrollIndexChange,
    keyExtractor,
    scrollIndex = 0,
    ...flatListProps
}: SnapViewProps<T>) {
    const flatListRef = useRef<FlatList<T>>(null);
    const timerRef = useRef<any>(null);
    const currentIndex = useRef(scrollIndex);

    const [activeIndex, setActiveIndex] = useState(scrollIndex);

    const stopAutoScroll = () => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
    };

    const scrollTo = (index: number) => {
        flatListRef.current?.scrollToIndex({
            index,
            animated: true,
        });

        currentIndex.current = index;
        setActiveIndex(index);
        onScrollIndexChange?.(index);
    };

    const startAutoScroll = () => {
        if (!autoScroll || data.length <= 1) return;

        stopAutoScroll();

        timerRef.current = setInterval(() => {
            let nextIndex = currentIndex.current + 1;

            if (nextIndex >= data.length) {
                if (loop) {
                    nextIndex = 0;
                } else {
                    stopAutoScroll();
                    return;
                }
            }

            scrollTo(nextIndex);
        }, interval);
    };

    const onMomentumScrollEnd = (
        event: NativeSyntheticEvent<NativeScrollEvent>,
    ) => {
        const offset =
        direction === 'horizontal'
        ? event.nativeEvent.contentOffset.x
        : event.nativeEvent.contentOffset.y;
        
        const size = direction === 'horizontal' ? width : height;
        
        const index = Math.round(offset / size);
        
        currentIndex.current = index;
        setActiveIndex(index);
        onScrollIndexChange?.(index);
    };


    useEffect(() => {
        startAutoScroll();
        return stopAutoScroll;
    }, []);

    useEffect(() => {
        scrollTo(scrollIndex);
    }, [scrollIndex])
    
    return (
        <View style={{width, height}}>
            <FlatList
                {...flatListProps}
                ref={flatListRef}
                data={data}
                horizontal={direction === 'horizontal'}
                pagingEnabled
                keyExtractor={keyExtractor ?? ((_, index) => index.toString())}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                bounces={false}
                renderItem={({item, index}) => (
                    <View style={{width, height}}>
                        {renderItem({item, index})}
                    </View>
                )}
                onMomentumScrollEnd={onMomentumScrollEnd}
                onTouchStart={stopAutoScroll}
                onTouchEnd={startAutoScroll}
                getItemLayout={(_, index) => ({
                    length: direction === 'horizontal' ? width : height,
                    offset:
                        (direction === 'horizontal' ? width : height) * index,
                    index,
                })}
            />

            {showDots && (
                <View
                    style={
                        direction === 'horizontal' ? { 
                            position: 'absolute',
                            bottom: 12,
                            alignSelf: 'center',
                            flexDirection: 'row'
                        } : {
                            position: 'absolute',
                            right: 12,
                            top: '50%',
                            transform: [{translateY: '-50%'}]
                        }
                    }
                >
                    {data.map((_, index) => (
                        <ThemeView
                            key={index}
                            color={activeIndex === index ? 'primary' : 'text-secondary'}
                            style={{margin: 4, height: 8, width: 8, borderRadius: 8}}
                        />
                    ))}
                </View>
            )}
        </View>
    );
}
