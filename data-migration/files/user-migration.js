import UserModel from "../../src/model/User.js";
import { addNewField, deleteField, updateField } from "./migration-helper.js";

// NOTE Add field (want to add field with value for all non-existing collection's data)
// node FILE_PATH COLLECTION_NAME FIELD_NAME VALUE TYPE -a
const addUserField = async (keyName, value) => {
  await addNewField({
    keyName,
    value,
    collection: UserModel,
    successMsg: `${keyName} field added successfully.`,
  });
};

// NOTE Update field type and value (After first updatation want to change the field type and value)
// node FILE_PATH COLLECTION_NAME FIELD_NAME VALUE TYPE -u
const updateUserField = async (keyName, value, type) => {
  await updateField({
    keyName,
    value,
    type,
    collection: UserModel,
    successMsg: `Field type of '${keyName}' changed to ${type} successfully.`,
  });
};

// NOTE Delete field
// node FILE_PATH COLLECTION_NAME FIELD_NAME VALUE TYPE -d
const deleteUserField = async (keyName) => {
  await deleteField({
    keyName,
    collection: UserModel,
    successMsg: `${keyName} field deleted successfully.`,
  });
};

export const userMigration = (keyName, value, type, action) => {
  if (action === "-a") {
    addUserField(keyName, value)
      .then(() => {
        process.exit(0);
      })
      .catch((error) => {
        process.exit(1);
      });
  } else if (action === "-u") {
    updateUserField(keyName, value, type)
      .then(() => {
        process.exit(0);
      })
      .catch((error) => {
        process.exit(1);
      });
  } else if (action === "-d") {
    deleteUserField(keyName)
      .then(() => {
        process.exit(0);
      })
      .catch((error) => {
        process.exit(1);
      });
  } else {
    console.log("❌ Action is not supported.");
    process.exit(1);
  }
};
