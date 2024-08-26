const comments = [
  {
    userId: 1,
    blogId: 1,
    content: 'Great insights on modern architecture!',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: 2,
    blogId: 1,
    content: 'I love the examples provided in this article.',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: 3,
    blogId: 2,
    content: 'Urban living indeed presents both challenges and opportunities.',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: 4,
    blogId: 2,
    content: 'Very informative and well-written.',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: 5,
    blogId: 3,
    content: 'Technology is definitely shaping the future of education.',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: 1,
    blogId: 3,
    content: 'I agree, AI has a huge impact on various industries.',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: 2,
    blogId: 4,
    content: 'Healthy eating has truly changed my life for the better.',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: 3,
    blogId: 4,
    content: 'This guide is very comprehensive and helpful.',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: 4,
    blogId: 5,
    content: 'Regular exercise is key to maintaining good health.',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: 5,
    blogId: 5,
    content: 'Great tips on staying active!',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: 1,
    blogId: 6,
    content: 'The universe is indeed full of wonders.',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: 2,
    blogId: 6,
    content: 'This article really sparked my interest in space exploration.',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: 3,
    blogId: 7,
    content: 'Climate change is a pressing issue that needs more attention.',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: 4,
    blogId: 7,
    content: 'Very informative article on the impact of climate change.',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: 5,
    blogId: 8,
    content: 'Sustainable living is the way forward.',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: 1,
    blogId: 8,
    content: 'Great tips on reducing our environmental impact.',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: 2,
    blogId: 8,
    content: 'I found this article very useful and practical.',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: 3,
    blogId: 8,
    content: 'Sustainability should be a priority for everyone.',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: 4,
    blogId: 8,
    content: 'I learned a lot from this article. Thanks for sharing!',
    createdAt: new Date(),
    updatedAt: new Date()
  },
];

const up = (queryInterface) => queryInterface.bulkInsert('comments', comments);
const down = (queryInterface) => queryInterface.bulkDelete('comments', null, {});
module.exports = {
  up,
  down
};
