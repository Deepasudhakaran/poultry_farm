const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const { EggModel } = require('../models/Egg');
const FarmModel = require('../models/Farm');
const FeedModel = require('../models/Feed');
const MedicineModel = require('../models/Medicine');
const MortalityModel = require('../models/Mortality');
const ProfileModel = require('../models/profile');
const Message = require('../models/Contact');
const maxAge = 3 * 24 * 60 * 60;


require('dotenv').config();

const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_KEY, {
    expiresIn: maxAge,
  })
}



exports.signUp = async (req, res) => {
  try {
    const newUser = new FarmModel({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    await newUser.save();
    const token = createToken(newUser._id);
    console.log('User registered successfully:', newUser, token);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};



exports.userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await FarmModel.findOne({ email });

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }

    const token = createToken(user._id);
    console.log('User logged in successfully.', token);
    res.status(200).json({ message: 'Login successful', user, token, status: true });
  } catch (error) {
    console.error('Error logging in:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};




exports.userHeader = async (req, res) => {
  try {
    const user = req.user;
    res.json({ user: user, status: true })
  } catch (error) {
    res.json({ message: 'internal server error', status: false })
  }
};





// exports.feedReport = async (req, res) => {
//   try {
//     const create = new FeedModel({
//       consume: req.body.consume,
//       receive: req.body.receive,
//       date: req.body.date,
//       selectedvalue: req.body.selectedvalue,
//     });
//     await create.save();
//     res.status(201).json({ message: 'Post creation successful' });
//   } catch (error) {
//     console.error('Error creating post:', error.message);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// };



exports.feedReport = async (req, res) => {
  try {
    const userId = req.params.userId; 
    console.log('userId:',userId);
    const { consume, receive, date, selectedvalue } = req.body;
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }
    const user = await  FarmModel.findById(userId).populate('post');

    if(!user){
      throw new Error('user not found');
    }
    const create = new FeedModel({
      consume,
      receive,
      date,
      selectedvalue,
      user: userId, 
    });

    await create.save();
    user.post.push(create);
    await user.save();
    res.status(201).json({ message: 'Feed report creation successful' });
  } catch (error) {
    console.error('Error creating feed report:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};




// exports.feedReport = async (req, res) => {
//   try {
//     const userId = req.userId; 
//     const { consume, receive, date, selectedvalue } = req.body;
//     const user = await FarmModel.findById(userId);

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     const create = new FeedModel({
//       consume,
//       receive,
//       date,
//       selectedvalue,
//       user: userId, 
//     });

//     await create.save();
//     user.feed.push(create);
//     await user.save();
//     res.status(201).json({ message: 'Feed report creation successful' });
//   } catch (error) {
//     console.error('Error creating feed report:', error.message);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// };


exports.getFeedReport = async (req, res) => {
  try {
    const userId = req.params.userId;
    const post = await FeedModel.find({ user: userId });
    res.status(200).json({ post });
  } catch (error) {
    console.error('Error fetching feed list:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};





exports.deleteFeed = async (req, res) => {
  try {
    const deletedfeed = await FeedModel.findByIdAndDelete(req.params.id);
    res.json(deletedfeed);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};




exports.updateFeed = async (req, res) => {
  try {
    const { id } = req.params;
    const { consume, receive, date, selectedvalue } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid medicine ID' });
    }

    const feed = await FeedModel.findById(id);

    if (!feed) {
      return res.status(404).json({ message: 'feed not found' });
    }

    feed.consume = consume;
    feed.receive = receive;
    feed.date = date;
    feed.selectedvalue = selectedvalue;

    await feed.save();

    res.status(200).json({ message: 'Medicine updated successfully' });
  } catch (error) {
    console.error('Error updating medicine:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// ---------------Egg--------------


exports.eggReport = async (req, res) => {
  try {
    const create = new EggModel({
      date: req.body.date,
      selectedName: req.body.selectedName,
      total: req.body.total,
      broken: req.body.broken,
      createdBy: req.params.userId 

    });
    await create.save();
    res.status(201).json({ message: 'Egg report creation successful' });
  } catch (error) {
    console.error('Error creating post:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};



exports.getEggReport = async (req, res) => {
  try {
    const eggs = await EggModel.find({ createdBy: req.params.userId });
    res.status(200).json({ eggs });
  } catch (error) {
    console.error('Error fetching egg list:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};




exports.deleteEgg = async (req, res) => {
  try {
    const deletedegg = await EggModel.findByIdAndDelete(req.params.id);
    res.json(deletedegg);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


exports.updateEgg = async (req, res) => {
  try {
    const { id } = req.params;
    const { date,  selectedName, total, broken } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid medicine ID' });
    }

    const egg = await EggModel.findById(id);

    if (!egg) {
      return res.status(404).json({ message: 'egg not found' });
    }

    egg.date = date;
    egg.selectedName = selectedName;
    egg.total = total;
    egg.broken = broken;

    await egg.save();

    res.status(200).json({ message: 'egg report updated successfully' });
  } catch (error) {
    console.error('Error updating egg:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
// ------------medicine-----------------

exports.medicineReport = async (req, res) => {
  try {
    const create = new MedicineModel({
      date: req.body.date,
      selectedmedicine: req.body.selectedmedicine,

    });
    await create.save();
    res.status(201).json({ message: 'Medicine report creation successful' });
  } catch (error) {
    console.error('Error creating post:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};




exports.getMedicineReport = async (req, res) => {
  try {
    const medicines = await MedicineModel.find();
    res.status(200).json({ medicines });
  } catch (error) {
    console.error('Error fetching egg list:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.deleteMedicine = async (req, res) => {
  try {
    const deletedmedicine = await MedicineModel.findByIdAndDelete(req.params.id);
    res.json(deletedmedicine);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.updateMedicine = async (req, res) => {
  try {
    const { id } = req.params;
    const { date, selectedmedicine } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid medicine ID' });
    }

    let medicine = await MedicineModel.findById(id);

    if (!medicine) {
      return res.status(404).json({ message: 'Medicine not found' });
    }

    medicine.date = date;
    medicine.selectedmedicine = selectedmedicine;

    await medicine.save();

    res.status(200).json({ message: 'Medicine updated successfully' });
  } catch (error) {
    console.error('Error updating medicine:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


// ----------------mortality--------------

exports.mortalityReport = async (req, res) => {
  try {
    const create = new MortalityModel({
      date: req.body.date,
      mortality: req.body.mortality,
      selectedvalue: req.body.selectedvalue,
    });
    await create.save();
    res.status(201).json({ message: 'Egg report creation successful' });
  } catch (error) {
    console.error('Error creating post:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


exports.getMortalityReport = async (req, res) => {
  try {
    const mortalities = await MortalityModel.find();
    res.status(200).json({ mortalities });
  } catch (error) {
    console.error('Error fetching egg list:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.deleteMortality = async (req, res) => {
  try {
    const deletedmortality = await MortalityModel.findByIdAndDelete(req.params.id);
    res.json(deletedmortality);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


exports.updateMortality = async (req, res) => {
  try {
    const { id } = req.params;
    const { date, selectedvalue, mortality } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid medicine ID' });
    }

    const mortalities = await MortalityModel.findById(id);

    if (!mortalities) {
      return res.status(404).json({ message: 'Medicine not found' });
    }

    mortalities.date = date;
    mortalities.mortality = mortality;
    mortalities.selectedvalue = selectedvalue;
    await mortalities.save();

    res.status(200).json({ message: ' mortality report updated successfully' });
  } catch (error) {
    console.error('Error updating  mortality:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


exports.userProfile = async (req, res) => {
  try {
    const create = new ProfileModel({
      farmname: req.body.farmname,
      ownername: req.body.ownername,
      email: req.body.email,
      farmid: req.body.farmid,
      address: req.body.address,
      phoneno: req.body.phoneno,
      houseno: req.body.houseno,
      capacity: req.body.capacity,
      isBroiler: req.body.isBroiler,
      isLayer: req.body.isLayer,
      isBreeder: req.body.isBreeder,
      birdno: req.body.birdno,
      broilerno: req.body.broilerno,
      breederno: req.body.breederno,
      layerno: req.body.layerno,

    });
    await create.save();
    res.status(201).json({ message: 'Egg report creation successful' });
  } catch (error) {
    console.error('Error creating post:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


exports.getProfile = async (req, res) => {
  try {
    const profiles = await ProfileModel.find();
    res.status(200).json({ profiles });
  } catch (error) {
    console.error('Error fetching egg list:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


exports.Createusermessage = async (req, res) => {
  try {
    const create = new Message({
      name: req.body.name,
      message: req.body.message,
    });
    await create.save();
    res.status(201).json({ message: 'message creation successful' });
  } catch (error) {
    console.error('Error creating post:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

