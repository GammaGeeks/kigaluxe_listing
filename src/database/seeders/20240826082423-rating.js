const ratings = [
  {
    email: 'johndoe@gmail.com',
    propertyId: 1,
    rates: 5,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    email: 'janesmith@gmail.com',
    propertyId: 2,
    rates: 4,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    email: 'emilyjohnson@gmail.com',
    propertyId: 3,
    rates: 3,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    email: 'michealwilliams@gmail.com',
    propertyId: 4,
    rates: 5,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    email: 'sarahbrown@gmail.com',
    propertyId: 5,
    rates: 4,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    email: 'adolphe@gmail.com',
    propertyId: 1,
    rates: 4,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    email: 'ngoga@gmail.com',
    propertyId: 4,
    rates: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    email: 'eric@gmail.com',
    propertyId: 2,
    rates: 5,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    email: 'patrick@gmail.com',
    propertyId: 3,
    rates: 3,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    email: 'alpha@gmail.com',
    propertyId: 2,
    rates: 5,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    email: 'david@gmail.com',
    propertyId: 4,
    rates: 4,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    email: 'felix@gmail.com',
    propertyId: 1,
    rates: 5,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    email: 'alice@gmail.com',
    propertyId: 3,
    rates: 3,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    email: 'aline@gmail.com',
    propertyId: 4,
    rates: 4,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    email: 'oliva@gmail.com',
    propertyId: 5,
    rates: 5,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    email: 'soso@gmail.com',
    propertyId: 1,
    rates: 4,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    email: 'esther@gmail.com',
    propertyId: 2,
    rates: 3,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    email: 'philos@gmail.com',
    propertyId: 3,
    rates: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    email: 'lamar@gmail.com',
    propertyId: 4,
    rates: 5,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    email: 'kelly@gmail.com',
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
