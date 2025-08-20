import AllBlogsCategoryModel from "../../src/model/blog/BlogsCategory.js";
import { addNewField, deleteField, updateField } from "./migration-helper.js";

// NOTE Add field (want to add field with value for all non-existing collection's data)
// node FILE_PATH COLLECTION_NAME FIELD_NAME VALUE TYPE -a
const addCategoryFiled = async (keyName, value) => {
  await addNewField({
    keyName,
    value,
    collection: AllBlogsCategoryModel,
    successMsg: `${keyName} field added successfully.`,
  });
};

// NOTE Update field type and value (After first updatation want to change the field type and value)
// node FILE_PATH COLLECTION_NAME FIELD_NAME VALUE TYPE -u
const updateCategoryFiled = async (keyName, value, type) => {
  await updateField({
    keyName,
    value,
    type,
    collection: AllBlogsCategoryModel,
    successMsg: `Field type of '${keyName}' changed to ${type} successfully.`,
  });
};

// NOTE Delete field
// node FILE_PATH COLLECTION_NAME FIELD_NAME VALUE TYPE -d
const deleteCategoryFiled = async (keyName, value) => {
  await deleteField({
    keyName,
    collection: AllBlogsCategoryModel,
    successMsg: `${keyName} field deleted successfully.`,
  });
};

export const categoryMigration = async (keyName, value, type, action) => {
  if (action === "-a") {
    addCategoryFiled(keyName, value)
      .then(() => {
        process.exit(0);
      })
      .catch((error) => {
        process.exit(1);
      });
  } else if (action === "-u") {
    updateCategoryFiled(keyName, value, type)
      .then(() => {
        process.exit(0);
      })
      .catch((error) => {
        process.exit(1);
      });
  } else if (action === "-d") {
    deleteCategoryFiled(keyName, value)
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
