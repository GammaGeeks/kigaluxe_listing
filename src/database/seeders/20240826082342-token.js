const tokens = [
  {
    value: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNjEyMzQ1NjAwLCJleHBpcmF0aW9uIjoxNjEyMzQ5NjAwfQ.S8J7P6QJ2QO57yYoPPTD7Q8m1j2I9Kvdr6FAeEINPUQ', // Example JWT
    userId: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    value: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyIiwibmFtZSI6IkphbmUgU21pdGgiLCJpYXQiOjE2MTIzNDYwMDAsImV4cCI6MTYxMjM0OTYwMH0.8r2PrfFf67Pc1DjzH9k5jLQx3N6kc3dH7VOXtB6xCio', // Example JWT
    userId: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    value: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzIiwibmFtZSI6IkVtbWx5IEpvaG5zb24iLCJpYXQiOjE2MTIzNDYwMDAsImV4cCI6MTYxMjM0OTYwMH0.6fwH1pl0D4FxTHvwfYY0c5e5TQhtdATz0H76n5EqW0Q', // Example JWT
    userId: 3,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    value: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI0IiwibmFtZSI6Ik1pY2hhZWwgV2lsbGlhbXMiLCJpYXQiOjE2MTIzNDYwMDAsImV4cCI6MTYxMjM0OTYwMH0.sxEFPjHsh7F3S8CgZ5SaBfAmzEr93NUIgE6q6Hmh1IY', // Example JWT
    userId: 4,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    value: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1IiwibmFtZSI6IlNhcmFoIEJyb3duIiwiaWF0IjoxNjEyMzQ1NjAwLCJleHBpcmF0aW9uIjoxNjEyMzQ5NjAwfQ.XH9jD1uM1gMNw_lC4vcluRl1SZ6PslBnd2rBqTskZT4', // Example JWT
    userId: 5,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

const up = (queryInterface) => queryInterface.bulkInsert('tokens', tokens);
const down = (queryInterface) => queryInterface.bulkDelete('tokens', null, {});
module.exports = {
  up,
  down
};
