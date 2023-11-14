// import React from 'react'
// import '@testing-library/jest-dom'
// import { render, screen } from '@testing-library/react'
// import userEvent from '@testing-library/user-event'
// import BlogForm from './BlogForm'

// test('<BlogForm /> updates parent state and calls onSubmit', () => {
//   const blog = {
//     title: 'first blog',
//     author: 'new author',
//     url: 'https://new-author.com',
//     likes: 0
//   }

//   const createBlog = jest.fn()
//   const user = userEvent.setup()

//   render(<BlogForm createBlog={createBlog}/>)

//   const titleInput = screen.getByPlaceholderText('title')
//   const authorInput = screen.getByPlaceholderText('author')
//   const urlInput = screen.getByPlaceholderText('url')


//   const sendButton = screen.getByText('Create')

//   user.type(titleInput, blog.title)
//   user.type(authorInput, blog.author)
//   user.type(urlInput, blog.url)
//   user.click(sendButton)

//   screen.debug(titleInput)

//   expect(createBlog.mock.calls).toHaveLength(1)
//   expect(createBlog.mock.calls[0][0].title).toBe(blog.title)
//   expect(createBlog.mock.calls[0][0].author).toBe(blog.author)
//   expect(createBlog.mock.calls[0][0].url).toBe(blog.url)
// })