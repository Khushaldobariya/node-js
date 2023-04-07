const Plan = require("./plan.model");
const User = require("../user/user.model");

exports.create = async (req, res) => {
  try {
    if (!req.body.coin || !req.body.dollar || !req.body.level) {
      return res
        .status(200)
        .json({ message: "Invalid Details ", status: false });
    }
    const plan = new Plan();
    plan.level = req.body.level;
    plan.coin = req.body.coin;
    plan.dollar = req.body.dollar;

    await plan.save();
    return res
      .status(200)
      .json({ message: "Plan create Successfully", status: true, plan });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, error: error.message || "Server Error" });
  }
};

exports.store = async (req, res) => {
  try {
    const plan = await Plan.find();
    return res
      .status(200)
      .json({ status: true, message: "plan plan Successfully", plan });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, error: error.message || "Server Error" });
  }
};

exports.updatePlan = async (req, res) => {
  try {
    const plan = await Plan.findById(req.query.planId);
    if (!plan) {
      return res
        .status(200)
        .json({ message: "plan Dose not exits!", status: false });
    }

    plan.coin = req.body.coin ? req.body.coin : plan.coin;
    plan.dollar = req.body.dollar ? req.body.dollar : plan.dollar;
    plan.level = req.body.level ? req.body.level : plan.level;

    await plan.save();

    return res
      .status(200)
      .json({ message: "plan Update Successfully !", status: true, plan });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, error: error.message || "Server Error" });
  }
};

exports.delete = async (req, res) => {
  try {
    const plan = await Plan.findById(req.query.planId);
    if (!plan) {
      return res
        .status(200)
        .json({ message: "plan dose not exits!", status: false });
    }

    await plan.deleteOne();
    return res
      .status(200)
      .json({ message: "plan Delete successfully!", status: true });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, error: error.message || "Server Error" });
  }
};

exports.handelActiveToggle = async (req, res) => {
  try {
    const plan = await Plan.findById(req.query.planId);
    if (!plan) {
      return res
        .status(200)
        .json({ message: "Plan Dose Not Exits!", status: false  });
    }

    plan.isActive = !plan.isActive;
    await plan.save();
    return res.status(200).json({ message: "success", status: true  ,plan});
  } catch (error) {
    console.log(error);
        return res
      .status(500)
      .json({ status: false, error: error.message || "Server Error" });
  }
};
