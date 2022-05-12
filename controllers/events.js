const { response } = require("express")
const Event = require('../models/Event-model');
const { generateJWT } = require('../helpers/jwt');


const getEvents = async(req, res = response) => {

    let events = await Event.find().populate('user', 'name');

    try {

        if(!events) {
            return res.status(400).json({
                ok: false,
                msg: 'No events found'
            });
        };
        
        res.status(201).json({
                ok: true,
                events
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

    const newEvent = new Event(req.body);

    try {

        newEvent.user = req.uid;
        const savedEvent = await newEvent.save();

        res.status(201).json({
            ok: true,
            event: savedEvent
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
    
    const eventID = req.params.id;
    const uid = req.uid;

    try {

        const event = await Event.findById(eventID);

        if(!event) {
            return res.status(404).json({
                ok: false,
                msg: 'Event does not exist'
            })
        };

        if(event.user.toString() !== uid){
            return res.status(401).json({
                ok: false,
                msg: 'User not authorized to change this event'
            })
        }

        const upEvent = {
            ...req.body,
            user: uid
        }

        const updatedEvent = await Event.findByIdAndUpdate( eventID, upEvent, {new: true});
    
        res.status(201).json({
            ok: true,
            event: updatedEvent
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

    const eventID = req.params.id;
    const uid = req.uid;
    
    try {

        const event = await Event.findById(eventID);

        if(!event) {
            return res.status(404).json({
                ok: false,
                msg: 'Event does not exist'
            })
        };

        if(event.user.toString() !== uid){
            return res.status(401).json({
                ok: false,
                msg: 'User not authorized to delete this event'
            })
        }

        const deletedEvent = await Event.findByIdAndDelete(eventID);
    
        res.status(201).json({
            ok: true,
            event: deletedEvent
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