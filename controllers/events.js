const { response } = require("express")
const Event = require('../models/Event-model');

const getEvents = async(req, res = response) => {

    // to retrieve the events from our mondo database, a simple find() method is enough, this will return an array of
    // objects with all the attributes included on them. In our event-model we have the users reference included, but i
    // wanted to use the users name as well for reference in each of the events created, as the user id is going to be
    // unrecognizable data for a normal user. To retrieve the name from the user reference, i can use the help of the
    // populate() method, for it to add additional information to one of our attributes, after stating which is the attribute
    // we want to use, we have to specify which user attribute we want to retrieve, so the name will be our second parameter
    // in the populate method, the users id will be attached by default so we dont have to include it as parameter 
    let events = await Event.find().populate('user', 'name');

    try {
        // if the events variable is empty, then the code will return a 400 status code (bad request) with a proper body 
        // message stating what went wrong
        if(!events) {
            return res.status(400).json({
                ok: false,
                msg: 'No events found'
            });
        };
        // the response has the code 201 (created) which will confirm the users event retrieval, the data is then
        // sent back as the calendar components uses it to be rendered
        res.status(201).json({
                ok: true,
                events
        });
    
    } catch (error) {
        console.log(error);
        // if any of the previous steps present an issue then we return a code 500 (Internal Server Error), which most likely
        // will get fixed by the developer
        res.status(500).json({
            ok: false,
            msg: "Contact developer to fix issue"
        });
    }
}

const createEvent = async(req, res = response) => {

    // the newEvent will be an instance of the Event model by using the body attached to the request, if the
    // body has any extra attribute or variable which does not fit into the Event model then it will be ignored and
    // only the information specified on the Schema will be stored in our collection
    const newEvent = new Event(req.body);

    try {
        // the new event has all the required information for the event to be stored except for the user id, we can attach
        // it by using the uid reference on the request 
        newEvent.user = req.uid;
        const savedEvent = await newEvent.save();

        // the response has the code 201 (created) which will confirm the users event retrieval, the data is then
        // sent back as the calendar components uses it to be rendered
        res.status(201).json({
            ok: true,
            event: savedEvent
        });
        
    } catch (error) {
        console.log(error);
        // if any of the previous steps present an issue then we return a code 500 (Internal Server Error), which most likely
        // will get fixed by the developer
        res.status(500).json({
            ok: false,
            msg: "Contact developer to fix issue"
        });
    }
}

const updateEvent = async(req, res = response) => {
    
    // we need to retrieve the parameter on the URL as that will be the reference used for us to know
    // which event its in to be updated, we can do so by retrieving it from the request, we also retrieve
    // the user id to compare it with the user referenced on the event, if they are not related then the
    // event wont be updated
    const eventID = req.params.id;
    const uid = req.uid;

    try {

        const event = await Event.findById(eventID);

        if(!event) {
            // if the events variable is empty, then the code will return a 404 status code (not found) with a proper body 
            // message stating what went wrong
            return res.status(404).json({
                ok: false,
                msg: 'Event does not exist'
            });
        };

        if(event.user.toString() !== uid){
            // if the uid on the request does not match with the user id on the event, then the code will return a 401 
            // status code (Unauthorized) with a proper body message stating what went wrong
            return res.status(401).json({
                ok: false,
                msg: 'User not authorized to change this event'
            });
        };

        // if the uid matches the event found, then a new object is created pretty much building up the information
        // attached on the body request along with the uid on it as well
        const upEvent = {
            ...req.body,
            user: uid
        };

        // the first parameter in the findByIdAndUpdate is the event id, then we add the updated event as second parameter
        // and we finally add the 'new' argument for mongo to delete the previous event and replace it with this "new" one  
        const updatedEvent = await Event.findByIdAndUpdate( eventID, upEvent, {new: true});
    
        // the response has the code 201 (created) which will confirm the event update, the data is then
        // sent back for confirmation and for the store on my calendar front end to attach it to the events object array
        res.status(201).json({
            ok: true,
            event: updatedEvent
        });
        
    } catch (error) {
        console.log(error);
        // if any of the previous steps present an issue then we return a code 500 (Internal Server Error), which most likely
        // will get fixed by the developer
        res.status(500).json({
            ok: false,
            msg: "Contact developer to fix issue"
        });
    };
};

const deleteEvent = async(req, res = response) => {

    // we need to retrieve the parameter on the URL as that will be the reference used for us to know
    // which event its in to be deleted, we can do so by retrieving it from the request, we also retrieve
    // the user id to compare it with the user referenced on the event, if they are not related then the
    // event wont be deleted
    const eventID = req.params.id;
    const uid = req.uid;
    
    try {

        const event = await Event.findById(eventID);

        if(!event) {
            // if the events variable is empty, then the code will return a 404 status code (not found) with a proper body 
            // message stating what went wrong
            return res.status(404).json({
                ok: false,
                msg: 'Event does not exist'
            });
        };

        if(event.user.toString() !== uid){
            // if the uid on the request does not match with the user id on the event, then the code will return a 401 
            // status code (Unauthorized) with a proper body message stating what went wrong
            return res.status(401).json({
                ok: false,
                msg: 'User not authorized to delete this event'
            });
        };

        // the parameter in the findByIdAndDelete is the event id, nothing else is required and the event will be deleted from
        // our collection
        const deletedEvent = await Event.findByIdAndDelete(eventID);
    
        // the response has the code 201 (created) which will confirm the event deletion, the data is then
        // sent back for confirmation
        res.status(201).json({
            ok: true,
            event: deletedEvent
        });
        
    } catch (error) {
        console.log(error);
        // if any of the previous steps present an issue then we return a code 500 (Internal Server Error), which most likely
        // will get fixed by the developer
        res.status(500).json({
            ok: false,
            msg: "Contact developer to fix issue"
        });
    };
};

module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
};