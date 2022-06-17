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

// retrieves all events with a get method
router.get(
    '/',  
    getEvents
);

// creates new event with a post method
router.post(
    '/',
    [ // middleware checking for start field to be a date, for end field to be a date,
      // for title field to not be empty this array has a final method called validateFields which will
      // process any error checked and will return the request with an specific body message based on the 
      // check parameters.
        check('start', 'Initial date field is mandatory').custom(isDate),
        check('end', 'End date field is mandatory').custom(isDate),
        check('title', 'Title field is mandatory').not().isEmpty(),
        validateFields
    ],
    createEvent
);

// updates existing event with a put method
router.put('/:id', 
    [ // middleware checking for start field to be a date, for end field to be a date,
      // for title field to not be empty this array has a final method called validateFields which will
      // process any error checked and will return the request with an specific body message based on the 
      // check parameters.
        check('start', 'Initial date field is mandatory').custom(isDate),
        check('end', 'End date field is mandatory').custom(isDate),
        check('title', 'Title field is mandatory').not().isEmpty(),
        validateFields
    ],
    updateEvent
);

// deletes existing event with a delete method
router.delete('/:id',
    deleteEvent
    );

module.exports = router;