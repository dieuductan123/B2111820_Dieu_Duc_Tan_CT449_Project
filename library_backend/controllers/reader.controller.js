const Reader = require("../models/reader.model");

const getReaders = async (req,res) => {
  try {
      const readers = await Reader.find();
      res.status(200).json(readers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getReader = async (req, res) => {
  try {
    const reader = await Reader.findOne({ readerId: req.params.readerId });
    if (!reader) {
      return res.status(404).json({ message: "Reader does not exist!" });
    }
    res.status(200).json(reader);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addReader = async (req, res) => {
  try {
    const newReader = await Reader.create(req.body);
    res.status(201).json({message: `Reader ${newReader.lastName} has been added successfully!`, data: newReader});
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateReader = async (req, res) => {
  try {
    const updatedReader = await Reader.findOneAndUpdate(
      { readerId: req.params.readerId },
      req.body,
      { new: true }
    );
    if (!updatedReader) {
      return res.status(404).json({ message: "Reader does not exist!" });
    }
    res.status(200).json({ message: "Reader has been updated successfully!", data: updatedReader });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteReader = async (req, res) => {
  try {
    const deletedReader = await Reader.findOneAndDelete({
      readerId: req.params.readerId,
    });
    if (!deletedReader) {
      return res.status(404).json({ message: "Reader does not exist!" });
    }
    res
      .status(200)
      .json({
        message: ` Reader ${deletedReader.firstName} ${deletedReader.lastName} has been deleted!`,
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteAllReaders = async (req, res) => {
  try {
    await Reader.deleteMany({});
    res.status(200).json({ message: "All readers has been deleted!" });
  } catch (error) {
    res.status(500).json({ message: message.error });
  }
};

module.exports = {
  getReaders,
  getReader,
  addReader,
  updateReader,
  deleteReader,
  deleteAllReaders
}