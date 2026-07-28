import { Button, ButtonProps, Drawer, IconButton, PressableView, PressableViewProps, Searchbar } from "@components";
import { Show, ThemeText } from "@core";
import { ReactNode, useEffect, useState } from "react";
import { FlatList, View } from "react-native";

export type ItemSelectorProps<ITEM> = {
    data: ITEM[];
    title: string;
    visible: boolean;
    renderItem: (info: { item: ITEM, index: number }) => ReactNode;
    keyExtractor: (item: ITEM) => string;
    
    renderSelectedItem?: (item: ITEM) => ReactNode;
    onClose?: () => void;
    
    selectedItem?: ITEM;
    description?: string;
    onSelectItem?: (item: ITEM) => void;

    hasMoreItems?: boolean;
    onPressLoadMore?: ButtonProps['onPress'];
    onSearch?: (query: string) => void;
    handleQueryFilter?: (query: string, item: ITEM) => boolean;
    itemContainerProps?: PressableViewProps;
    isSelected?: (item: ITEM) => boolean;
}

export function ItemSelector<ITEM = unknown>(props: ItemSelectorProps<ITEM>){
    const {
        data,
        title,
        visible,
        onClose,
        renderItem,
        keyExtractor,
        description,
        selectedItem,
        onSelectItem,
        renderSelectedItem,
        hasMoreItems,
        onPressLoadMore,
        onSearch,
        handleQueryFilter,
        itemContainerProps,
        isSelected = (item1: ITEM) => {
            if(!selectedItem) return false;
            return keyExtractor(item1) === keyExtractor(selectedItem);
        }
    } = props;


    const [query, setQuery] = useState('');
    const [searchResults, setSearchResults] = useState(data);

    function handleSearch(query: string) {
        query = query.trim().toLocaleLowerCase();
        if(onSearch) return onSearch(query);

        if(!query) return setSearchResults(data);

        const results = data.filter(item => {
            if(handleQueryFilter) return handleQueryFilter(query, item);
            return keyExtractor(item).toLowerCase().includes(query);
        });

        setSearchResults(results);
    }

    useEffect(() => {
        handleSearch(query);
    }, [data])

    return (
        <Drawer visible={visible} onClose={onClose}>
            <Drawer.Header style={{flexDirection: 'column', alignItems: 'flex-start', gap: 8}}>
                <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }} >
                    <ThemeText style={{ fontWeight: 'bold', fontSize: 18 }} numberOfLines={1} >
                        {title}
                    </ThemeText>

                    <IconButton
                        icon="X"
                        color="text"
                        variant="text"
                        size={32}
                        onPress={onClose}
                    />
                </View>

                <Show when={!!description} >
                    <ThemeText color="text-secondary" style={{ fontSize: 12 }} numberOfLines={2} >
                        {description}
                    </ThemeText>
                </Show>

                {selectedItem ? renderSelectedItem?.(selectedItem) : null}

                <Searchbar
                    value={query}
                    onChangeText={setQuery}
                    placeholder="Search"
                    onSearch={handleSearch}
                    containerProps={{style: {width: '100%'}}}
                />
            </Drawer.Header>
            
            <FlatList
                data={searchResults}
                keyExtractor={keyExtractor}
                contentContainerStyle={{ padding: 16, gap: 8 }}

                renderItem={(info) => (
                    <PressableView
                        {...itemContainerProps}
                        style={{ borderRadius: 8, overflow: 'hidden', padding: 8 }}
                        onPress={() => { onSelectItem?.(info.item); }}
                        color={(() => {
                            if(itemContainerProps?.color) return itemContainerProps.color;
                            return isSelected(info.item) ? 'primary' : 'bg-secondary';
                        })()}
                    >
                        {renderItem(info)}
                    </PressableView>
                )}

                ListFooterComponent={
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%', paddingBottom: 10, paddingTop: 4, opacity: hasMoreItems ? 1 : 0 }}>
                        <Button
                            title="Load More"
                            height={32}
                            onPress={onPressLoadMore}
                            disabled={!hasMoreItems}
                        />
                    </View>
                }
            />
        </Drawer>
    )
}