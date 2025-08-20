import AdminCreatedRoleModel from "../../src/model/AdminCreatedRole.js";
import { addNewField, deleteField, updateField } from "./migration-helper.js";

// NOTE Add field (want to add field with value for all non-existing collection's data)
// node FILE_PATH COLLECTION_NAME FIELD_NAME VALUE TYPE -a
const addAdminCreatedRoleField = async (keyName, value) => {
  await addNewField({
    keyName,
    value,
    collection: AdminCreatedRoleModel,
    successMsg: `${keyName} field added successfully.`,
  });
};

// NOTE Update field type and value (After first updatation want to change the field type and value)
// node FILE_PATH COLLECTION_NAME FIELD_NAME VALUE TYPE -u
const updateAdminCreatedRoleField = async (keyName, value, type) => {
  await updateField({
    keyName,
    value,
    type,
    collection: AdminCreatedRoleModel,
    successMsg: `Field type of '${keyName}' changed to ${type} successfully.`,
  });
};

// NOTE Delete field
// node FILE_PATH COLLECTION_NAME FIELD_NAME VALUE TYPE -d
const deleteAdminCreatedRoleField = async (keyName) => {
  await deleteField({
    keyName,
    collection: AdminCreatedRoleModel,
    successMsg: `${keyName} field deleted successfully`,
  });
};

export const adminCreatedRoleMigration = (keyName, value, type, action) => {
  if (action === "-a") {
    addAdminCreatedRoleField(keyName, value)
      .then(() => {
        process.exit(0);
      })
      .catch((error) => {
        process.exit(1);
      });
  } else if (action === "-u") {
    updateAdminCreatedRoleField(keyName, value, type)
      .then(() => {
        process.exit(0);
      })
      .catch((error) => {
        process.exit(1);
      });
  } else if (action === "-d") {
    deleteAdminCreatedRoleField(keyName)
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
