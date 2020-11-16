import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import BookSearch from './BookSearch';

describe('renders book search', () => {
    const setup = () => {
        const utils = render(<BookSearch />)
        const input = utils.getByPlaceholderText('Search for books to add to your reading list and press Enter') as HTMLInputElement
        const inputEmpty = utils.getByText('Try searching for a topic, for example') as HTMLInputElement
        return {
          input,
          inputEmpty,
          ...utils,
        }
      }

      test('should allow the letters to be added and deleted in input field', () => {
        const { input } = setup()
        fireEvent.change(input, { target: { value: 'java' } })
        expect(input.value).toBe('java')
        fireEvent.change(input, { target: { value: '' } })
        expect(input.value).toBe('')
      })

      test('should render text when book is not entered in input field', () => {
        const { inputEmpty } = setup()
        expect(inputEmpty).toBeInTheDocument();
      })

      test('should check all images rendered when searched by Java', async () => {
        const { input, ...utils } = setup()
        fireEvent.change(input, { target: { value: 'java' } })
        expect(input.value).toBe('java')
        fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' })
        await utils.findAllByRole('img')
        expect(utils.getAllByRole("img").length).toEqual(10)
      })

      test('should render Add this book to wishlist button when searched by java', async () => {
        const { input, ...utils } = setup()
        fireEvent.change(input, { target: { value: 'java' } })
        expect(input.value).toBe('java')
        fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' })
        await utils.findAllByRole('button')
        expect(utils.getAllByRole('button')[1]).toHaveTextContent('Add this book to wishlist')
      })

      test('should render My Reading Wishlist heading', async () => {
        const { input, ...utils } = setup()
        fireEvent.change(input, { target: { value: 'java' } })
        expect(input.value).toBe('java')
        fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' })
        await utils.findAllByRole('button')
        fireEvent.click(utils.getAllByRole('button')[1])
        const linkElement = utils.getByText(/My Reading Wishlist/i);
        expect(linkElement).toBeInTheDocument();
      })

});
