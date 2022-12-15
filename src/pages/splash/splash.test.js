import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react-native';
import Splash from './index';
// jest.mock('@react-native-async-storage/async-storage', () =>
//   require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
// );
jest.mock('react-native-splash-screen', () => ({
  hide: jest.fn(),
}));

beforeEach(() => {
  jest.useFakeTimers();
});

describe('Splash', () => {
  it('should render splash and navigate', () => {
    const navigation = {replace: jest.fn()};
    render(<Splash navigation={navigation} />);

    jest.runAllTimers();

    expect(navigation.replace).toBeCalledWith('MainApp');
  });
});
