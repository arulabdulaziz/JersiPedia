import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react-native';
import {useIsFocused} from '@react-navigation/native';
import Login from './login';

jest.mock('@react-navigation/native', () => ({
  useIsFocused: jest.fn(),
}));

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
      dataUser: {uid: '1234', name: 'Zilong', },
    };
    render(<Login {...props} />);
  })
});
