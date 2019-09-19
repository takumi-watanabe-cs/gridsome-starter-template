// This is where project configuration and plugin options are located. 
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  templates: {
    ContentfulBlogPost: [
      {
        path: '/article/:id',
        component: './src/templates/Article.vue'
      }
    ]
  },
  siteName: 'Gridsome',
  plugins: [
    {
      use: '@gridsome/source-contentful',
      options: {
        space: process.env.CTF_SPACE_ID, // required
        accessToken: process.env.CTF_CDA_ACCESS_TOKEN, // required
        host: 'cdn.contentful.com',
        environment: 'master',
        typeName: 'Contentful'
      }
    },
    { use: 'gridsome-plugin-typescript' },
    { use: 'marked' },
    { use: 'moment' },
    { use: 'vue-meta' }
  ]
}
