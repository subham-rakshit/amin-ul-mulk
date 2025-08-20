import dotenv from "dotenv";
import mongoose from "mongoose";
import { adminCreatedRoleMigration } from "./files/admin-created-role.js";
import { blogMigration } from "./files/blog-migration.js";
import { categoryMigration } from "./files/category-migration.js";
import { permissionMigration } from "./files/permission-migration.js";
import { userMigration } from "./files/user-migration.js";

// cwd = current working directory
dotenv.config({
  path: `${process.cwd()}/.env`,
});

// Database Call
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Database connection established successfully.");
  })
  .catch((error) => {
    console.log("Error in connecting to database: ", error);
    process.exit(1);
  });

// Validate command line arguments
const validateArguments = () => {
  if (process.argv.length < 7) {
    console.log(
      "Insufficient arguments provided. Usage: node FILE_PATH COLLECTION_NAME FIELD_NAME VALUE TYPE ACTION"
    );
    process.exit(1);
  }
};

// Calling the function through command line arguments
const mainMigrationFunction = () => {
  // Script arguments -> node ./data-migration/migration.js COLLECTION_NAME KEY_NAME VALUE TYPE ACTION

  validateArguments();

  const collectionName = process.argv[2];
  const keyName = process.argv[3];
  const value = process.argv[4];
  const type = process.argv[5];
  const action = process.argv[6];

  // Call appropriate migration function based on collection name
  if (collectionName === "blog") {
    blogMigration(keyName, value, type, action);
  } else if (collectionName === "category") {
    categoryMigration(keyName, value, type, action);
  } else if (collectionName === "user") {
    userMigration(keyName, value, type, action);
  } else if (collectionName === "permission") {
    permissionMigration(keyName, value, type, action);
  } else if (collectionName === "admin-created-role") {
    adminCreatedRoleMigration(keyName, value, type, action);
  } else {
    console.log("❌ Collection name is not supported.");
    process.exit(1);
  }
};

mainMigrationFunction();
