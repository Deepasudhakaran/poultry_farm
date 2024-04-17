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


exports.deleteuser = async (req, res) => {
  try {
    const deleteduser = await FarmModel.findByIdAndDelete(req.params.id);
    res.json(deleteduser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.blockUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await FarmModel.findByIdAndUpdate(userId, { isBlocked: true }, { new: true });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User blocked successfully', user });
  } catch (error) {
    console.error('Error blocking user:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.unblockUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await FarmModel.findByIdAndUpdate(userId, { isBlocked: false }, { new: true });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User unblocked successfully', user });
  } catch (error) {
    console.error('Error unblocking user:', error.message);
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
    const id = req.params.id; 
    const feeds  = await FeedModel.find({ user: id }).populate('user'); 
    res.status(200).json({ feeds });
  } catch (error) {
    console.error('Error fetching feed list:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


exports.getAdminEggReport = async (req, res) => {
  try {
    const id = req.params.id; 
    const eggs = await EggModel.find( { user: id } ).populate('user')
    res.status(200).json({ eggs });
  } catch (error) {
    console.error('Error fetching egg list:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


exports.getAdminMedicineReport = async (req, res) => {
  try {
    const id = req.params.id;  
    const medicines = await MedicineModel.find({ user: id }).populate('user'); 
    res.status(200).json({ medicines });
  } catch (error) {
    console.error('Error fetching egg list:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};



exports.getAdminMortalityReport = async (req, res) => {
  try {
    const id = req.params.id;  
    const mortalities = await MortalityModel.find({ user: id }).populate('user'); 
    res.status(200).json({ mortalities });
  } catch (error) {
    console.error('Error fetching egg list:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};



exports.getAdminProfile = async (req, res) => {
  try {
    const profiles = await ProfileModel.findById(req.params.id);
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
