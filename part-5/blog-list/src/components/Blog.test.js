import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import Blog from './Blog'

let blog

beforeEach( () => {
  blog = {
    title: 'first blog',
    author: 'new author',
    url: 'https://new-author.com'
  }
})

test('Initially renders only title and author', () => {
  const { container } = render ( <Blog blog={blog}/> )
  const div = container.querySelector('.when-view-is-false')
  expect(div).toHaveTextContent(blog.title)
  expect(div).toHaveTextContent(blog.author)
  expect(div).not.toHaveTextContent(blog.url)
})