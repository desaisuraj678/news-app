import React, {useCallback, useMemo} from 'react';
import {FlatList, View, Text, StyleSheet, Dimensions} from 'react-native';
import NewsCard from './NewsCard';
import {useNewsFeedEffect} from '../hooks/useNewsFeedEffect';
import NewsPinnedCard from './NewsPinnedCard';


function HomeScreen() {
  const {
    newsData,
    setNewsFeedHandler,
    deleteNewsFeedHandler,
    pinNewsFeedHandler,
    pinnedItem,
  } = useNewsFeedEffect();

  const keyExtractorHandler = useCallback(
    item => {
      return item.title;
    },
    [newsData],
  );

  const renderItem = useCallback(
    ({item}) => {
      const onDeleteClick = () => {
        deleteNewsFeedHandler(item);
      };

      const onPinClick = () => {
        pinNewsFeedHandler(item);
      };
      return (
        <NewsCard
          heading={item.title}
          onDeleteClick={onDeleteClick}
          onPinClick={onPinClick}
        />
      );
    },
    [newsData],
  );

  const onEndReachedHandler = useCallback(() => {
    setNewsFeedHandler();
  }, [newsData]);

  const headerComponent = useMemo(() => {
    if (!pinnedItem) return null;
    const onUnPinClick = () => {
      pinNewsFeedHandler(null);
    };
    return (
      <NewsPinnedCard heading={pinnedItem.title} onUnPinClick={onUnPinClick} />
    );
  }, [pinnedItem]);

  return (
    <View style={{flex: 1}}>
      {headerComponent}
      <FlatList
        style={style.flatListStyle}
        data={newsData}
        renderItem={renderItem}
        keyExtractor={keyExtractorHandler}
        onEndReached={onEndReachedHandler}
        onEndReachedThreshold={0.90}
        // estimatedItemSize={200}
        // windowSize={Dimensions.get('window').height*2}
      />
    </View>
  );
}

const style = StyleSheet.create({
    flatListStyle:{flex: 1, backgroundColor: '#272239'}
})

export default HomeScreen;
