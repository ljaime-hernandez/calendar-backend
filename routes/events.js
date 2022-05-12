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
        check('initDate', 'Initial date field is mandatory').custom(isDate),
        check('endDate', 'End date field is mandatory').custom(isDate),
        check('title', 'Title field is mandatory').not().isEmpty(),
        check('notes', 'Notes field is mandatory').not().isEmpty(),
        validateFields
    ],
    createEvent
);

router.put('/:id', 
    [
        check('initDate', 'Initial date field is mandatory').custom(isDate),
        check('endDate', 'End date field is mandatory').custom(isDate),
        check('title', 'Title field is mandatory').not().isEmpty(),
        check('notes', 'Notes field is mandatory').not().isEmpty(),
        validateFields
    ],
    updateEvent
);

router.delete('/:id',
    deleteEvent
    );

module.exports = router;