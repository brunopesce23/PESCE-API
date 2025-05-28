const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/productos.controller');

router.get('/', ctrl.getProductos);
router.post('/', ctrl.createProducto);
router.put('/:id', ctrl.updateProducto);
router.delete('/:id', ctrl.deleteProducto);

module.exports = router;


module.exports = router;
