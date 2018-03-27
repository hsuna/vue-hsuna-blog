import express from "express";
import api from "../api/classify";

const router = express.Router();

const guestFilter = ({_id, title}) => ({
  id: _id,
  title
});

/**
 * 查找分类
 */
router.get("/", (req, res) => {
  let { page, limit } = req.query;
  api
    .getClassify(req.query, page, limit)
    .then(result => {
      let [ list, total ] = result;
      res.send({
        code: 200,
        data: {
          list: list.map(guestFilter),
          total: total || list.length
        }
      });
    })
    .catch(err => {
      res.send({
        code: -200,
        message: "获取分类失败"
      });
    });
});

export default router;
