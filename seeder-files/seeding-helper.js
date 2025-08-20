// Insert Object Data in DB
export const insertDataObject = async (collection, obj, successMsg) => {
  try {
    await collection.deleteMany();

    const newData = new collection(obj);
    await newData.save();

    console.log(`✅ ${successMsg}`);
    process.exit(0);
  } catch (error) {
    console.log("❌ Error in inserting object seeder data: ", error.message);
    process.exit(1);
  }
};

// Insert Array Data in DB
export const insertDataList = async (collection, list, successMsg) => {
  try {
    // await collection.deleteMany();

    for (let item of list) {
      const itemData = new collection(item);
      await itemData.save();
    }

    console.log(`✅ ${successMsg}`);
    process.exit(0);
  } catch (error) {
    console.log("❌ Error in inserting blog seeder data: ", error.message);
    process.exit(1);
  }
};

// Destroy All Data in DB
export const destroyAllData = async (collection, successMsg) => {
  try {
    await collection.deleteMany();

    console.log(`✅ ${successMsg}`);
    process.exit(0);
  } catch (error) {
    console.log("❌ Error in destroying all seeder data: ", error.message);
    process.exit(1);
  }
};
