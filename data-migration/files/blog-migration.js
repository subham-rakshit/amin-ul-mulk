import AllBlogsModel from "../../src/model/blog/AllBlogs.js";
import { addNewField, deleteField, updateField } from "./migration-helper.js";

// NOTE Add field (want to add field with value for all non-existing collection's data)
// node FILE_PATH COLLECTION_NAME FIELD_NAME VALUE TYPE -a
const addBlogField = async (keyName, value) => {
  await addNewField({
    keyName,
    value,
    collection: AllBlogsModel,
    successMsg: `${keyName} field added successfully.`,
  });
};

// NOTE Update field type and value (After first updatation want to change the field type and value)
// node FILE_PATH COLLECTION_NAME FIELD_NAME VALUE TYPE -u
const updateBlogField = async (keyName, value, type) => {
  await updateField({
    keyName,
    value,
    type,
    collection: AllBlogsModel,
    successMsg: `Field type of '${keyName}' changed to ${type} successfully.`,
  });
};

// NOTE Delete field
// node FILE_PATH COLLECTION_NAME FIELD_NAME VALUE TYPE -d
const deleteBlogField = async (keyName) => {
  await deleteField({
    keyName,
    collection: AllBlogsModel,
    successMsg: `${keyName} field deleted successfully.`,
  });
};

export const blogMigration = (keyName, value, type, action) => {
  if (action === "-a") {
    addBlogField(keyName, value)
      .then(() => {
        process.exit(0);
      })
      .catch((error) => {
        process.exit(1);
      });
  } else if (action === "-u") {
    updateBlogField(keyName, value, type)
      .then(() => {
        process.exit(0);
      })
      .catch((error) => {
        process.exit(1);
      });
  } else if (action === "-d") {
    deleteBlogField(keyName)
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
