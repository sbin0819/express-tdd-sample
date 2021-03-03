var express = require('express');
var router = express.Router();
var ctrl = require('./user.ctrl');

router.get('/', ctrl.index);

router.get('/:id', ctrl.show);

router.delete('/:id', ctrl.destroy);

router.post('/', ctrl.create);

router.put('/:id', ctrl.update);

module.exports = router;
