import User from '../models/User.model.js';
import Item from '../models/Item.model.js';
import CategoryTag from '../models/CategoryTag.model.js';
//create controller
const CategoryTagController = {
    //create tag
    createTag: async (req, res) => {
        try {
            const { name, createdBy } = req.body;
            //validate
            if (!name) {
                res.status(400).json({ message: 'All tags must have a valid name' });
            }
            const newCategoryTag = new CategoryTag({ name, createdBy });
            await newCategoryTag.save();
            res.status(200).json({ message: 'Tag created', tag: newCategoryTag });
        }
        catch (error) {
            console.error('Error during tag creation: ', error);
            res.status(500).json({ message: 'An error occurred while attempting to create new tag' });
        }
    },
    //delete a tag
    deleteTag: async (req, res) => {
        try {
            const tagId = req.params.id;
            //delete tag
            const deletedTag = await CategoryTag.findByIdAndDelete(tagId);
            if (!deletedTag) {
                return res.status(400).json({ message: 'Tag not found' });
            }
            res.status(200).json({ message: 'Tag deleted successfully' });
        }
        catch (error) {
            console.error('Error deleting tag: ', error);
            res.status(500).json({ message: 'An error occurred while attempting your request' });
        }
    },
    //get all tags by user
    getAllTagsByUser: async (req, res) => {
        try {
            const userId = req.params.userId;
            const user = await User.findById(userId);
            //validate user
            if (!user) {
                return res.status(400).json({ message: 'User not found' });
            }
            //get tags
            const tags = await CategoryTag.find({ createdBy: userId });
            if (!tags) {
                return res.status(400).json({ message: 'No tags found' });
            }
            res.status(200).json(tags);
        }
        catch (error) {
            console.error('Error getting all tags: ', error);
            res.status(500).json({ message: 'An error occurred while attempting your request' });
        }
    },
    //get all items by tag
    getAllItemsByTag: async (req, res) => {
        try {
            const tagId = req.params.id;
            const items = await Item.find({ categories: tagId }).populate('categories');
            if (!items) {
                return res.status(400).json({ message: 'No items found' });
            }
            res.status(200).json(items);
        }
        catch (error) {
            console.error('Error getting all items by tag: ', error);
            res.status(500).json({ message: 'An error occurred while attempting your request' });
        }
    }
};
export default CategoryTagController;
