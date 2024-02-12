import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  Dimensions,
  ScrollView,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

var {width} = Dimensions.get('window');

const Others = () => {
  const navigation = useNavigation();

  return (
    <ScrollView>
      <View style={{backgroundColor: '#f3f4fb'}}>
        <View style={styles.container2}>
          <Pressable
            style={styles.Box1}
            onPress={() => navigation.navigate('GradeTwelveScreen')}>
            <Image
              source={require('../assets/AGE2.png')}
              style={styles.image}
              resizeMode="contain"
            />
            <Text style={styles.text}>Grade Twelve</Text>
          </Pressable>
          <Pressable
            style={styles.Box2}
            onPress={() => navigation.navigate('GradeElevenScreen')}>
            <Image
              source={require('../assets/AGE.png')}
              style={styles.image}
              resizeMode="contain"
            />
            <Text style={styles.text}>Grade Eleven</Text>
          </Pressable>
        </View>
        <View style={styles.container2}>
          <Pressable
            style={styles.Box1}
            onPress={() => navigation.navigate('GradeTwelveScreen')}>
            <Image
              source={require('../assets/AGE2.png')}
              style={styles.image}
              resizeMode="contain"
            />
            <Text style={styles.text}>Grade Twelve</Text>
          </Pressable>
          <Pressable
            style={styles.Box2}
            onPress={() => navigation.navigate('GradeElevenScreen')}>
            <Image
              source={require('../assets/AGE.png')}
              style={styles.image}
              resizeMode="contain"
            />
            <Text style={styles.text}>Grade Eleven</Text>
          </Pressable>
        </View>
        <View style={styles.container2}>
          <Pressable
            style={styles.Box1}
            onPress={() => navigation.navigate('GradeTwelveScreen')}>
            <Image
              source={require('../assets/AGE2.png')}
              style={styles.image}
              resizeMode="contain"
            />
            <Text style={styles.text}>Grade Twelve</Text>
          </Pressable>
          <Pressable
            style={styles.Box2}
            onPress={() => navigation.navigate('GradeElevenScreen')}>
            <Image
              source={require('../assets/AGE.png')}
              style={styles.image}
              resizeMode="contain"
            />
            <Text style={styles.text}>Grade Eleven</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container2: {
    flex: 1,
    marginBottom: 3,
    marginHorizontal: 5,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  Box1: {
    flex: 1,
    height: width / 2.1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
    marginHorizontal: 5,
  },
  Box2: {
    flex: 1,
    height: width / 2.1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
    marginHorizontal: 5,
  },
  text: {
    fontFamily: 'QuicksandBold',
    fontSize: 15,
    color: '#000',
    textAlign: 'center',
    paddingTop: 20,
  },
  image: {
    width: 100,
    height: 100,
  },
});

export default Others;
