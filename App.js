/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useRef, useState} from 'react';
import {Animated, Button, ScrollView, View} from 'react-native';

const App = () => {
  // Scale variables
  const scaleValue = useRef(0);
  const scaleAnimationValue = useRef(
    new Animated.Value(scaleValue.current),
  ).current;
  const [buttonText, setButtonText] = useState('Scale up');

  // Translate variables
  const translateBox1Value = useRef(0);
  const translateBox1AnimationValue = useRef(
    new Animated.Value(translateBox1Value.current),
  ).current;

  const translateBox2Value = useRef(0);
  const translateBox2AnimationValue = useRef(
    new Animated.Value(translateBox1Value.current),
  ).current;

  // Translate parallel variables
  const translateParallelBox1Value = useRef(0);
  const translateParallelBox1AnimationValue = useRef(
    new Animated.Value(translateBox1Value.current),
  ).current;

  const translateParallelBox2Value = useRef(0);
  const translateParallelBox2AnimationValue = useRef(
    new Animated.Value(translateBox1Value.current),
  ).current;

  // Translate stragger variables
  const translateStraggerBox1Value = useRef(0);
  const translateStraggerBox1AnimationValue = useRef(
    new Animated.Value(translateBox1Value.current),
  ).current;

  const translateStraggerBox2Value = useRef(0);
  const translateStraggerBox2AnimationValue = useRef(
    new Animated.Value(translateBox1Value.current),
  ).current;

  // Fade in/out variables
  const fadeValue = useRef(1);
  const fadeAnimationValue = useRef(
    new Animated.Value(fadeValue.current),
  ).current;

  const runScaleAnimationOnPress = () => {
    scaleValue.current = scaleValue.current === 0 ? 1 : 0;
    scaleValue.current === 0
      ? setButtonText('Scale up')
      : setButtonText('Scale down');
    Animated.spring(scaleAnimationValue, {
      toValue: scaleValue.current,
      useNativeDriver: true,
    }).start();
  };

  const runTranslateAnimationOnPress = () => {
    translateBox1Value.current = translateBox1Value.current === 0 ? 1 : 0;
    translateBox2Value.current = translateBox2Value.current === 0 ? 1 : 0;
    Animated.sequence([
      Animated.timing(translateBox1AnimationValue, {
        toValue: translateBox1Value.current,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.delay(500),
      Animated.spring(translateBox2AnimationValue, {
        toValue: translateBox2Value.current,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const runTranslateParallelAnimationOnPress = () => {
    translateParallelBox1Value.current =
      translateParallelBox1Value.current === 0 ? 1 : 0;
    translateParallelBox2Value.current =
      translateParallelBox2Value.current === 0 ? 1 : 0;
    Animated.parallel([
      Animated.spring(translateParallelBox2AnimationValue, {
        toValue: translateParallelBox2Value.current,
        useNativeDriver: true,
      }),
      Animated.timing(translateParallelBox1AnimationValue, {
        toValue: translateParallelBox1Value.current,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const runTranslateStraggerAnimationOnPress = () => {
    translateStraggerBox1Value.current =
      translateStraggerBox1Value.current === 0 ? 1 : 0;
    translateStraggerBox2Value.current =
      translateStraggerBox2Value.current === 0 ? 1 : 0;
    Animated.stagger(500, [
      Animated.spring(translateStraggerBox2AnimationValue, {
        toValue: translateStraggerBox2Value.current,
        useNativeDriver: true,
      }),
      Animated.timing(translateStraggerBox1AnimationValue, {
        toValue: translateStraggerBox1Value.current,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const runFadeBoxAnimationOnPress = () => {
    fadeValue.current = fadeValue.current === 0 ? 1 : 0;
    Animated.timing(fadeAnimationValue, {
      toValue: fadeValue.current,
      duration: 400,
      useNativeDriver: true,
    }).start();
  };

  return (
    <ScrollView>
      <View style={{marginBottom: 100}}>
        <Animated.View
          style={{
            height: 200,
            width: 200,
            backgroundColor: 'red',
            marginBottom: 50,
            transform: [
              {
                scale: scaleAnimationValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 2],
                }),
              },
            ],
          }}
        />
        <Button title={buttonText} onPress={runScaleAnimationOnPress} />
      </View>
      <View style={{marginBottom: 100}}>
        <Animated.View
          style={{
            height: 100,
            width: 100,
            backgroundColor: 'blue',
            transform: [
              {
                translateX: translateBox1AnimationValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 200],
                }),
              },
            ],
          }}
        />
        <Animated.View
          style={{
            height: 100,
            width: 100,
            backgroundColor: 'orange',
            marginTop: 20,
            marginBottom: 50,
            transform: [
              {
                translateX: translateBox2AnimationValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 200],
                }),
              },
            ],
          }}
        />
        <Button title="Move" onPress={runTranslateAnimationOnPress} />
      </View>
      <View style={{marginBottom: 100}}>
        <Animated.View
          style={{
            height: 100,
            width: 100,
            backgroundColor: 'blue',
            transform: [
              {
                translateX: translateParallelBox1AnimationValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 200],
                }),
              },
            ],
          }}
        />
        <Animated.View
          style={{
            height: 100,
            width: 100,
            backgroundColor: 'orange',
            marginTop: 20,
            marginBottom: 50,
            transform: [
              {
                translateX: translateParallelBox2AnimationValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 200],
                }),
              },
            ],
          }}
        />
        <Button
          title="Move parallel"
          onPress={runTranslateParallelAnimationOnPress}
        />
      </View>
      <View style={{marginBottom: 100}}>
        <Animated.View
          style={{
            height: 100,
            width: 100,
            backgroundColor: 'blue',
            transform: [
              {
                translateX: translateStraggerBox1AnimationValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 200],
                }),
              },
            ],
          }}
        />
        <Animated.View
          style={{
            height: 100,
            width: 100,
            backgroundColor: 'orange',
            marginTop: 20,
            marginBottom: 50,
            transform: [
              {
                translateX: translateStraggerBox2AnimationValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 200],
                }),
              },
            ],
          }}
        />
        <Button
          title="Move stragger"
          onPress={runTranslateStraggerAnimationOnPress}
        />
      </View>
      <View style={{marginBottom: 100}}>
        <Animated.View
          style={{
            height: 200,
            width: 200,
            backgroundColor: 'red',
            marginBottom: 50,
            opacity: fadeAnimationValue.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 1],
            }),
          }}
        />
        <Button title="Fade out/in" onPress={runFadeBoxAnimationOnPress} />
      </View>
    </ScrollView>
  );
};

export default App;
