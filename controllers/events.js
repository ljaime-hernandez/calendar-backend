const { response } = require("express")
const Event = require('../models/Event-model');
const { generateJWT } = require('../helpers/jwt');


const getEvents = async(req, res = response) => {

    let events = await Event.find();

    try {

        if(!events) {
            return res.status(400).json({
                ok: false,
                msg: 'No events found'
            });
        };

        const token = await generateJWT(req.name, req.email);
        
        res.status(201).json({
                ok: true,
                msg: 'obtain events',
                token
        });
    
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Contact developer to fix issue"
        });
    }

}

const createEvent = async(req, res = response) => {

    const [user, newEvent] = req.body;
    try {

        let event = await Event.findOne({ _id: newEvent._id });
        console.log(event);
        if(!event) {
            return res.status(400).json({
                ok: false,
                msg: 'Event with this id dont exists'
            })
        };

        event = new Event(newEvent);
        console.log(user, event);
        await event.update();

        // Generate JWT
        const token = await generateJWT(req.name, req.email);
    
        res.status(201).json({
            ok: true,
            msg: 'create events',
            token
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Contact developer to fix issue"
        });
    }
}

const updateEvent = async(req, res = response) => {
    
    const { _id } = req.body;
    
    try {

        let event = await Event.findOne({ _id });

        if(!event) {
            return res.status(400).json({
                ok: false,
                msg: 'Event does not exist'
            })
        };

        await event.save();

        // Generate JWT
        const token = await generateJWT(event.title, event.notes);
    
        res.status(201).json({
            ok: true,
            msg: 'update events'
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Contact developer to fix issue"
        });
    }
}

const deleteEvent = async(req, res = response) => {

    const { _id } = req.body;
    
    try {

        let event = await Event.findOne({ _id });

        if(!event) {
            return res.status(400).json({
                ok: false,
                msg: 'Event does not exist'
            })
        };

        await event.delete();

        // Generate JWT
        const token = await generateJWT(event.title, event.notes);
    
        res.status(201).json({
            ok: true,
            msg: 'update events'
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Contact developer to fix issue"
        });
    }
}





// {
//     ok: true,
//     msg: 'update events'
// }

// {
//     ok: true,
//     msg: 'delete events'
// }

module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
}