import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders My Good Reads link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/My Good Reads/i);
  expect(linkElement).toBeInTheDocument();
});
