const Duration = require("./duration.model");
const User = require("../user/user.model");
const { json } = require("express");

exports.createDuration = async (req, res) => {
  try {
    const reserverId = await User.findById(req.query.reserverId);
    const callerId = await User.findById(req.query.callerId);

    if (
      !req.body.type ||
      !req.body.duration ||
      !req.body.coin ||
      !reserverId ||
      !reserverId
    ) {
      return res
        .status(200)
        .json({ message: "Invalid Details", status: false });
    }
    const duration = new Duration();
    duration.type = req.body.type;
    duration.reserverId = req.query.reserverId;
    duration.callerId = req.query.callerId;
    duration.coin = req.body.coin;
    duration.duration = req.body.duration;

    await duration.save();

    return res
      .status(200)
      .json({ message: "Duration Create Successfully", duration });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, error: error.message || "Server Error" });
  }
};
0;
exports.store = async (req, res) => {
  try {
    // const id = await User.findById(req.query.userId);
    // if (!id) {
    //   return res
    //     .status(200)
    //     .json({ message: "Use dose not exist!", status: false });
    // }

    const duration = await Duration.aggregate([
      // { $match: { callerId: id._id } },
      {
        $lookup: {
          from: "users",
          localField: "callerId",
          foreignField: "_id",
          as: "caller",
        },
      },
      {
        $unwind: {
          path: "$caller",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "reserverId",
          foreignField: "_id",
          as: "reserverId",
        },
      },
      {
        $unwind: {
          path: "$reserverId",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $group: {
          _id: "$caller._id",
          callerName: { $first: "$caller.name" },
          receiverName: { $first: "$reserverId.name" },
          coin: { $sum: "$coin" },
          duration: { $sum: "$duration" },
          Date: { $first: "$Date" },
        },
      },
      // {
      //   $project: {
      //     coin: 1,
      //     callerName: 1,
      //     duration: 1,
      //     Date: 1,
      //     receiverName: 1,
      //   },
      // },
    ]);

    return res
      .status(200)
      .json({ message: "Duration get successfully", duration });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, error: error.message || "Server Error" });
  }
};
