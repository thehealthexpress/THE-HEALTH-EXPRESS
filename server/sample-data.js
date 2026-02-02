const mongoose = require('mongoose');
const MenuItem = require('./models/MenuItem');

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const sampleData = [
  // Same as above
];

const seedDB = async () => {
  await MenuItem.deleteMany({});
  await MenuItem.insertMany(sampleData);
  console.log('Data seeded');
  process.exit();
};

seedDB();
