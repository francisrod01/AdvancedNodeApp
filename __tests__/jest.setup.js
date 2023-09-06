require("dotenv").config();
require("dotenv").config();

/**
 * Set the default timeout interval for tests and before/after hooks in milliseconds.
 * This only affects the test file from which this function is called.
 * Note: The default timeout interval is 5 seconds if this method is not called.
 * Note: If you want to set the timeout for all test files, a good place to do this is in setupFilesAfterEnv.
 */
// jest.setTimeout(30000);

require('../models/User');

const mongoose = require("mongoose");
const keys = require('../config/keys');

mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

afterAll(async () => {
  await mongoose.disconnect();
});
