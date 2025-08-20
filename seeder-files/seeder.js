import dotenv from "dotenv";
import fs from "fs";
import mongoose from "mongoose";
import path from "path";

import {
  adminWithSuperAdminRole,
  blog,
  category,
  languages,
  permissionList,
  superAdminRole,
} from "../src/app/assets/data/seederData/index.js";

import AdminCreatedRoleModel from "../src/model/AdminCreatedRole.js";
import AllBlogsModel from "../src/model/blog/AllBlogs.js";
import AllBlogsCategoryModel from "../src/model/blog/BlogsCategory.js";
import CountriesModel from "../src/model/Countries.js";
import PermissionModel from "../src/model/Permission.js";
import UserModel from "../src/model/User.js";

import LanguagesModel from "../src/model/Language.js";
import TimeZoneModel from "../src/model/TimeZone.js";
import {
  destroyAllData,
  insertDataList,
  insertDataObject,
} from "./seeding-helper.js";

// Import the timeZones JSON file using fs
const timeZonesPath = path.resolve(
  process.cwd(),
  "src/app/assets/data/seederData/time-zone.json"
);
const timeZones = JSON.parse(fs.readFileSync(timeZonesPath, "utf-8"));

// Import the countries JSON file using fs
const countriesPath = path.resolve(
  process.cwd(),
  "src/app/assets/data/seederData/countries_json.json"
);
const countries = JSON.parse(fs.readFileSync(countriesPath, "utf-8"));

// cwd = current working directory
dotenv.config({
  path: `${process.cwd()}/.env`,
});

// 1. Database Call
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
  if (process.argv.length < 4) {
    console.log(
      "Insufficient arguments provided. Usage: node FILE_PATH COLLECTION_NAME ACTION"
    );
    process.exit(1);
  }
};

// 2. Calling the functions through command line arguments
const mainSeederFunction = async () => {
  // Script arguments -> node ./seeder-files/seeder.js COLLECTION_NAME ACTION

  validateArguments();

  const collectionName = process.argv[2];
  const action = process.argv[3];

  // BOLG::
  if (collectionName === "blog" && action === "-i") {
    insertDataObject(
      AllBlogsModel,
      blog,
      "Seeder Blog data inserted successfully."
    );
  } else if (collectionName === "blog" && action === "-d") {
    destroyAllData(AllBlogsModel, "Blog data destroyed successfully.");
  }
  // CATEGORY::
  else if (collectionName === "category" && action === "-i") {
    insertDataObject(
      AllBlogsCategoryModel,
      category,
      "Seeder Category data inserted successfully."
    );
  } else if (collectionName === "category" && action === "-d") {
    destroyAllData(
      AllBlogsCategoryModel,
      "Category data destroyed successfully."
    );
  }
  // SUPER_ADMIN_USER::
  else if (collectionName === "user" && action === "-i") {
    insertDataObject(
      UserModel,
      adminWithSuperAdminRole,
      "Seeder User data inserted successfully."
    );
  } else if (collectionName === "user" && action === "-d") {
    destroyAllData(UserModel, "User data destroyed successfully.");
  }
  // PERMISSIONS::
  else if (collectionName === "permission" && action === "-i") {
    insertDataList(
      PermissionModel,
      permissionList,
      "Seeder Permission data inserted successfully."
    );
  } else if (collectionName === "permission" && action === "-d") {
    destroyAllData(PermissionModel, "Permission data destroyed successfully.");
  }
  // SUPER_ADMIN_ROLE::
  else if (collectionName === "admin-created-role" && action === "-i") {
    insertDataObject(
      AdminCreatedRoleModel,
      superAdminRole,
      "Seeder Admin Created Role data inserted successfully."
    );
  } else if (collectionName === "admin-created-role" && action === "-d") {
    destroyAllData(
      AdminCreatedRoleModel,
      "Admin Created Role data destroyed successfully."
    );
  }
  // LANGUAGES::
  else if (collectionName === "language" && action === "-i") {
    insertDataList(
      LanguagesModel,
      languages,
      "Seeder Language data inserted successfully."
    );
  } else if (collectionName === "language" && action === "-d") {
    destroyAllData(LanguagesModel, "Language data destroyed successfully.");
  }
  // TIME_ZONES::
  else if (collectionName === "time-zone" && action === "-i") {
    insertDataList(
      TimeZoneModel,
      timeZones,
      "Seeder Time Zone data inserted successfully."
    );
  } else if (collectionName === "time-zone" && action === "-d") {
    destroyAllData(TimeZoneModel, "Time Zone data destroyed successfully.");
  }
  // COUNTRIES::
  else if (collectionName === "countries" && action === "-i") {
    insertDataList(
      CountriesModel,
      countries,
      "Seeder Countries data inserted successfully."
    );
  } else if (collectionName === "countries" && action === "-d") {
    destroyAllData(CountriesModel, "Countries data destroyed successfully.");
  } else {
    console.log("Collection name not supported.");
    process.exit(1);
  }
};

mainSeederFunction();
