import jwt from "jsonwebtoken";

const SUPER_SECRET = "hsuan-blog";

/**
 * 通过用户id获取token值
 * @param userId  用户ID
 * @param time     过期时间(秒) 默认 7天 60*60*24*7=604800
 * @return token
 */
const signToken = (userId, time = 604800) => {
  let exp = Math.floor(Date.now() / 1000) + time;
  return jwt.sign({ userId, exp }, SUPER_SECRET);
};

/**
 * 校验token值
 * @param token
 * @return decoded
 */
const decodeToken = token => {
  return jwt.decode(token, SUPER_SECRET);
};

const verifyToken = token => {
  return new Promise((resolve, reject) => {
    if (token) {
      jwt.verify(token, SUPER_SECRET, (err, decode) => {
        if (err) {
          reject(err);
        } else if (decode.exp <= Date.now() / 1000) {
          reject(decode);
        } else {
          resolve(decode);
        }
      });
    } else {
      reject("the token is null!!!");
    }
  });
};

const verifyRouteToken = (req, res, next) => {
  let token = req.headers["authorization"];
  if (token) {
    verifyToken(token).then(
      decode => {
        next();
      },
      err => {
        res.send({
          code: 401,
          message: "授权已经过期，请重新登陆"
        });
      }
    );
  } else {
    res.send({
      code: 401,
      message: "授权已经过期，请重新登陆"
    });
  }
};

export { signToken, decodeToken, verifyToken, verifyRouteToken };
