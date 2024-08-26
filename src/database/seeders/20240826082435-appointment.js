const appointments = [
  {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phoneNumber: 123456789,
    type: 1,
    price: 50000,
    isCompleted: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    phoneNumber: 987654321,
    type: 2,
    price: 75000,
    isCompleted: false,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    firstName: 'Alice',
    lastName: 'Johnson',
    email: 'alice.johnson@example.com',
    phoneNumber: 564738291,
    type: 3,
    price: 120000,
    isCompleted: false,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    firstName: 'Bob',
    lastName: 'Brown',
    email: 'bob.brown@example.com',
    phoneNumber: 112233445,
    type: 1,
    price: 65000,
    isCompleted: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    firstName: 'Eve',
    lastName: 'Davis',
    email: 'eve.davis@example.com',
    phoneNumber: 998877665,
    type: 2,
    price: 82000,
    isCompleted: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

const up = (queryInterface) => queryInterface.bulkInsert('appointments', appointments);
const down = (queryInterface) => queryInterface.bulkDelete('appointments', null, {});

module.exports = {
  up,
  down
};
