---
title: Usage
description: How to startup and use the dev server for writing documentation
--- 
# Usage
## Requirements
::: tip 
To edit documentation, [Node.js](https://nodejs.org/en) must be installed with version 16 or higher. 
:::

To be written when we have decided on a workflow (with branches and PR's)

To get started regardless, 
1. Clone the repo
2. CD into the repo
3. `npm i`
4. `npx vitepress dev`

And then open the link that appears in the terminal in a browser. Note that a text editor needs to be installed in order to edit the physical files that makeup the repo.

## Example

1. Create a markdown file in a directory
2. add in frontmatter: 
    ```html
    ---
    title: A Title
    description: Optional - helps with SEO and allows the use of the Subtitle Component
    cover: Optional path to cover link (in public directory)
    ---
    ```
    ::: info
    There is more frontmatter required when using index components, check out [that page](/sdk/docs/components/index-component) for more info
    :::
3. Write your docuemntation (note that any images added must not contain spaces)
    - Images can be added by adding them to the assets folder and referencing them like a normal markdown image: `![](/assets/image_name.png)`. Note the global path from assets.
4. Add the documentation page to the config.js in the .vitepress folder
    - Adding a component to the Components section on this page would look like this:
    ```js
    {
        text: 'Components',
        link: '/sdk/docs/components/index',
        collapsed: true,
        items: [
            { text: 'BigLink', link: '/sdk/docs/components/biglink' },
            { text: 'Embed', link: '/sdk/docs/components/embed' },
            { text: 'HeaderImage', link: '/sdk/docs/components/headerimage' },
            { text: 'Index', link: '/sdk/docs/components/index-component' },
            { text: 'Subtitle', link: '/sdk/docs/components/subtitle' },
            { text: 'New Page', link: '/sdk/docs/components/new_page' } // [!code ++]
        ]
    }
    ```
    ::: tip
    Remember to leave off the .md file extension!
    :::
    - To add index pages, check out the [index](/sdk/docs/components/Index) component.

Click [here](https://vitepress.dev/) for the Vitepress docs website for more info on what is built into Vitepress.

For tabbed code-blocks, [this library](https://vitepress-plugins.sapphi.red/tabs/) is used.
