import React, {useCallback, useRef} from 'react';
import {Button, Text, TouchableOpacity, View} from 'react-native';
import {Swipeable} from 'react-native-gesture-handler';

function NewsCard({heading, onDeleteClick, onPinClick}) {
  const swipableRef = useRef(null);
  const pinClickHandler = useCallback(() => {
    swipableRef.current.close();
    onPinClick();
  }, []);
  const renderRightActions = (progress, dragX) => {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
        //   backgroundColor: 'green',
        }}>
        <Button color="#F3564D" onPress={onDeleteClick} title="Delete"></Button>
        <Button color="#5B3DAB" onPress={pinClickHandler} title="Pin"></Button>
      </View>
    );
  };

  return (
    <Swipeable
      renderRightActions={(progress, dragX) =>
        renderRightActions(progress, dragX)
      }
      ref={swipableRef}
      containerStyle={{marginBottom: 16}}>
      <View
        style={{
          flex: 1,
          backgroundColor: '#2E2942',
          width: '95%',
          borderRadius: 12,
          padding: 18,
          alignSelf: 'center',
        }}>
        <Text style={{color: '#D5CDF2', fontSize: 17, fontWeight: '500'}}>
          {heading}
        </Text>
      </View>
    </Swipeable>
  );
}

export default React.memo(NewsCard);
