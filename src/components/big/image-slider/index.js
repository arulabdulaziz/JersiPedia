import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {SliderBox} from 'react-native-image-slider-box';
import {responsiveWidth, responsiveHeight, colors} from '@utils';
import {Slider1, Slider2} from '@assets';
const ImageSlider = props => {
  const [images, setImages] = useState([Slider1, Slider2]);
  return (
    <View style={styles.container}>
      <SliderBox
        images={images}
        autoplay
        circleLoop
        ImageComponentStyle={styles.banner}
        sliderBoxHeight={responsiveHeight(150)}
        dotColor={colors.primary}
        dotStyle={styles.dotStyle}
        imageLoadingColor={colors.primary}
      />
    </View>
  );
};

export default ImageSlider;

const styles = StyleSheet.create({
  container: {
    marginTop: -15,
  },
  banner: {
    borderRadius: 10,
    width: responsiveWidth(354),
  },
  dotStyle: {
    borderRadius: 5,
    width: 10,
    height: 5,
  },
});
