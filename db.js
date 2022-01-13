"use strict";
/** Database setup for boonelist. */
const { Client } = require("pg");
const { getDatabaseUri } = require("./config");
require("dotenv").config()

// const devConfig = {
//     user: process.env.PG_USER,
//     password: process.env.PG_PASSWORD,
//     host: process.env.PG_HOST,
//     database: process.env.PG_DATABASE,
//     port: process.env.PG_PORT
// }

// const proConfig = {
//     connectionString: process.env.DATABASE_URL
// }

// const db = new Client(process.env.NODE_ENV === "production" ? proConfig : devConfig)

if (process.env.NODE_ENV === "production") {
    db = new Client({
        connectionString: getDatabaseUri(),
        ssl: {
        rejectUnauthorized: false
        }
    });
    } else {
    db = new Client({
        connectionString: getDatabaseUri()
    });
    }

db.connect();

module.exports = db;