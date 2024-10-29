import { ArticlesType } from './types/index';

export const demoArticles: ArticlesType = {
  articles: [
    {
      slug: 'demo-article-1',
      title:
        'Understanding Fallbacks in React Applications',
      description:
        'Learn how to create robust fallback data handling.',
      body: 'This is a sample article content for demo purposes.',
      tagList: ['React', 'Fallback'],
      createdAt: new Date('2023-10-01T10:00:00Z'),
      updatedAt: new Date('2023-10-01T10:00:00Z'),
      favorited: false,
      favoritesCount: 10,
      author: {
        username: 'nina1012',
        bio: 'Demo author bio',
        image: '/avatar-placeholder.png',
        following: true,
      },
    },
    {
      slug: 'advanced-css-tips',
      title: 'Advanced CSS Tips and Tricks',
      description:
        'Take your CSS skills to the next level with these pro tips.',
      body: 'CSS is not just for simple styling. With advanced techniques like CSS Grid, animations, and custom properties, you can create complex layouts and stunning visual effects...',
      tagList: ['CSS', 'Web Design', 'Frontend'],
      createdAt: new Date('2023-08-22T09:15:00Z'),
      updatedAt: new Date('2023-08-22T09:15:00Z'),
      favorited: true,
      favoritesCount: 57,
      author: {
        username: 'css_master',
        bio: 'Front-end developer focused on styling and design.',
        image: '/avatar-placeholder.png',
        following: true,
      },
    },
    {
      slug: 'javascript-async-await',
      title: 'Mastering Async/Await in JavaScript',
      description:
        'Learn how to handle asynchronous code in JavaScript with async/await.',
      body: 'Asynchronous programming is essential in JavaScript for handling tasks like API requests. With async/await, writing async code becomes much more readable and maintainable...',
      tagList: ['JavaScript', 'Async Programming', 'ES6'],
      createdAt: new Date('2023-06-18T14:30:00Z'),
      updatedAt: new Date('2023-06-18T14:30:00Z'),
      favorited: false,
      favoritesCount: 46,
      author: {
        username: 'js_pro',
        bio: 'JavaScript enthusiast sharing coding insights.',
        image: '/avatar-placeholder.png',
        following: false,
      },
    },
    {
      slug: 'introduction-to-supabase',
      title:
        'Introduction to Supabase: The Open Source Firebase Alternative',
      description:
        'A deep dive into Supabase and how it powers modern applications.',
      body: 'Supabase offers real-time databases, authentication, and storage, making it a great choice for modern app development. In this article, we explore its core features...',
      tagList: ['Supabase', 'Backend', 'Database'],
      createdAt: new Date('2023-09-01T08:45:00Z'),
      updatedAt: new Date('2023-09-01T08:45:00Z'),
      favorited: true,
      favoritesCount: 64,
      author: {
        username: 'data_wizard',
        bio: 'Back-end developer fascinated by databases and cloud solutions.',
        image: '/avatar-placeholder.png',
        following: true,
      },
    },
    {
      slug: 'web-accessibility-guide',
      title: 'Creating Accessible Web Applications',
      description:
        'Make your web applications accessible to everyone with these techniques.',
      body: 'Web accessibility is vital for ensuring that all users, including those with disabilities, can use your application. This article covers essential techniques like ARIA roles, keyboard navigation, and color contrast...',
      tagList: ['Accessibility', 'Frontend', 'UX'],
      createdAt: new Date('2023-10-05T17:00:00Z'),
      updatedAt: new Date('2023-10-05T17:00:00Z'),
      favorited: false,
      favoritesCount: 42,
      author: {
        username: 'accessibility_advocate',
        bio: 'UX designer promoting inclusive web practices.',
        image: '/avatar-placeholder.png',
        following: false,
      },
    },
  ],
  articlesCount: 5,
};
