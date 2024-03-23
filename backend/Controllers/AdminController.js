require('dotenv').config();
const bcrypt = require('bcrypt')
const mongoose = require('mongoose');
const maxAge = 3 * 24 * 60 * 60;
const jwt = require('jsonwebtoken');

const FarmModel = require("../models/Farm");
const AdminModel = require('../models/Admin');
const MortalityModel = require('../models/Mortality');
const MedicineModel = require('../models/Medicine');
const { EggModel } = require('../models/Egg');
const FeedModel = require('../models/Feed');
const ProfileModel = require('../models/profile');
const Message = require('../models/Contact');


const createAdminToken = (id) => {
  return jwt.sign({ id }, process.env.Admin_SECRET_KEY, {
    expiresIn: maxAge,
  });
}



exports.getUserList = async (req, res) => {
  try {
    const users = await FarmModel.find();
    res.status(200).json({ users });
  } catch (error) {
    console.error('Error fetching user list:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


exports.adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await AdminModel.findOne({ email: email });
    if (admin) {
      const auth = await bcrypt.compare(password, admin.password);
      console.log(auth);
      if (auth) {
        const token = createAdminToken(admin._id);
        res.json({ message: 'Login Successfull', admin, token, status: true });
        return;
      } else {
        res.json({ message: 'Password in correct ', status: false });
        return;
      }
    } else {
      res.json({ message: 'Admin not found ', status: false })
      return;
    }
  } catch (error) {
    console.error('Wrror logging in ', error.message);
    res.status(500).json({ message: 'internal server eroor' });
  }
};


exports.getAdminFeedReport = async (req, res) => {
  try {
    const feeds = await FeedModel.find();
    res.status(200).json({ feeds });
  } catch (error) {
    console.error('Error fetching feed list:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


exports.getAdminEggReport = async (req, res) => {
  try {
    const eggs = await EggModel.find();
    res.status(200).json({ eggs });
  } catch (error) {
    console.error('Error fetching egg list:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


exports.getAdminMedicineReport = async (req, res) => {
  try {
    const medicines = await MedicineModel.find();
    res.status(200).json({ medicines });
  } catch (error) {
    console.error('Error fetching egg list:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};



exports.getAdminMortalityReport = async (req, res) => {
  try {
    const mortalities = await MortalityModel.find();
    res.status(200).json({ mortalities });
  } catch (error) {
    console.error('Error fetching egg list:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};



exports.getAdminProfile = async (req, res) => {
  try {
    const profiles = await ProfileModel.find();
    res.status(200).json({ profiles });
  } catch (error) {
    console.error('Error fetching egg list:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


exports.deleteAdminFeed = async (req, res) => {
  try {
    const deletedfeed = await FeedModel.findByIdAndDelete(req.params.id);
    res.json(deletedfeed);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};




exports.deleteAdminEgg = async (req, res) => {
  try {
    const deletedegg = await EggModel.findByIdAndDelete(req.params.id);
    res.json(deletedegg);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};





exports.deleteAdminMedicine = async (req, res) => {
  try {
    const deletedmedicine = await MedicineModel.findByIdAndDelete(req.params.id);
    res.json(deletedmedicine);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


exports.deleteAdminMortality = async (req, res) => {
  try {
    const deletedmortality = await MortalityModel.findByIdAndDelete(req.params.id);
    res.json(deletedmortality);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


exports.getAdminNotifionList = async (req, res) => {
  try {
    const users = await Message.find();
    res.status(200).json({ users });
  } catch (error) {
    console.error('Error fetching user list:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};




exports.deleteMessage = async (req, res) => {
  try {
    const deletedMessage = await Message.findByIdAndDelete(req.params.id);
    res.json(deletedMessage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
