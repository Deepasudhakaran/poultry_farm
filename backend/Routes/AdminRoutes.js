const express = require('express');
const router = express.Router();
const adminController = require('../Controllers/AdminController');


router.post('/adminlogin', adminController.adminLogin);

router.get('/admin/userlist', adminController.getUserList);
router.get('/adminfeedlist', adminController.getAdminFeedReport);
router.get('/adminegglist', adminController.getAdminEggReport);
router.get('/adminmedicinelist', adminController.getAdminMedicineReport);
router.get('/adminmortalitylist', adminController.getAdminMortalityReport);
router.get('/adminprofile', adminController.getAdminProfile);
router.get('/admincreatemessage', adminController.getAdminNotifionList);

router.delete('/deleteadminfeed/:id', adminController.deleteAdminFeed);
router.delete('/deleteadminegg/:id', adminController.deleteAdminEgg);
router.delete('/deleteadminmedicine/:id', adminController.deleteAdminMedicine);
router.delete('/deleteadminmortality/:id', adminController.deleteAdminMortality);
router.delete('/admin/admincreatemessage/:id', adminController.deleteMessage);

module.exports = router;