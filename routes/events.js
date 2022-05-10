/*
    User Routes / Events
    host + /api/events
*/

const { Router } = require('express');
const router = Router();
const { check } = require('express-validator');
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events');
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
        check('title', 'Title field is mandatory').not().isEmpty(),
        check('notes', 'Notes field is mandatory').not().isEmpty(),
        check('initDate', 'Initial date field is mandatory').isDate(),
        check('endDate', 'End date field is mandatory').isDate(),
        validateFields
    ],
    createEvent
);

router.put('/:id', 
    [
        check('title', 'Title field is mandatory').not().isEmpty(),
        check('notes', 'Notes field is mandatory').not().isEmpty(),
        check('initDate', 'Initial date field is mandatory').isDate(),
        check('endDate', 'End date field is mandatory').isDate(),
        validateFields
    ],
    updateEvent
);

router.delete('/:id',
    deleteEvent
    );

module.exports = router;