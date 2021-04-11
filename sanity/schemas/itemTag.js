import { rules } from 'eslint-config-prettier';
import { FaTag as icon } from 'react-icons/fa';

export default {
    // Computer name
    name: 'itemTag', // topping

    // Visible title
    title: 'ItemTag', // Topping
    type: 'document',
    icon: icon,
    fields: [
        {
        name: 'name',
        title: 'Tag Name',
        type: 'string',
        description: 'Description of the tag'
    },
    {
        name: 'madeLocally', // vegetarian
        title: 'Made Locally', // Vegetarian
        type: 'boolean',
        description: 'Made Locally?',
        options: {
            layout: 'checkbox'
        }
    },],
    preview: {
        select: {
            name: 'name',
            madeLocally: 'madeLocally' // vegetarian: 'vegetarian'
        },
        prepare: (fields) => ({
            title: `${fields.name} ${fields.madeLocally ? `🌱` : ``}`,

        })
    }
};