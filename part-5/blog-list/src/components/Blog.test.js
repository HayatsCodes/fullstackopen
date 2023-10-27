import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'


import Blog from './Blog'

let blog, container

beforeEach( () => {
  blog = {
    title: 'first blog',
    author: 'new author',
    url: 'https://new-author.com',
    likes: 0
  }

  container = render( <Blog blog={blog}/> ).container
})



test('Initially renders only title and author', () => {
  const div = container.querySelector('.when-view-is-false')
  expect(div).toHaveTextContent(blog.title)
  expect(div).toHaveTextContent(blog.author)
  expect(div).not.toHaveTextContent(blog.url)
  expect(div).not.toHaveTextContent(blog.likes)
})

test('Other info renders when view button is clicked', async () => {
  const user = userEvent.setup()
  const button = screen.getByText('View')
  await user.click(button)

  const div = container.querySelector('.when-view-is-true')
  expect(div).toHaveTextContent(blog.title)
  expect(div).toHaveTextContent(blog.author)
  expect(div).toHaveTextContent(blog.url)
  expect(div).toHaveTextContent(blog.likes)
})