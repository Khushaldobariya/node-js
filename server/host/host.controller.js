const Host = require("./host.model");
exports.create = async (req, res) => {
  try {
    if (
      !req.body.email ||
      !req.body.name ||
      !req.body.age ||
      !req.body.type ||
      !req.body.mobileNo ||
      !req.file
    ) {
      return res
        .status(200)
        .json({ message: "Invalid Details ", status: false });
    }
    const host = new Host();
    host.name = req.body.name;
    host.email = req.body.email;
    host.age = req.body.age;
    host.type = req.body.type.toLowerCase();
    host.mobileNo = req.body.mobileNo;
    host.image = req.file.path;

    await host.save();
    return res
      .status(200)
      .json({ message: "Host Create successfully", status: true, host });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, error: error.message || "Server Error" });
  }
};

exports.store = async (req, res) => {
  try {
    const host = await Host.find();
    return res
      .status(200)
      .json({ message: "Host get success", status: true, host });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, error: error.message || "Server Error" });
  }
};

