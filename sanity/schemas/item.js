import { MdShoppingBasket as icon } from 'react-icons/md';
import PriceInput from '../components/PriceInput';

export default {
    // Computer name
    name: 'item', // pizza

    // Visible title
    title: 'Items', // Pizzas
    type: 'document',
    icon: icon,
    fields: [{
        name: 'name',
        title: 'Item Name',
        type: 'string',
        description: 'Name of the item'
    },
    {
        name: 'slug',
        title: 'Slug',
        type: 'slug',
        options: {
            source: 'name',
            maxLength: 100,
        }
    },
    {
        name: 'image',
        title: 'Image',
        type: 'image',
        options: {
            hotspot: true
        } 
    },
    {
        name: 'price',
        title: 'Price',
        type: 'number',
        description: 'Price of the item in pence',
        validation: Rule => Rule.min(1000).max(30000),
        inputComponent: PriceInput,
    },
    {
        name: 'itemTags', // toppings
        title: 'Item Tags', // Toppings
        type: 'array',
        of: [{type: 'reference', to: [{type: 'itemTag'}]}] // topping
    },],
    preview: {
        select: {
            title: 'name',
            media: 'image',
            topping0: 'itemTags.0.name',
            topping1: 'itemTags.1.name',
            topping2: 'itemTags.2.name',
            topping3: 'itemTags.3.name'
        },
        prepare: ({title, media, ...toppings}) => {
            const filteredItemTags = Object.values(toppings).filter(Boolean);

            return {
                title,
                media,
                subtitle: filteredItemTags.join(", ")
            }
        }
    }
};