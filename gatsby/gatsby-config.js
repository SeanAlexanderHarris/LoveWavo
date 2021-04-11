// This file is empty, but some people were reporting that it would not start unless they had an empty file. So here it is! You can delete the comment. Or replace it with your favourite shania twain lyrics.
// import dotenv from 'dotenv';

// dotenv.config({ path: '.env' });

module.exports = {
  siteMetadata: {
    title: `LoveWavertree`,
    // siteUrl: `gatsby.pizza`,
    description: 'Loving Wavertree since 2020',
    twitter: '@LoveWavertree',
    instagram: '@lovewavertree'
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-styled-components',
    {
      resolve: 'gatsby-source-sanity',
      options: {
        projectId: 'ob0oot7j',
        dataset: 'production',
        watchMode: true,
        token: process.env.SANITY_TOKEN,
      },
    },
  ],
};
