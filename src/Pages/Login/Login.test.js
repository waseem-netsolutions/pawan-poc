
import { render, screen , fireEvent } from '@testing-library/react';
import Login from './Login';
import { act } from 'react-dom/test-utils';

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

test('Email input should be rendered', () => {
  render(<Login />);
  const emailInput = screen.getByPlaceholderText(/Email/i);
  expect(emailInput).toBeInTheDocument();
});

test('Email input should be empty', () => {
  render(<Login />);
  const emailInput = screen.getByPlaceholderText(/Email/i);
  expect(emailInput.value).toBe('');
});


test('Email input value  should be changed', async () => {
  render(<Login />);
  const emailInput = screen.getByPlaceholderText(/Email/i);
  let testValue = 'Testing'
  await act(async() => {
    await fireEvent.change(emailInput, {target:{value:testValue}})
  });
  expect(emailInput.value).toBe(testValue);
});


test('Password input should be rendered', () => {
  render(<Login />);
  const passwordInput = screen.getByPlaceholderText(/Password/i);
  expect(passwordInput).toBeInTheDocument();
});


test('Password input should be empty', () => {
  render(<Login />);
  const passwordInput = screen.getByPlaceholderText(/Password/i);
  expect(passwordInput.value).toBe('');
});


test('Password input value  should be changed', async () => {
  render(<Login />);
  const passwordInput = screen.getByPlaceholderText(/Password/i);
  let testValue = 'Testing'
  await act(async () =>{ 
    await fireEvent.change(passwordInput, {target:{value:testValue}})
  });

    expect(passwordInput.value).toBe(testValue);
});


test('Submit button  should be rendered', () => {
  render(<Login />);
  const passwordInput = screen.getByRole('button');
  expect(passwordInput).toBeInTheDocument();
});



