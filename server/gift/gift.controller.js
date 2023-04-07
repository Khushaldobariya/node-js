const Gift = require("./gift.model");

exports.giftCreate = async (req, res) => {
  try {
    console.log(req.body);
    if (!req.body.coin || !req.file || !req.body.name) {
      return res
        .status(200)
        .json({ message: "Invalid Details ", status: false });
    }
    const gift = new Gift();
    gift.name = req.body.name;
    gift.coin = req.body.coin;
    gift.image = req.file.path;

    await gift.save();
    return res
      .status(200)
      .json({ message: "Gift create Successfully", status: true, gift });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, error: error.message || "Server Error" });
  }
};

exports.store = async (req, res) => {
  try {
    const gift = await Gift.find();
    return res
      .status(200)
      .json({ status: true, message: "Get GIft Successfully", gift });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, error: error.message || "Server Error" });
  }
};

exports.updateGift = async (req, res) => {
  try {
    console.log(":::::", req.params);
    const gift = await Gift.findById(req.params.giftId);
    if (!gift) {
      return res
        .status(200)
        .json({ message: "gift Dose not exits!", status: false });
    }
    if (req.file) {
      gift.image = req.file.path;
    }
    gift.coin = req.body.coin ? req.body.coin : gift.coin;
    gift.name = req.body.name ? req.body.name : gift.name;

    await gift.save();

    return res
      .status(200)
      .json({ message: "gift Update Successfully !", status: true, gift });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, error: error.message || "Server Error" });
  }
};

exports.deleteGift = async (req, res) => {
  try {
    console.log(":::::", req.params);
    const gift = await Gift.findById(req.params.giftId);
    if (!gift) {
      return res
        .status(200)
        .json({ status: false, message: "Gift Dose Not Exits!" });
    }
    await gift.deleteOne();
    return res
      .status(200)
      .json({ message: "gift Delete Successfully !", status: true });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, error: error.message || "Server Error" });
  }
};
