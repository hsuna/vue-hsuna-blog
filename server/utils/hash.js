import bcrypt from "bcryptjs";

const SALT_WORK_FACTOR = 10; //定义加密密码计算强度

/**
 * 将密码加密成hash值
 * @param {string} password
 * @return {resolve} hash
 * @return {reject} err
 */
const encryptHash = password => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
      if (err) {
        reject(err);
      }
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) {
          reject(err);
        }
        resolve(hash);
      });
    });
  });
};

/**
 * 对比密码和hash值是否有差异
 * @param {string} password
 * @param {string} hash
 * @return {resolve} res
 * @return {reject} err
 */
const verifyHash = (password, hash) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, (err, res) => {
      if (err) {
        reject(err);
      } else if (res) {
        resolve(res);
      } else {
        reject(res);
      }
    });
  });
};

export { encryptHash, verifyHash };
