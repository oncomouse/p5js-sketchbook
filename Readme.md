# p5js-sketchbook

A very simple sketchbook development application that lets you index and create sketches in [p5.js](https://p5js.org/) and easily share your work.

The app uses [Webpack](https://webpack.js.org/) to compile the application and [React Router](https://reacttraining.com/react-router/) to manage the switch between sketches.

There are some minor differences from how you make sketches using P5 without this sketchbook (See "Differences from P5", below).

## Getting Started

You need to have [Node.js](https://nodejs.org) and [NPM](https://npmjs.com) installed for this app to work. Instructions for installing these on [Windows](http://blog.teamtreehouse.com/install-node-js-npm-windows) and [OSX](http://blog.teamtreehouse.com/install-node-js-npm-mac) are available online.

Once you have node and npm working, run `npm install` in the directory where you downloaded this app. After it is finished, you can start your sketchbook by running `npm run start` from the command line.

## Creating Sketches

All sketches are stored in the `app/sketches` directory of this application. You have to create sketch files **before** the app is running. Otherwise, they will not be recognized as routes.

There is a sample sketch, `app/sketches/sample.js`

This app uses [Babel](https://babeljs.io/) and has ES2015 transforms turned on. You can write sketches in ES2015, if you prefer. The source for the app is in ES2015, fwiw.

## Publishing Your Work

To publish your sketchbook, run `npm run build` from the command line. The application will be stored in `app/build`. Upload the contents of that folder to your favorite web hosting server and your sketchbook will be published!

## Differences from P5

There are a few small differences between vanilla P5, which you may have used before, and what you have to do to get sketches running in this app. Essentially, you have to define functions slightly differently and you have to learn how to import libraries using Webpack. Both are discussed below.

### Defining `draw()` and `setup()`

When you create sketches in vanilla P5, you can simply define `setup` and `draw` functions. By default, without placing them in a closure, JavaScript adds those functions to the `window` object. Because of how importing works in Webpack, you **have to explicitly assign any of the defined functions P5 expects to the `window` object.** These functions can include `mousePressed` or `keyReleased` in addition to `draw` and `setup`.

To do this, in your sketch, instead of just creating a basic sketch like this:

~~~javascript
function draw() {

}

function setup() {

}
~~~

You have to assign it to `window` like this:

~~~javascript
window.draw = function() {

}

window.setup = function() {

}
~~~

### Importing `p5`

If you need to access any of the classes referenced in the [p5.js reference](https://p5js.org/reference/) that begin with `p5.` (such as [`p5.Vector`](https://p5js.org/reference/#/p5.Vector)), you have to include `p5` in your sketch. To do this, add the line `var p5 = require('p5')` or `import p5 from 'p5'` (if using ES2015 syntax) at the top of your sketch, **before any other code**.

### Importing Other Libraries

This is how you import libraries in Webpack. You can also, for instance, use the utility library, [lodash](https://lodash.com/), which is included in this app by adding `var _ = require('lodash')` or `import _ from 'lodash'` into your sketch.

While it does not matter (for the most part) the order in which you import libraries into your sketch, all importing needs to be done before the sketch's code starts.

Additionally, there is an `addons` directory in `/app` that can be used to include other [p5.js addons](https://p5js.org/libraries/). Some p5.js add-on libraries are not compatible with Webpack and may require a bit of adapting.

Other add-on libraries, such as [RiTa.js](http://rednoise.org/rita/) can be installed via NPM. [This is a helpful tutorial if you need to learn more about NPM](https://www.sitepoint.com/beginners-guide-node-package-manager/).