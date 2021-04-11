import { MdStore as icon } from 'react-icons/md';

export default {
  // Computer Name
  name: 'storeSettings',
  // visible title
  title: 'Settings',
  type: 'document',
  icon,
  fields: [
    {
      name: 'name',
      title: 'Store Name',
      type: 'string',
      description: 'Name of the pizza',
    },
    {
      name: 'staffmember', // slicemaster
      title: 'Currently Serving the Community',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'person' }] }],
    },
    {
      name: 'hotItems', // hotSlices
      title: 'Hot Items available in the shop',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'item' }] }], // pizza
    },
  ],
};