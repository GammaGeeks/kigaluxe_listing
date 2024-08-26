const ratings = [
  {
    userId: 1,
    propertyId: 1,
    rates: 5,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: 1,
    propertyId: 2,
    rates: 4,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: 2,
    propertyId: 3,
    rates: 3,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: 2,
    propertyId: 4,
    rates: 5,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: 3,
    propertyId: 5,
    rates: 4,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: 3,
    propertyId: 1,
    rates: 4,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: 4,
    propertyId: 4,
    rates: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: 4,
    propertyId: 2,
    rates: 5,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: 5,
    propertyId: 3,
    rates: 3,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: 5,
    propertyId: 2,
    rates: 5,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: 1,
    propertyId: 4,
    rates: 4,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: 2,
    propertyId: 1,
    rates: 5,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: 3,
    propertyId: 3,
    rates: 3,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: 4,
    propertyId: 4,
    rates: 4,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: 5,
    propertyId: 5,
    rates: 5,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: 1,
    propertyId: 1,
    rates: 4,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: 2,
    propertyId: 2,
    rates: 3,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: 3,
    propertyId: 3,
    rates: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: 4,
    propertyId: 4,
    rates: 5,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: 5,
    propertyId: 5,
    rates: 4,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

const up = (queryInterface) => queryInterface.bulkInsert('ratings', ratings);
const down = (queryInterface) => queryInterface.bulkDelete('ratings', null, {});

module.exports = {
  up,
  down
};
