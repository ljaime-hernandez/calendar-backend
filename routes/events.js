/*
    User Routes / Events
    host + /api/events
*/

const { Router } = require('express');
const router = Router();
const { check } = require('express-validator');
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events');
const { isDate } = require('../helpers/isDate');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');

// all routers should be validated with JWT
// obtain events CRUD
router.use(validateJWT);

router.get(
    '/',  
    getEvents
);

router.post(
    '/',
    [
        check('start', 'Initial date field is mandatory').custom(isDate),
        check('end', 'End date field is mandatory').custom(isDate),
        check('title', 'Title field is mandatory').not().isEmpty(),
        validateFields
    ],
    createEvent
);

router.put('/:id', 
    [
        check('start', 'Initial date field is mandatory').custom(isDate),
        check('end', 'End date field is mandatory').custom(isDate),
        check('title', 'Title field is mandatory').not().isEmpty(),
        validateFields
    ],
    updateEvent
);

router.delete('/:id',
    deleteEvent
    );

module.exports = router;