const blogs = [
  {
    title: 'The Rise of Modern Architecture',
    content: 'Modern architecture is characterized by its simplification of form and the absence of decorative elements...',
    authorId: 1,
    categoryId: 1, // Assuming this corresponds to a category in your database
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: 'Urban Living: Challenges and Opportunities',
    content: 'Urban living offers a range of challenges and opportunities, from access to amenities to the need for sustainable development...',
    authorId: 1,
    categoryId: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: 'The Future of Technology in Education',
    content: 'Technology is rapidly changing the way we approach education, from online learning to interactive classrooms...',
    authorId: 2,
    categoryId: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: 'Artificial Intelligence: Trends and Impacts',
    content: 'Artificial intelligence is revolutionizing various industries, from healthcare to finance...',
    authorId: 2,
    categoryId: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: 'Healthy Eating: A Comprehensive Guide',
    content: 'Healthy eating is about more than just weight loss. It’s about feeling better both physically and mentally...',
    authorId: 3,
    categoryId: 3,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: 'The Benefits of Regular Exercise',
    content: 'Regular exercise has numerous benefits, including improved physical health, mental well-being, and longevity...',
    authorId: 3,
    categoryId: 3,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: 'Exploring the Wonders of the Universe',
    content: 'The universe is vast and full of wonders. From distant galaxies to black holes, there’s always something new to learn...',
    authorId: 4,
    categoryId: 4,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: 'The Science of Space Exploration',
    content: 'Space exploration has led to numerous scientific discoveries and technological advancements...',
    authorId: 4,
    categoryId: 4,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: 'The Impact of Climate Change on Wildlife',
    content: 'Climate change is having a significant impact on wildlife around the world. From changing habitats to altered migration patterns...',
    authorId: 5,
    categoryId: 5,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: 'Sustainable Living: Tips and Tricks',
    content: 'Sustainable living involves making choices that reduce your environmental impact and promote a healthier planet...',
    authorId: 5,
    categoryId: 5,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

const up = (queryInterface) => queryInterface.bulkInsert('blogs', blogs);
const down = (queryInterface) => queryInterface.bulkDelete('blogs', null, {});
module.exports = {
  up,
  down
};
