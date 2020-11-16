import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import BookSearch from './BookSearch';

describe('renders book search', () => {
    const setup = () => {
        const utils = render(<BookSearch />)
        const input = utils.getByPlaceholderText('Search for books to add to your reading list and press Enter') as HTMLInputElement
        return {
          input,
          ...utils,
        }
      }

      test('It should allow the  letters to be added and deleted in input field', () => {
        const { input } = setup()
        fireEvent.change(input, { target: { value: 'java' } })
        expect(input.value).toBe('java')
        fireEvent.change(input, { target: { value: '' } })
        expect(input.value).toBe('')
      })

});
