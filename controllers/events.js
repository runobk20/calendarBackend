const {response} = require('express');
const Event = require('../models/Event');

const getEvents = async(req, res = response) => {

    const events = await Event.find()
                              .populate('user', 'name');

    return res.status(200).json({
        ok: true,
        events
    })
}

const createEvent = async(req, res = response) => {

    const event = new Event(req.body);

    try {

        event.user = req.uid;
        
        const savedEvent = await event.save();

        return res.status(200).json({
            ok: true,
            event: savedEvent
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Talk with an Admin'
        })
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
                msg: 'No event with this ID'
            })
        }

        if(event.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'You are not the owner of this event'
            })
        }

        const newEvent = {
            ...req.body,
            user: uid
        }

        const updatedEvent = await Event.findByIdAndUpdate(eventID, newEvent, {new: true});

        return res.json({
            ok: true,
            event: updatedEvent
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Talk with an Admin'
        })
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
                msg: 'No event with this ID'
            });
        }

        if(event.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'You are not the owner of this event'
            });
        }

        await Event.findByIdAndDelete(eventID);
        
        return res.json({
            ok: true
        })

        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Talk with an Admin'
        })
    }

}

module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
}