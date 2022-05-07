const {Router} = require('express');
const router = Router();
const {check} = require('express-validator');
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events');

// all routers should be validated with JWT
// obtain events CRUD


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
    ],
    createEvent
);

router.put('/:id', updateEvent);

router.delete('/:id', deleteEvent);

module.exports = router;