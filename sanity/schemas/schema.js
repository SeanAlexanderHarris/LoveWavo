// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator';
// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type';
// Then we give our schema to the builder and provide the result to Sanity

// Core Store
import pizza from './item';
import itemTag from './itemTag';
import person from './person';
import storeSettings from './storeSettings';

// Blogging, Projects, Services
import post from './blog/post';
import postAuthor from './blog/postAuthor';
import project from './blog/project';
import projectMember from './blog/projectMember';
import blockContent from './blog/blockContent';
import blockText from './blog/blockText';
import category from './blog/category';
import mainImage from './blog/mainImage';

export default createSchema({
  // We name our schema
  name: 'default',
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([pizza, itemTag, person, storeSettings, post, postAuthor, project, projectMember, blockContent, blockText, category, mainImage]),
});
