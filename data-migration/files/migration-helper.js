export const addNewField = async ({
  keyName,
  value,
  collection,
  successMsg = "Field added successfully.",
}) => {
  try {
    // Delete the field
    await collection.updateMany(
      { [keyName]: { $exists: false } }, // Find documents missing the specified field
      { $set: { [keyName]: value } }
    );
    console.log(`✅ ${successMsg}`);
  } catch (error) {
    console.log("❌ Error in adding new field: ", error.message);
    process.exit(1);
  }
};

export const updateField = async ({
  keyName,
  value,
  type,
  collection,
  successMsg = "Field updated successfully.",
}) => {
  try {
    const existingItems = await collection.find({
      [keyName]: { $exists: true },
    });

    for (const item of existingItems) {
      const currentValue = item[keyName];

      // Convert the field value to the specified type
      let newValue;
      if (type === "Number") {
        newValue = Number(value || currentValue);
        if (isNaN(newValue)) {
          console.log(`❌ Skipping invalid number value for ${keyName}`);
          continue;
        }
      } else if (type === "String") {
        newValue = String(value || currentValue);
      } else if (type === "Boolean") {
        newValue = Boolean(value || currentValue);
      } else {
        console.log(
          "❌ Unsupported field type. Only Number, String, and Boolean are supported."
        );
        process.exit(1);
      }

      // Update the field value
      await collection.updateOne(
        { _id: item._id },
        {
          $set: {
            [keyName]: newValue,
          },
        }
      );
    }

    console.log(`✅ ${successMsg}`);
  } catch (error) {
    console.log("❌ Error in updating the field: ", error.message);
    process.exit(1);
  }
};

export const deleteField = async ({
  keyName,
  collection,
  successMsg = "Field deleted successfully.",
}) => {
  try {
    // Delete the field
    await collection.updateMany(
      { [keyName]: { $exists: true } }, // Find documents with the specified field
      { $unset: { [keyName]: "" } }
    );
    console.log(`✅ ${successMsg}`);
  } catch (error) {
    console.log("❌ Error in deleting the permission field: ", error.message);
    process.exit(1);
  }
};
