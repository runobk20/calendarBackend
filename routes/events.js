/*
    Rutas de eventos
    host + /api/events
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events');
const { isDate } = require('../helpers/isDate');
const { validateFields } = require('../middlewares/fieldValidator');
const { validateJWT } = require('../middlewares/JWTvalidator');
const router = Router();

router.use(validateJWT);

//Obtener eventos
router.get('/', getEvents);

//Agregar eventos
router.post(
    '/', 
    [
        check('title', 'Title is required').not().isEmpty(),
        check('start', 'Starting date is required').custom(isDate),
        check('end', 'Ending date is required').custom(isDate),
        validateFields
    ], 
    createEvent);

//Actualizar eventos
router.put(
    '/:id',
     [
        check('title', 'Title is required').not().isEmpty(),
        check('start', 'Starting date is required').custom(isDate),
        check('end', 'Ending date is required').custom(isDate),
        validateFields
     ], 
     updateEvent);

//Eliminar eventos
router.delete('/:id', deleteEvent);

module.exports = router;