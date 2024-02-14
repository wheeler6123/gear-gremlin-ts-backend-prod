import Trip from '../models/Trip.model.js';
import User from '../models/User.model.js';
import Item from '../models/Item.model.js';
//create controller
const TripController = {
    //create trip
    createTrip: async (req, res) => {
        try {
            const { name, items, userId, totalWeight } = req.body;
            //validate
            if (!name) {
                res.status(400).json({ message: 'Please enter a name for this trip' });
            }
            //fetch items from db
            const fetchedItems = await Item.find({ _id: { $in: items } });
            //create new trip
            const newTrip = new Trip({ name, items: fetchedItems, userId, totalWeight });
            //save trip
            const data = await newTrip.save();
            res.status(200).json(data);
        }
        catch (error) {
            console.error('Error during trip creation: ', error);
            res.status(500).json({ message: 'An error occurred while attempting your request' });
        }
    },
    //get all trips by user
    getAllTripsByUser: async (req, res) => {
        try {
            console.log('trip request received by server');
            //get user id from query
            const user = await User.findById(req.query.userId);
            if (!user) {
                return res.status(400).json({ message: 'User not found' });
            }
            console.log('user found');
            //get trips
            const trips = await Trip.find({ userId: user._id });
            if (!trips) {
                return res.status(400).json({ message: 'No trips found, create one now!' });
            }
            console.log('trips:', trips);
            res.status(200).json(trips);
        }
        catch (error) {
            console.error('Error getting all trips: ', error);
            res.status(500).json({ message: 'An error occurred while attempting your request' });
        }
    },
    //get one trip by id
    getOneTrip: async (req, res) => {
        try {
            const tripId = req.params.id;
            //get trip
            const trip = await Trip.findById(tripId).populate('items');
            if (!trip) {
                return res.status(400).json({ message: 'Trip not found' });
            }
            res.status(200).json(trip);
        }
        catch (error) {
            console.error('Error getting one trip: ', error);
            res.status(500).json({ message: 'An error occurred while attempting your request' });
        }
    },
    //update a trip
    updateTrip: async (req, res) => {
        try {
            //validate
            if (!req.body) {
                return res.status(400).json({ message: 'Data to update cannot be empty' });
            }
            const tripId = req.params.id;
            //update trip
            const updatedTrip = await Trip.findByIdAndUpdate(tripId, req.body, { useFindAndModify: false });
            if (!updatedTrip) {
                return res.status(400).json({ message: 'Trip not found' });
            }
            res.status(200).json({ message: 'Trip updated successfully' });
        }
        catch (error) {
            console.error('Error updating trip: ', error);
            res.status(500).json({ message: 'An error occurred while attempting your request' });
        }
    },
    //delete a trip
    deleteTrip: async (req, res) => {
        try {
            const tripId = req.params.id;
            //delete trip
            const deletedTrip = await Trip.findByIdAndDelete(tripId);
            if (!deletedTrip) {
                return res.status(400).json({ message: 'Trip not found' });
            }
            res.status(200).json({ message: 'Trip deleted successfully' });
        }
        catch (error) {
            console.error('Error deleting trip: ', error);
            res.status(500).json({ message: 'An error occurred while attempting your request' });
        }
    }
};
export default TripController;
