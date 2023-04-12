const User = require("./user.model");
const Plan = require("../Plan/plan.model");
const Host = require("../host/host.model");
const { json } = require("express");

exports.userCreate = async (req, res) => {
  try {
    if (!req.body.name || !req.body.age || !req.body.email || !req.body.type) {
      return res
        .status(200)
        .json({ message: "Invalid Details!", status: false });
    }
    const user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.plan = req.body.plan;
    user.age = req.body.age;
    user.type = req.body.type.toLowerCase();

    await user.save();

    return res
      .status(200)
      .json({ message: "User Create Successfully", status: true, user });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, error: error.message || "Server Error" });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.query.userId);
    if (!user) {
      return res
        .status(200)
        .json({ message: "User Does Not Exist!", status: false });
    }
    user.email = req.body.email ? req.body.email : user.email;
    user.name = req.body.name ? req.body.name : user.name;
    user.age = req.body.age ? req.body.age : user.age;
    user.plan = req.body.plan ? req.body.plan : user.plan;
    user.type = user.type.toLowerCase();

    await user.save();
    return res.status(200).json({
      message: "User Update Successfully",
      status: true,
      user,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, error: error.message || "Server Error" });
  }
};

exports.store = async (req, res) => {
  try {
    const user = await User.aggregate([
      {
        $lookup: {
          from: "plans",
          localField: "plan",
          foreignField: "_id",
          as: "plan",
        },
      },
      {
        $unwind: {
          path: "$plan",
          preserveNullAndEmptyArrays: true,
        },
      },

      // -1 descending order , 1 ascending order
      {
        $sort: { createdAt: 1 },
      },
    ]);

    return res
      .status(200)
      .json({ message: "user get successfully", status: true, user });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, error: error.message || "Server Error" });
  }
};

exports.purchasePlan = async (req, res) => {
  try {
    const user = await User.findById(req.query.userId);
    const host = await Host.findById(req.query.hostId);
    const plan = await Plan.findById(req.query.planId);
    if ((!user || !host) && !plan) {
      return res
        .status(200)
        .json({ message: "Invalid Details", status: false });
    }

    if (!user) {
      return res
        .status(200)
        .json({ message: "User Dose Not Exits!", status: false });
    }
    if (req.query.userId) {
      if (!user) {
        return res
          .status(200)
          .json({ message: "User Dose Not Exits!", status: false });
      }
      user.plan = req.query.planId ? req.query.planId : user.plan;

      await user.save();
      return res.status(200).json({
        message: "User Plan Purchase Successfully ",
        status: true,
        user,
      });
    } else {
      if (!host) {
        return res
          .status(200)
          .json({ message: "Host Dose Not Exits!", status: false });
      }
      host.plan = req.query.planId ? req.query.planId : host.plan;

      await host.save();
      return res.status(200).json({
        message: "Host Plan Purchase Successfully ",
        status: true,
        host,
      });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, error: error.message || "Server Error" });
  }
};

exports.LoginUser = async (req, res) => {
  try {
    const { name, email, age } = req.body;
    const userLogin = await User.findOne({
      email: req.body.email,
    });

    console.log("req", req.body);
    if (!req.body.email || !req.body.name || !req.body.age) {
      return res
        .status(200)
        .json({ message: "Invalid Details", status: false });
    }

    console.log("userLogin", userLogin);

    if (!userLogin) {
      return res
        .status(200)
        .json({ message: "Email dose not Exits!", status: false });
    }
    return res.status(200).json({ message: "Login success", status: true });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, error: error.message || "Server Error" });
  }
};
