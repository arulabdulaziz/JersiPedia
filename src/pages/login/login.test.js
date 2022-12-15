import React from 'react';
import {Alert} from 'react-native';
import {render, screen, fireEvent} from '@testing-library/react-native';
import {useIsFocused} from '@react-navigation/native';
import Login from './login';
import {getData} from '@utils';
import {when} from 'jest-when';

jest.mock('@react-navigation/native', () => ({
  useIsFocused: jest.fn(),
}));
jest.mock('@utils');
describe('Login', () => {
  it('should render login form', () => {
    const props = {
      navigation: {replace: jest.fn()},
      loading: false,
      dataUser: {},
    };
    render(<Login {...props} />);

    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const buttonLogin = screen.getByText('Login');

    useIsFocused.mockReturnValue(true);

    expect(emailInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();
    expect(buttonLogin).toBeTruthy();
  });

  it('should navigate to MainApp because any dataUser', () => {
    const props = {
      navigation: {replace: jest.fn()},
      loading: false,
      dataUser: {uid: '1234', name: 'Zilong'},
    };
    render(<Login {...props} />);

    expect(props.navigation.replace).toBeCalledWith('MainApp');
  });

  it('should navigate to MainApp because any dataUser from getUser', () => {
    const props = {
      navigation: {replace: jest.fn()},
      loading: false,
      dataUser: {},
    };
    render(<Login {...props} />);

    when(getData).calledWith().mockResolvedValue({uid: '1234', name: 'Zilong'});

    expect(props.navigation.replace).toBeCalledWith('MainApp');
  });

  it('should submit login user', () => {
    const props = {
      navigation: {replace: jest.fn()},
      loading: false,
      dataUser: {},
      loginUser: jest.fn(),
    };
    render(<Login {...props} />);

    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const buttonLogin = screen.getByText('Login');
    useIsFocused.mockReturnValue(true);

    fireEvent.changeText(emailInput, 'user@mail.com');
    fireEvent.changeText(passwordInput, '12345678');
    fireEvent.press(buttonLogin);

    expect(props.loginUser).toBeCalledWith('user@mail.com', '12345678');
  });

  it('should submit login user validation failed', () => {
    const props = {
      navigation: {replace: jest.fn()},
      loading: false,
      dataUser: {},
      loginUser: jest.fn(),
    };
    render(<Login {...props} />);

    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const buttonLogin = screen.getByText('Login');
    useIsFocused.mockReturnValue(true);

    fireEvent.press(buttonLogin);
    jest.mock();
    expect(Alert.alert).toBeCalledWith(
      'Isi Email dan Password',
      'email dan password wajib diisi!',
    );
  });
});
