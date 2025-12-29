const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
    .then(() => {
        console.log("connected to DB");
    })
    .catch((err) => {
        console.log(err);
    });

async function main() {
    await mongoose.connect(MONGO_URL);
}

// const initDB = async() => {

//     await Listing.deleteMany({});
//     initData.data = initData.data.map((obj) => ({ ...obj, owner: "67af642fc4e522733d466559"}));
//     await Listing.insertMany(initData.data);
//     console.log("data was initialized");
// };

// initDB();
const initDB = async () => {
  await Listing.deleteMany({});

  initData.data = initData.data.map((obj) => {
    const key = `${obj.location}, ${obj.country}`;
    const coords = locationCoords[key] || [77.2090, 28.6139]; // Delhi fallback

    return {
      ...obj,
      owner: "67af642fc4e522733d466559",
      geometry: {
        type: "Point",
        coordinates: coords,
      },
    };
  });

  await Listing.insertMany(initData.data);
  console.log("✅ data was initialized with geometry");
};

initDB();