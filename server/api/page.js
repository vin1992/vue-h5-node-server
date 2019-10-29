let express = require("express");
let Page = require("../../models/page");
let { responseClient } = require("../util");
const router = express.Router();
const moment = require("moment");

router.post("/create", function(req, res) {
  console.log("request:", req.body);

  let { content, name, creator } = req.body;

  const fields = {
    name,
    creator,
    content
  };

  let tempPage = new Page(fields);

  tempPage
    .save()
    .then(data => {
      responseClient(res, 200, 0, "保存成功", data);
    })
    .catch(err => {
      console.log(err);
      responseClient(res);
    });
});

router.get("/list", function(req, res) {
  let responseData = {
    total: 0,
    list: []
  };
  Page.count({})
    .then(count => {
      responseData.total = count;
      Page.find({}, "_id updateTime name creator")
        .then(result => {
          console.log(result);
          responseData.list = result;
          responseClient(res, 200, 0, "success", responseData);
        })
        .catch(err => {
          throw err;
        });
    })
    .catch(err => {
      responseClient(res);
    });
});

router.get("/details", function(req, res) {
  let { pid } = req.query;
  Page.findOne({ _id: pid }, "_id  content")
    .then(result => {
      if (result) {
        responseClient(res, 200, 0, "获取成功", result);
      } else {
        responseClient(res, 200, 1, "获取失败", result);
      }
    })
    .catch(err => {
      responseClient(res);
    });
});

router.get("/delete", function(req, res) {
  let { pid } = req.query;
  Page.remove({ _id: pid })
    .then(result => {
      console.log(result, "fafaf");
      if (result.n === 1) {
        responseClient(res, 200, 0, "删除成功!");
      } else {
        responseClient(res, 200, 1, "活动不存在");
      }
    })
    .catch(err => {
      responseClient(res);
    });
});

router.post("/modify", function(req, res) {
  let { pid, content } = req.body;

  Page.where({ _id: pid })
    .update({ content })
    .then(result => {
      if (result.n === 1) {
        responseClient(res, 200, 0, "修改成功!");
      } else {
        responseClient(res, 200, 1, "修改失败");
      }
    })
    .catch(err => {
      responseClient(res);
    });
});

module.exports = router;
