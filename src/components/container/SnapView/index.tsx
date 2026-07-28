import { ThemeView } from '@core';
import React, {useEffect, useRef, useState} from 'react';
import {
    FlatList,
    NativeScrollEvent,
    NativeSyntheticEvent,
    View,
} from 'react-native';

type Direction = 'horizontal' | 'vertical';

interface SnapViewProps<T> {
    data: T[];
    renderItem: ({item, index}: {item: T; index: number}) => React.ReactNode;

    width: number;
    height: number;

    direction?: Direction;

    autoScroll?: boolean;
    interval?: number;
    showDots?: boolean;
    loop?: boolean;
    initialIndex?: number;
    onIndexChange?: (index: number) => void;
}

export default function SnapView<T>({
    data,
    renderItem,
    width,
    height,
    direction = 'horizontal',
    autoScroll = true,
    interval = 3000,
    showDots = true,
    loop = true,
    initialIndex = 0,
    onIndexChange,
}: SnapViewProps<T>) {
    const flatListRef = useRef<FlatList<T>>(null);
    const timerRef = useRef<any>(null);
    const currentIndex = useRef(initialIndex);

    const [activeIndex, setActiveIndex] = useState(initialIndex);

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
        onIndexChange?.(index);
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

    useEffect(() => {
        if (initialIndex > 0) {
            setTimeout(() => {
                scrollTo(initialIndex);
            }, 100);
        }

        startAutoScroll();

        return stopAutoScroll;
    }, []);

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
        onIndexChange?.(index);
    };

    return (
        <View style={{width, height}}>
            <FlatList
                ref={flatListRef}
                data={data}
                horizontal={direction === 'horizontal'}
                pagingEnabled
                keyExtractor={(_, index) => index.toString()}
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
