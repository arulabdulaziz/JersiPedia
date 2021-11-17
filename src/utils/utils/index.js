import {Dimensions} from 'react-native';
import {heightMobileUI, widthMobileUI} from '../constant';

export const responsiveWidth = width => {
  return (Dimensions.get('window').width * width) / widthMobileUI;
};

export const responsiveHeight = height => {
  return (Dimensions.get('window').height * height) / heightMobileUI;
};

export const numberWithCommas = x => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
export const fromFormatDate = ['YYYY-MM-DD HH:mm:ss', 'YYYY-MM-DD|HH:mm:ss'];
export const formatDateToSaveDb = 'YYYY-MM-DD HH:mm:ss';
export const formatDateToCreateId = 'YYYY-MM-DD|HH:mm:ss';
