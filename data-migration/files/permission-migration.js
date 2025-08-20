import PermissionModel from "../../src/model/Permission.js";
import { addNewField, deleteField, updateField } from "./migration-helper.js";

// NOTE Add field (want to add field with value for all non-existing collection's data)
// node FILE_PATH COLLECTION_NAME FIELD_NAME VALUE TYPE -a
const addPermissionField = async (keyName, value) => {
  await addNewField({
    keyName,
    value,
    collection: PermissionModel,
    successMsg: `${keyName} field added successfully.`,
  });
};

// NOTE Update field type and value (After first updatation want to change the field type and value)
// node FILE_PATH COLLECTION_NAME FIELD_NAME VALUE TYPE -u
const updatePermissionField = async (keyName, value, type) => {
  await updateField({
    keyName,
    value,
    type,
    collection: PermissionModel,
    successMsg: `Field type of '${keyName}' changed to ${type} successfully.`,
  });
};

// NOTE Delete field
// node FILE_PATH COLLECTION_NAME FIELD_NAME VALUE TYPE -d
const deletePermissionField = async (keyName) => {
  await deleteField({
    keyName,
    collection: PermissionModel,
    successMsg: `${keyName} field deleted successfully.`,
  });
};

export const permissionMigration = (keyName, value, type, action) => {
  if (action === "-a") {
    addPermissionField(keyName, value)
      .then(() => {
        process.exit(0);
      })
      .catch((error) => {
        process.exit(1);
      });
  } else if (action === "-u") {
    updatePermissionField(keyName, value, type)
      .then(() => {
        process.exit(0);
      })
      .catch((error) => {
        process.exit(1);
      });
  } else if (action === "-d") {
    deletePermissionField(keyName)
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
