import { Request, Response } from 'express';
import Item from '../models/Item.model';
import User from '../models/User.model';
import UsageTag from '../models/UsageTag.model';
import CategoryTag from '../models/CategoryTag.model';
import { Types } from 'mongoose';

//create controller 
const ItemController = {
    //create item
    createItem: async (req: Request, res: Response) => {
        try {
            const {
                name,
                description,
                weight,
                categories,
                useConditions,
                packed,
                userId
            } = req.body as {
                name: string,
                description: string,
                weight: number,
                categories: string[],
                useConditions: string[],
                packed: boolean,
                userId: string
            };

            //get user id
            const user = await User.findById(userId);

            //validate
            if (!name) {
                return res.status(400).json({ message: 'Please enter a name for this item' });
            }

            //handle CategoryTags
            const tagIds: Types.ObjectId[] = [];
            for(let tag of categories){
                const tagDocument = await CategoryTag.findOneAndUpdate(
                    { name: tag }, 
                    { $set: {name: tag} }, 
                    { upsert: true, new: true }
                );
                tagIds.push(tagDocument._id);
            }

            //handle UsageTags
            const conditionIds: Types.ObjectId[] = [];
            for(let condition of useConditions){
                const conditionDocument = await UsageTag.findOneAndUpdate(
                    { name: condition },
                    { $set: {name: condition} },
                    { upsert: true, new: true }
                );
                conditionIds.push(conditionDocument._id);
            }

            //create new item
            const newItem = new Item({ name, description, weight, categories: tagIds, useConditions: conditionIds, packed, userId: user!._id });
            await newItem.save();

            res.status(201).json({ message: 'Item created' });
        } catch (error) {
            console.error('Error during item creation: ', error);
            res.status(500).json({ message: 'An error occurred while attempting your request' });
        }
    },

    //get all items
    getAllItems: async (req: Request, res: Response) => {
        try {
            //get user id
            const user = await User.findById(req.query.userId);
            if(!user) {
                return res.status(400).json({ message: 'User not found' });
            }

            //get all items
            const items = await Item.find({ userId: user._id })
                                    .populate('categories')
                                    .populate('useConditions');
            if (!items) {
                return res.status(400).json({ message: 'No items found' });
            }

            res.status(200).json(items);
        } catch (error) {
            console.error('Error getting all items: ', error);
            res.status(500).json({ message: 'An error occurred while attempting your request' });
        }
    },

    //get all items by name
    getAllItemsByName: async (req: Request, res: Response) => {
        try {
            const name = req.query.name as string;
            let condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};

            //get all items
            const items = await Item.find(condition);

            res.status(200).json(items);
        } catch (error) {
            console.error('Error getting all items by name: ', error);
            res.status(500).json({ message: 'An error occurred while attempting your request' });
        }
    },

    //get all packed items
    getAllPackedItems: async (req: Request, res: Response) => {
        try {
            //get userId
            const userId = req.params.userId;

            //get all packed items belonging to user
            const items = await Item.find({ userId: userId, packed: true });
            if (!items) {
                return res.status(400).json({ message: 'No packed items found' });
            }

            res.status(200).json(items);
        } catch (error) {
            console.error('Error getting all packed items: ', error);
            res.status(500).json({ message: 'An error occurred while attempting your request' });
        }
    },

    //get one item by id
    getOneItem: async (req: Request, res: Response) => {
        try {
            //get item id
            const { id } = req.params;

            //find item by id
            const item = await Item.findById(id);
            if (!item) {
                return res.status(400).json({ message: 'Item not found' });
            }

            res.status(200).json(item);
        } catch (error) {
            console.error('Error getting one item: ', error);
            res.status(500).json({ message: 'An error occurred while attempting your request' });
        }
    },

    //update item
    updateItem: async (req: Request, res: Response) => {
        try {
            //validate request
            if (!req.body) {
                return res.status(400).json({ message: 'Data to update cannot be empty!' });
            }

            //get item id
            const { id } = req.params;

            //find item by id and update
            const updateItem = await Item.findByIdAndUpdate(id, req.body, { useFindAndModify: false });
            if (!updateItem) {
                return res.status(400).json({ message: 'Item not found' });
            }

            res.status(200).json({ message: 'Item updated' });
        } catch (error) {
            console.error('Error updating item: ', error);
            res.status(500).json({ message: 'An error occurred while attempting your request' });
        }
    },

    //delete item
    deleteItem: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;

            //find item by id and delete
            const deleteItem = await Item.findByIdAndDelete(id);
            if (!deleteItem) {
                return res.status(400).json({ message: 'Item not found' });
            }

            res.status(200).json({ message: 'Item deleted' });
        } catch (error) {
            console.error('Error deleting item: ', error);
            res.status(500).json({ message: 'An error occurred while attempting your request' });
        }
    }
};

export default ItemController;