const { response } = require("express")
const Event = require('../models/Event-model');
const url = require('url');
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
                msg: 'get events',
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

        let event = await Event.findOne({ 
            initDate: newEvent.initDate,
            endDate: newEvent.endDate
        });

        if(event) {
            return res.status(400).json({
                ok: false,
                msg: 'Event with this info exists'
            })
        };

        event = new Event(req.body);
        await event.save();

        // Generate JWT
        const token = await generateJWT(req.name, req.email);
    
        res.status(201).json({
            ok: true,
            msg: 'create event',
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
    
    const [user, upEvent] = req.body;
    const url_parts = url.parse(req.url, true);
    let query = url_parts.pathname.substring(1);
    
    try {

        let event = await Event.findOne({ _id: query });

        if(!event) {
            return res.status(400).json({
                ok: false,
                msg: 'Event does not exist'
            })
        };

        query = { _id: url_parts.pathname.substring(1)};

        await Event.updateOne( query, { $set:{
            title: upEvent.title,
            notes: upEvent.notes,
            initDate: upEvent.initDate,
            endDate: upEvent.endDate
        }});

        // Generate JWT
        const token = await generateJWT(req.name, req.email);
    
        res.status(201).json({
            ok: true,
            msg: 'update event'
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

    const [user, delEvent] = req.body;
    const url_parts = url.parse(req.url, true);
    let query = url_parts.pathname.substring(1);
    
    try {

        let event = await Event.findOne({ _id: query });

        if(!event) {
            return res.status(400).json({
                ok: false,
                msg: 'Event does not exist'
            })
        };

        query = { _id: url_parts.pathname.substring(1)};

        await Event.deleteOne(query);

        // Generate JWT
        const token = await generateJWT(req.name, req.email);
    
        res.status(201).json({
            ok: true,
            msg: 'delete event'
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Contact developer to fix issue"
        });
    }
}

module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
}