const express = require('express');
const router = express.Router();
const userController = require('../Controllers/UserController');
const userAuthMiddleware = require('../Middlewares/userAuth')


router.post('/signup', userController.signUp);
router.post('/login', userController.userLogin);
router.post('/feed/:userId', userController.feedReport);
router.post('/:userId/egg', userController.eggReport);
router.post('/medicine', userController.medicineReport);
router.post('/mortality', userController.mortalityReport);
router.post('/editprofile', userController.userProfile);
router.post('/createmessage', userController.Createusermessage);

router.get('/userheader', userAuthMiddleware, userController.userHeader);
router.get('/feedlist/:userId', userController.getFeedReport);
router.get('/egglist/:userId', userController.getEggReport);
router.get('/medicinelist', userController.getMedicineReport);
router.get('/mortalitylist', userController.getMortalityReport);
router.get('/profile', userController.getProfile);

router.delete('/deletefeed/:id', userController.deleteFeed);
router.delete('/deleteegg/:id', userController.deleteEgg);
router.delete('/deletemedicine/:id', userController.deleteMedicine);
router.delete('/deletemortality/:id', userController.deleteMortality);

router.put('/updatemedicine/:id', userController.updateMedicine);
router.put('/updatefeed/:id', userController.updateFeed);
router.put('/updatemortality/:id', userController.updateMortality);
router.put('/updateegg/:id', userController.updateEgg);
module.exports = router;