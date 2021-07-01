const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for(let i = 0; i < 200; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: '601a6fc0bf57dd0588309441',
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores, blanditiis et amet consequuntur nemo tempore nisi dignissimos asperiores minima id eum deserunt voluptates rem ipsum fugiat! Quidem consequuntur nulla atque!',
      price,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude
        ]
      },
      images: [
        {
          url: 'https://res.cloudinary.com/dyrjchlkk/image/upload/v1612527808/YelpCamp/photo-1483968049578-867b9ad94034_wtebla.jpg',
          filename: 'YelpCamp/photo-1483968049578-867b9ad94034_wtebla'
        },
        {
          url: 'https://res.cloudinary.com/dyrjchlkk/image/upload/v1612526739/YelpCamp/vioz5xsgsqqoxptabjxh.jpg',
          filename: 'YelpCamp/vioz5xsgsqqoxptabjxh'
        }
      ]
    });
    await camp.save();
  }
}

seedDB().then(() => {
  mongoose.connection.close();
});