const config = require("./config");

module.exports = () => {
  return (req, res, next) => {
    const token = req.headers.key || req.params.key || req.query.key;
    if (token) {
      if (token == config.SERVER_KEY) {
        next();
      } else {
        return res
          .status(401)
          .json({ message: "Unauthorized Access", status: false });
      }
    } else {
      return res
        .status(401)
        .json({ message: "Unauthorized Access", status: false });
    }
  };
};
