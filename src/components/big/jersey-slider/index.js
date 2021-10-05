import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Modal} from 'react-native';
import {SliderBox} from 'react-native-image-slider-box';
import {responsiveWidth, responsiveHeight, colors} from '../../../utils';
import ImageViewer from 'react-native-image-zoom-viewer';
const JerseySlider = props => {
  const {images} = props;
  const [indexImagePreview, setIndexImagePreview] = useState(0);
  const [previewImage, setPreviewImage] = useState(false);
  return (
    <View>
      <SliderBox
        images={images}
        circleLoop
        ImageComponentStyle={styles.image}
        sliderBoxHeight={responsiveHeight(430)}
        dotColor={colors.primary}
        dotStyle={styles.dotStyle}
        imageLoadingColor={colors.primary}
        onCurrentImagePressed={index => {
          setIndexImagePreview(index);
          setPreviewImage(true);
        }}
      />
      <Modal visible={previewImage} transparent={true}>
        <ImageViewer
          index={indexImagePreview}
          enableImageZoom={true}
          imageUrls={images.map(e => ({
            url: '',
            props: {
              source: e,
            },
          }))}
          backgroundColor={colors.primary}
          enableSwipeDown
          onSwipeDown={() => setPreviewImage(false)}
          onClick={() => setPreviewImage(false)}
        />
      </Modal>
    </View>
  );
};

export default JerseySlider;

const styles = StyleSheet.create({
  image: {
    marginTop: 15,
    width: responsiveWidth(334),
  },
  dotStyle: {
    marginTop: -50,
  },
});
