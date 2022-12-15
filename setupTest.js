jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
}));
jest.mock('@src/assets', () => ({
  Logo: () => 'Logo',
  Ilustration: () => 'Ilustration',
}));
