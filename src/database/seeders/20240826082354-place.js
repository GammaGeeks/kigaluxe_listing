const places = [
  {
    province: 'Kigali',
    district: 'Nyarugenge',
    sector: 'Kiyovu',
    knownName: 'Kiyovu Hill',
    description: 'A high-end residential area in the heart of Kigali, known for its luxury homes and proximity to the city center.',
    img: 'place/kiyovu_hill.jpg',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    province: 'Northern Province',
    district: 'Musanze',
    sector: 'Ruhengeri',
    knownName: 'Volcanoes Park',
    description: 'Home to the famous mountain gorillas, this area is a popular tourist destination.',
    img: 'place/volcanoes_park.jpg',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    province: 'Eastern Province',
    district: 'Kayonza',
    sector: 'Mukarange',
    knownName: 'Akagera Game Lodge',
    description: 'A gateway to the Akagera National Park, known for its wildlife and scenic views.',
    img: 'place/akagera_game_lodge.jpg',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    province: 'Southern Province',
    district: 'Huye',
    sector: 'Tumba',
    knownName: 'Huye Mountain',
    description: 'A historical area with significant cultural and educational institutions.',
    img: 'place/huye_mountain.jpg',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    province: 'Western Province',
    district: 'Rubavu',
    sector: 'Gisenyi',
    knownName: 'Lake Kivu',
    description: 'A beautiful lakefront area popular with tourists and locals for its beaches and resorts.',
    img: 'place/lake_kivu.jpg',
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

const up = (queryInterface) => queryInterface.bulkInsert('places', places);
const down = (queryInterface) => queryInterface.bulkDelete('places', null, {});
module.exports = {
  up,
  down
};
