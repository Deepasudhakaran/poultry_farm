const express = require('express');
const router = express.Router();
const adminController = require('../Controllers/AdminController');


router.post('/adminlogin', adminController.adminLogin);



router.put('/admin/block/:userId', adminController.blockUser);
router.put('/admin/unblock/:userId', adminController.unblockUser);


router.get('/admin/userlist', adminController.getUserList);
router.get('/adminfeedlist/:id', adminController.getAdminFeedReport);
router.get('/adminegglist/:id', adminController.getAdminEggReport);
router.get('/adminmedicinelist/:id', adminController.getAdminMedicineReport);
router.get('/adminmortalitylist/:id', adminController.getAdminMortalityReport);
router.get('/adminprofile/:id', adminController.getAdminProfile);
router.get('/admincreatemessage', adminController.getAdminNotifionList);


router.delete('/deleteuser/:id', adminController.deleteuser);

router.delete('/deleteadminfeed/:id', adminController.deleteAdminFeed);
router.delete('/deleteadminegg/:id', adminController.deleteAdminEgg);
router.delete('/deleteadminmedicine/:id', adminController.deleteAdminMedicine);
router.delete('/deleteadminmortality/:id', adminController.deleteAdminMortality);
router.delete('/admin/admincreatemessage/:id', adminController.deleteMessage);

module.exports = router;