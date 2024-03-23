// const express = require('express')
// const cors = require('cors')
// const mongoose = require('mongoose')
// const {FarmModel,MortalityModel,EggModel,FeedModel,MedicineModel} =require('./models/Farm')
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');
// const cookieParser = require('cookie-parser')
// require('dotenv').config();
// const {AdminModel ,adminSchema} =require('./Models/Admin.js')
// const secretKey = process.env.SECRET_KEY;
// const dbConnectionString = process.env.DB_CONNECTION_STRING;
// const ProfileModel = require('./models/profile')
// const session = require('express-session');



// const app= express()
// app.use(cors({
//   origin: ["http://localhost:3000"],
//   methods: ["GET", "POST","DELETE","PUT"],
//   credentials:true
// }))
// app.use(express.json())
// app.use(cookieParser())
// app.use(
//   session({
//     secret: secretKey,
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//       secure: false,
//     },
//   })
// );
 


// // Ensure that DB_CONNECTION_STRING is defined
// if (!dbConnectionString) {
//   console.error('DB_CONNECTION_STRING is not defined. Please set the environment variable.');
//   process.exit(1);
// }



// mongoose.connect(dbConnectionString,{
//   useNewUrlParser: true ,
//   useUnifiedTopology: true,
// })
//     .then(() => console.log('connected to MongoDB'))
//     .catch((err) => console.log(err));


//     const verifyUser = (req, res, next) => {
//       const token = req.cookies.token;
//       if (!token) {
//         return res.status(400).json({ error: "The token is missing" });
//       } else {
//         jwt.verify(token, secretKey, (err, decoded) => {
//           if (err) {
//             return res.status(401).json({ error: "The token is wrong" });
//           } else {
//             req.email = decoded.email;
//             next();
//           }
//         });
//       }
//     };
    



// app.get('/', verifyUser, (req, res) => {
//     return res.json({valid:true, message: "authorized"})
//     b 
// })


  
// // API start
// app.get('/', async (req, res) => {
//   res.send({ result: "Successfull..!" })

// })



// // <------------user login and register-------> 


// app.post('/register', (req, res) => {
//   const { username, email, password } = req.body;
//   bcrypt.hash(password, 10)
//     .then(hash => {
//       FarmModel.create({ username, email, password: hash, }) // Fixed: pass 'password' instead of 'confirmpassword'
//         .then(user => res.json({ Status: "Success"}))
//         .catch(err => res.json(err));
//     })
//     .catch(err => res.json(err));
// });



// app.post('/login', (req, res) => {
//   const { email, password } = req.body;

//   FarmModel.findOne({ email: email })
//     .then(user => {
//       if (user) {
//         bcrypt.compare(password, user.password, (err, response) => {
//           if (err) {
//             return res.status(500).json({ error: "Internal server error" });
//           }
//           if (response) {
//             const token = jwt.sign({ email: user.email }, "jwt-secret-key", { expiresIn: '1d' });
//             res.cookie('token', token);
//             return res.json({ status: "Success" });
//           } else {
//             return res.status(401).json({ error: "Incorrect password" });
//           }
//         });
//       } else {
//         return res.status(404).json({ error: "No record exists" });
//       }
//     })
//     .catch(error => {
//       console.error('Login error:', error);
    
//       // Provide more details about the error in the response
//       return res.status(401).json({ error: "Unauthorized: Invalid credentials", details: error.message });
//     });
// });




//   // ---------------Adminlogin---------
//   app.post('/admin/login', async (req, res) => {
//     try {
//       const { email, password } = req.body;
//       const admin = await AdminModel.findOne({ email });

// if (!admin) {
//   return res.status(401).json({ success: false, message: 'Invalid admin credentials' });
// }
  
//       // if (!admin || !(await bcrypt.compare(password, admin.password))) {
//       //   return res.status(401).json({ success: false, message: 'Invalid admin credentials' });
//       // }
//       // Set the admin details in the session
//       req.session.admin = {
//         email: admin.email,
//         adminId: admin._id,
//       };
//       res.json({ success: true, message: 'Admin login successful' });
//     } catch (error) {
//       console.error('Error during admin login:', error);
//       res.status(500).json({ success: false, message: 'Internal Server Error' });
//     }
//   });
  

  




// // -----mortality------

// app.post('/mortality', async (req, res) => {
//   try {
//     const { date, selectedName, mortality } = req.body;
//     const newUser = new MortalityModel({ date, selectedName, mortality });
//     await newUser.save();
//     res.status(201).json({ user: newUser }); // Include the saved user data in the response
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "internal server error" });
//   }
// });



// app.get('/mortality', (req, res) => {
//   MortalityModel.find()
//   .then(musers => res.json(musers))
//   .catch(err => res.json(err))
//  });



//  app.delete('/mortality/:id',  (req, res) => {
//   const {id} = req.params;
//   MortalityModel.findByIdAndDelete({_id: id})
//   .then(musers => res.json(musers))
//   .catch(err => res.json(err)) 
//  });

