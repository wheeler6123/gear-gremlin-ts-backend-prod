import { Request, Response } from 'express';
import User from '../models/User.model.js';
import Item from '../models/Item.model.js';
import UsageTag from '../models/UsageTag.model.js';

//create controller
const UsageTagController = {
    //create tag
    createTag: async (req: Request, res: Response) => {
        try {
            const { name, createdBy } = req.body;

            //validate
            if (!name) {
                res.status(400).json({ message: 'All tags must have a valid name' });
            }

            const newUsageTag = new UsageTag({ name, createdBy });
            await newUsageTag.save();

            res.status(200).json({ message: 'Tag created', tag: newUsageTag });
        } catch (error) {
            console.error('Error during tag creation: ', error);
            res.status(500).json({ message: 'An error occurred while attempting your request' });
        }
    },

    //delete a tag
    deleteTag: async (req: Request, res: Response) => {
        try {
            const tagId = req.params.id;

            //delete tag
            const deletedTag = await UsageTag.findByIdAndDelete(tagId);
            if (!deletedTag) {
                return res.status(400).json({ message: 'Tag not found' });
            }

            res.status(200).json({ message: 'Tag deleted successfully' });
        } catch (error) {
            console.error('Error deleting tag: ', error);
            res.status(500).json({ message: 'An error occurred while attempting your request' });
        }
    },

    //get all tags by user
    getAllTagsByUser: async (req: Request, res: Response) => {
       try {
            const userId = req.params.userId;

            const user = await User.findById(userId);

            //validate user
            if (!user) {
                return res.status(400).json({ message: 'User not found' });
            }

            //get tags
            const tags = await UsageTag.find({ createdBy: userId });
            if (!tags) {
                return res.status(400).json({ message: 'No tags found' });
            }

            res.status(200).json(tags);
       } catch (error) {
            console.error('Error getting all tags: ', error);
           res.status(500).json({ message: 'An error occurred while attempting your request' });
       }
    },

    //get all items by tag
    getAllItemsByTag: async (req: Request, res: Response) => {
        try {
            const tagId = req.params.id;

            const items = await Item.find({ useConditions: tagId }).populate('useConditions'); 

            if (!items) {
                return res.status(400).json({ message: 'No items found' });
            }

            res.status(200).json(items);
        } catch (error) {
            console.error('Error getting all items by tag: ', error);
            res.status(500).json({ message: 'An error occurred while attempting your request' });
        }
    }
};

export default UsageTagController;