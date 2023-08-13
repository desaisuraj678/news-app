import React from 'react';
import {Button, Text, View} from 'react-native';
import {Swipeable} from 'react-native-gesture-handler';

function NewsPinnedCard({heading, onUnPinClick}) {
  const renderRightActions = (progress, dragX) => {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
        //   marginBottom: 16,
        }}>
        <Button color="blue" onPress={onUnPinClick} title="UnPin"></Button>
      </View>
    );
  };

  return (
    <Swipeable
      renderRightActions={(progress, dragX) =>
        renderRightActions(progress, dragX)
      }
      containerStyle={{marginTop:24}}
      >
      <View
        style={{
          backgroundColor: '#5B3DAB',
          width: '95%',
          borderRadius: 8,
          padding: 12,
          alignSelf: 'center',
        }}>
        <Text style={{color:'white'}}>{heading}</Text>
      </View>
    </Swipeable>
  );
}

export default React.memo(NewsPinnedCard);