//  app.put('/mortality/:id',  (req, res) => {
//   console.log(req.body);
//   const id= req.params.id; 
// MortalityModel.findByIdAndUpdate({_id: id},{date :req.body.date, selectedName:req.body.selectedName, mortality:req.body.mortality},{new: true})
//   .then(users => res.json(users))
//   .catch(err => res.json(err))
// });


//   // ----egg----


//   app.post('/egg',async (req, res) => {
//     try {
//       const { edate, selectedName, enumber, broken} = req.body;
//       const newUser = new EggModel({edate, selectedName, enumber,broken});
//       await newUser.save();
//       res.status(201).json({ user: newUser }); // Include the saved user data in the response
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: "internal server error" });
//     }
//   });
  


//   app.get('/egg',(req, res) => {
//     EggModel.find()
//     .then(eusers => res.json(eusers))
//     .catch(err => res.json(err))
//    });


//    app.put('/egg/:id',  (req, res) => {
//     console.log(req.body);
//     const id= req.params.id; 
//    EggModel.findByIdAndUpdate({_id: id},{edate :req.body.edate, selectedName:req.body.selectedName, enumber:req.body.enumber,  broken:req.body.broken},{new: true})
//     .then(users => res.json(users))
//     .catch(err => res.json(err))
//   });
  



//    app.delete('/egg/:id', (req, res) => {
//     const {id} = req.params;
//     EggModel.findByIdAndDelete({_id: id})
//     .then(eusers => res.json(eusers))
//     .catch(err => res.json(err))
//    });

//   //  ----feed-----

//   app.post('/feed',async (req, res) => {
//     try {
//       const { selectedvalue, consume, receive, fdate } = req.body;
//       const newUser = new FeedModel({selectedvalue, consume, receive, fdate});
//       await newUser.save();
//       res.status(201).json({ user: newUser }); // Include the saved user data in the response
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: "internal server error" });
//     }
//   });
  


//   app.get('/feed', (req, res) => {
//     FeedModel.find()
//     .then(fusers => res.json(fusers))
//     .catch(err => res.json(err))
//    });



//    app.delete('/feed/:id', (req, res) => {
//     const {id} = req.params;
//     FeedModel.findByIdAndDelete({_id: id})
//     .then(fusers => res.json(fusers))
//     .catch(err => res.json(err))
//    });



//    app.put('/feed/:id',  (req, res) => {
//     console.log(req.body);
//     const id= req.params.id; 
//     FeedModel.findByIdAndUpdate({_id: id},{selectedvalue :req.body.selectedvalue, consume:req.body.consume,  receive:req.body.receive, fdate:req.body.fdate},{new: true})
//     .then(users => res.json(users))
//     .catch(err => res.json(err))
//   });
  

//   //  ----medicine----


//   app.post('/medicine',  async (req, res) => {
//     try {
//       const {  date, selectedmedicine } = req.body;
//       const newUser = new MedicineModel({  date, selectedmedicine });
//       await newUser.save();
//       res.status(201).json({ user: newUser });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: "internal server error" });
//     }
//   });
  
//   app.get('/medicine',(req, res) => {
//     MedicineModel.find()
//     .then(musers => res.json(musers))
//     .catch(err => res.json(err))
//    });


  

// // Example: Allow only 'admin' users to access the delete route
// app.delete('/medicine/:id',   (req, res) => {
//   const { id } = req.params;
//   MedicineModel.findByIdAndDelete({ _id: id })
//     .then(mdusers => res.json(mdusers))
//     .catch(err => res.json(err));
// });



// app.put('/medicine/:id',  (req, res) => {
//   console.log(req.body);
//   const id= req.params.id; 
//   MedicineModel.findByIdAndUpdate({_id: id},{date :req.body.date, selectedmedicine:req.body.selectedmedicine},{new: true})
//   .then(users => res.json(users))
//   .catch(err => res.json(err))
// });
// // -----registered users----


// app.get('/register', async (req, res) => {
//   try {
//     const farms = await FarmModel.find();
//     res.json({ data: farms }); // Assuming you want to send an array of farms to the frontend
//   } catch (error) {
//     console.error('Error fetching profiles:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });
// // <--------------profile--------->



// app.post('/profile', async (req, res) => {
//   try {
//     const { farmname, ownername, email, farmid, address, phoneno, houseno, capacity,isBroiler, isLayer,isBreeder, birdno,  broilerno, breederno, layerno } = req.body;
//     const newUser = new ProfileModel({ farmname, ownername, email, farmid, address, phoneno, houseno, capacity, isBroiler,isLayer, isBreeder, birdno,  broilerno, breederno, layerno });
//     await newUser.save();
//     res.status(201).json({ user: newUser }); 
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "internal server error" });
//   }
// });




// app.get('/profile', async (req, res) => {
//   try {
//     const profile = await ProfileModel.findOne();
//     res.json(profile);
//   } catch (error) {
//     console.error('Error fetching profile:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });


// // --------logout-------

// app.get('/logout',(req, res) =>{
//   res.clearCookie('token');
//   return res.json("Success")
// })
//  const port = process.env.PORT || 8080;
//   app.listen(port ,()=>{
//     console.log(`server Started ${port}`)
//   })