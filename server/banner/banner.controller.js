const Banner = require("./banner.model");

// create
exports.bannerStore = async (req, res) => {
  try {
    if (!req.body.url || !req.file || !req.body.name) {
      return res
        .status(200)
        .json({ message: "Invalid Details", status: false });
    }
    // create a new data object
    const banner = new Banner({
      name: req.body.name,
      url: req.body.url,
      image: req.file.path,
    });

    await banner.save();

    return res
      .status(200)
      .json({ message: "banner create Successfully", status: true, banner });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, error: error.message || "Server Error" });
  }
};
// get banner
exports.index = async (req, res) => {
  try {
    const banner = await Banner.find();

    // const banner = await Banner.findById(req.query.bannerId);
    // if (!banner) {
    //   return res
    //     .status(200)
    //     .json({ status: false, message: "banner dose not exist!" });
    // }
    return res
      .status(200)
      .json({ message: "Banner Get  Successfully ", status: true, banner });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, error: error.message || "Server Error" });
  }
};

// update banner
exports.update = async (req, res) => {
  try {
    console.log("banner", req.query.bannerId);
    const banner = await Banner.findById(req.query.bannerId);
    if (!banner) {
      return res
        .status(200)
        .json({ message: "Banner dose not exist!", status: false });
    }
    // Update a new data object

    if (req.file) {
      banner.image = req.file.path;
    }
    banner.name = req.body.name ? req.body.name : req.name;
    banner.url = req.body.url ? req.body.url : banner.url;
    banner.name = req.body.name ? req.body.name : banner.name;

    await banner.save({});

    return res
      .status(200)
      .json({ message: "banner Update Successfully", status: true, banner });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, error: error.message || "Server Error" });
  }
};

// delete banner
exports.delete = async (req, res) => {
  try {
    const banner = await Banner.findById(req.query.bannerId);

    if (!banner) {
      return res
        .status(200)
        .json({ message: "Banner dose not exist!", status: false });
    }

    await banner.deleteOne();

    return res
      .status(200)
      .json({ message: "banner Delete Successfully", status: true });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, error: error.message || "Server Error" });
  }
};
