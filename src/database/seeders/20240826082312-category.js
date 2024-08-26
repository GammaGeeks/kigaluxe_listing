const category1 = {
  name: 'Residential House',
  createdAt: new Date(),
  updatedAt: new Date()
};

const category2 = {
  name: 'Apartment',
  createdAt: new Date(),
  updatedAt: new Date()
};

const category3 = {
  name: 'Villa',
  createdAt: new Date(),
  updatedAt: new Date()
};

const category4 = {
  name: 'Cottage',
  createdAt: new Date(),
  updatedAt: new Date()
};

const category5 = {
  name: 'Office',
  createdAt: new Date(),
  updatedAt: new Date()
};

const category6 = {
  name: 'Land',
  createdAt: new Date(),
  updatedAt: new Date()
};

const category7 = {
  name: 'Commercial',
  createdAt: new Date(),
  updatedAt: new Date()
};

const up = (queryInterface) => queryInterface.bulkInsert('categories', [category1, category2, category3, category4, category5, category6, category7]);
const down = (queryInterface) => queryInterface.bulkDelete('categories', null, {});
export {
  up,
  down
};
