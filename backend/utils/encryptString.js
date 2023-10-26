const bcrypt = require("bcryptjs");

const hash_string = async (str) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(str, salt);
  return hash;
};

const compare_hash_with_string = async (str, hash) => {
  let comparison_status_bool = await bcrypt.compare(str, hash);
  return comparison_status_bool;
};

module.exports = { hash_string, compare_hash_with_string };
