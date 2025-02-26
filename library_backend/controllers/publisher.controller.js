const Publisher = require('../models/publisher_model');

// Xem tat ca nha xuat ban
const getPublishers = async (req, res) => {
    try {
      const publishers = await Publisher.find({});
      res.status(200).json(publishers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Xem 1 nha xuat ban theo id
const getPublisher = async (req, res) => {
  try {
    const publisher = await Publisher.findOne({ publisherId: req.params.publisherId });
    if (!publisher)
      return res.status(404).json({ message: "Publisher does not exist to retrieve !" });
    res.status(200).json(publisher);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Them nha xuat ban
const addPublisher = async (req, res) => {
  try {
      const newPublisher = await Publisher.create(req.body);
    res.status(201).json(newPublisher);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Cap nhat thong tin nha xuat ban
const updatePublisher = async (req, res) => {
  try {
    const updatedPublisher = await Publisher.findOneAndUpdate(
      { publisherId: req.params.publisherId },
      req.body,
      { new: true }
    );
    if (!updatedPublisher)
      return res.status(404).json({ message: "Publisher does not exits to update" });
    res.status(200).json(updatedPublisher);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Xoa 1 nha xuat ban
const deletePublisher = async(req, res) => {
  try {
    const { publisherId } = req.params;
    const deletedPublisher = await Publisher.findOneAndDelete({
      publisherId//: req.params.publisherId,
    });
    if (!deletedPublisher)
      return res.status(404).json({ message: "Publisher does not exist to delete" });
    res.status(200).json({ message: `Publisher ${ deletedPublisher.name } has been deleted!` });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const deleteAllPublishers = async (req, res) => {
  try {
      await Publisher.deleteMany({});
      res.status(200).json({ message: "All publishers have been deleted!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getPublishers,
  getPublisher,
  addPublisher,
  updatePublisher,
  deletePublisher,
  deleteAllPublishers
}

