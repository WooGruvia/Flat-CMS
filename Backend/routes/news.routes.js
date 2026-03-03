const express = require('express');
const router = express.Router();

const { login, getData, updateSite, updateSection, updateItem, addItem, deleteItem } = require('../controllers/newsController');
const { validateSection, validateItem, validateSite } = require('../middleware/validate');

router.post('/login', login);
router.get('/data', getData);
router.put('/site', validateSite, updateSite);
router.put('/section/:id', validateSection, updateSection);
router.post('/section/:sectionId/item', validateItem, addItem);
router.put('/section/:sectionId/item/:itemId', validateItem, updateItem);
router.delete('/section/:sectionId/item/:itemId', deleteItem);

module.exports = router;