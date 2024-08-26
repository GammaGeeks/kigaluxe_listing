const user1 = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  phoneNumber: '123-456-7890',
  profileImg: 'profile1.jpg',
  password: '$2b$10$du7oxzz.OQtS.9nZhu.VfempjNhlMxoEw3TQqYsg.uXm/0uIbnVCK', // "pw123"
  createdAt: new Date(),
  updatedAt: new Date()
};

const user2 = {
  firstName: 'Jane',
  lastName: 'Smith',
  email: 'jane.smith@example.com',
  phoneNumber: '987-654-3210',
  profileImg: 'profile2.jpg',
  password: '$2b$10$du7oxzz.OQtS.9nZhu.VfempjNhlMxoEw3TQqYsg.uXm/0uIbnVCK', // "pw123"
  createdAt: new Date(),
  updatedAt: new Date()
};

const user3 = {
  firstName: 'Emily',
  lastName: 'Johnson',
  email: 'emily.johnson@example.com',
  phoneNumber: '456-789-0123',
  profileImg: 'profile3.jpg',
  password: '$2b$10$du7oxzz.OQtS.9nZhu.VfempjNhlMxoEw3TQqYsg.uXm/0uIbnVCK', // "pw123"
  createdAt: new Date(),
  updatedAt: new Date()
};

const user4 = {
  firstName: 'Michael',
  lastName: 'Williams',
  email: 'michael.williams@example.com',
  phoneNumber: '321-654-9870',
  profileImg: 'profile4.jpg',
  password: '$2b$10$du7oxzz.OQtS.9nZhu.VfempjNhlMxoEw3TQqYsg.uXm/0uIbnVCK', // "pw123"
  createdAt: new Date(),
  updatedAt: new Date()
};

const user5 = {
  firstName: 'Sarah',
  lastName: 'Brown',
  email: 'sarah.brown@example.com',
  phoneNumber: '654-321-0987',
  profileImg: 'profile5.jpg',
  password: '$2b$10$du7oxzz.OQtS.9nZhu.VfempjNhlMxoEw3TQqYsg.uXm/0uIbnVCK', // "pw123"
  createdAt: new Date(),
  updatedAt: new Date()
};

const up = (queryInterface) => queryInterface.bulkInsert('users', [user1, user2, user3, user4, user5]);
const down = (queryInterface) => queryInterface.bulkDelete('users', null, {});
export {
  up,
  down
};
