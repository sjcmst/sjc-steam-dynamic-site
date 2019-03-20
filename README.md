# sjc-steam-dynamic-site
Move our static site to keystone

To build, use
  ```sh
  mongod
  npm start
  ```

Before each push from github, use
  ```sh
  npm backupdb
  ```
After each pull from github, use
  ```sh
  npm updatedb
  ```
  
## Basic information
This project builds a simple dynamic site with keystone.

it uses [Pug](https://pugjs.org/api/getting-started.html) for html templating, [LESS](http://lesscss.org/) for CSS, and capable of [compiling ES7](https://babeljs.io/docs/plugins/preset-es2017/) to Javascript, too. In production mode (dist build), assets are bundled, minified, and revved to speed up loading and allow usage of server cache.

Please note that [jQuery slim](http://jquery.com/download/) is included, AJAX and animation features are trimmed in favor of CSS animations and Fetch. I also included the [Fetch Polypill](https://github.com/github/fetch) to help managing AJAX calls.

Lastly, [BootstrapV4](https://v4-alpha.getbootstrap.com/) is included for css scaffolding. Since V4 no longer include a glyph set, [FontAwesome4](http://fontawesome.io/) is included.

A [Yeoman generator](http://yeoman.io/) is made for an easier bootstrapping of this template, for example, you can choose to exclude the templating languages, or use the full version of jQuery. The generator's git is available [here](https://github.com/andersoo/generator-gulp-static), the command for using the generator is also available at the end of this page, click [here](#yeoman-generator-usage).

## Installation
Install node modules via yarn

  ```sh
  yarn install
  ```

or via npm if you are not familiar with yarn
  ```sh
  npm install
  ```
### Development

In development, `keystone ` would host the site dynamically at `localhost:3000`

1. **Database** 
  everything here builds on mongoDB. Run
  ```sh
  mongod
  ```
  before build and preview


2. **To build and preview** 

  ```sh
  yarn start
  ```
  or
  ```sh
  npm start
  ```

3. **Database management**
  ```sh
  yarn backupdb #To transfer the db from local to dbdump here
  ```
  ```sh
  yarn updatedb #To transfer the db from dbdump to local
  ```
### Production (Distribution)

IDK

In production, the html is minimized, js and css files are concatenated and minified, imagemin is also used to compress/optimize the images. The result files are placed in a directory named `dist`

1. **To compress**  `public` **into** `dist` 

  ```sh
  #The are multiple options:

  # Complete build
  gulp build --all

  # Compress html/js/css files only
  gulp dist #or
  gulp build --dist

  # Compress images only
  gulp build --img #or
  gulp build --images

  ```

2. **To preview the `dist`**

  ```sh
  gulp serve --dist
  ```

#### Server Scripts

In some cases, it may be difficult to install a global bower/gulp on your server, npm commands that uses local node modules to install and build are available as well

1. To install Bower components

  ```sh
  npm run bower   # equivalent to  `bower install`
  ```

2. To build 

  ```sh
  npm run build   # equivalent to `gulp build --all`
  ```


## Yeoman Generator Usage

Yeoman is used to generate the keystone site.

First, install yo and the generator
```bash
npm install -g yo
npm install -g generator-keystone
```
Then generate your new project:

```bash
yo keystone
```