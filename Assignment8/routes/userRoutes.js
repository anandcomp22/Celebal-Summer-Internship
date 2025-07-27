const express = require('express');
const router = express.Router();
const { getUsers, getUserById, createUser, updateUser, deleteUser, } = require('../controllers/userController');
const upload = require('../middlewares/multer');
const { uploadFile } = require('../controllers/uploadController');

router.post('/', upload.single('file'), uploadFile);

router.get('/', getUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
