# \<morph-sidebar\>

  Sidebar that morphs for current mobile OS

## Install the Polymer-CLI

  First, make sure you have the [Polymer CLI](https://www.npmjs.com/package/polymer-cli) installed. we will use `polymer serve` to serve your element locally so we can see how our elements works. 

## Getting started

  You can clone the repository to create a local copy on your computer.

  1. Navigate to the main page of the repository in Github - [Main Page in Github][Main Page]

  2. Click **Clone or download** and copy the clone URL for the repository

  3. Open your Terminal and change the current working directory to the location where you want to clone this directory and Type **`git clone`**, and then paste the URL you copied in Step 2.
    ```
    $ git clone https://github.com/nexpaq/polymorph-components.git
    ```

  4. Then **`$ cd morph-sidebar/`**

  5. Run **`$ bower install`** to install all packages in your bower.json and any packages that it depends on in the local bower_components folder.
  
## Running A Local Server

  To run local server on your machine

  1. Open another tab  or window of your terminal

  2. Use **`polymer serve`** 

  ```bash
    $ polymer serve
  ```

  - and if running correctly, this message will appear

  ```bash
  info:   Files in this directory are available under the following URLs
        applications: http://127.0.0.1:8081
        reusable components: http://127.0.0.1:8081/components/morph-sidebar/
  ```

  - Copy and paste the reusable components URL `http://127.0.0.1:8081/components/morph-sidebar/` to your browser and open developer console and select either an IOS or Android device to see the sidebar render correctly.

  3. **Important:** Running this local server is needed for running Polymer Test. More about this below. 


## Running Tests
  - This `<morph-sidebar> element` is ready to be tested using [**web-component-tester**][WCT] or WCT for short. Our tests is setup to use `--expanded: true` configuration for creating a more readable output of test results in the console. It will show all the test that were run and also show all the test that failed if any. Additional configuration for WCT can be found and further configured in the `wct-conf.json` file in the root of `<morph-button>` directory.

  - To start **Polymer Unit Test** you can run **`$ polymer test`** 

  **Reminder:** A local server is needed to be started and running for the test to properly run. 

  - For brief overview of Polymer Testing please go to this page [Polymer Test][Polymer Test]

  - To create new test, change to the **test/** directory.

    ```
    $ polymer test
    ```

  - Then either add new test to existing fixture and context, or add new fixture and create new test context for new property or group of tests. Refer to [WCT][WCT] documentation for more detailed explanation about fixtures. 

  - For brief overview of Polymer Testing please go to this page [Polymer Test][Polymer Test]

## Usage Summary

  ### How to use our **<morph-sidebar>** component

  - Our **`<morph-sidebar>`** has properties that we can use to setup and use our sidebar

    1. **`align`** - use to choose where to display sidebar, `left` or `right`. It is set to `left` by default when `align` is not added to HTML markup. This is inherited from **`<app-drawer>`** element of 'app-layout'

    2. **`opened`** - takes a Boolean value and use to indicate if the side bar is close or open. also used to toggle our sidebar from close to open and close again using javascript on the page
    
    
  **ToDo: Give example of how to use with `app-drawer-layout`**

  - We can wrap the whole content with [**app-drawer-layout**][app-drawer-layout] component to make it work with other `<app-layout>` elements like `<app-header>`.

    ```html

    <body>
      <!-- morph-view should be inside html body -->
      <morph-view id="mainView"> 
        <h3><morph-sidebar> demo</h3>

        <button id="sidebarLeftToggler">Toggle Left Sidebar</button>
        <button id="sidebarRightToggler">Toggle Right Sidebar</button>
      </morph-view>

      <!-- morph-sidebar should be outside morph-view and inside html body -->
      <morph-sidebar id="sidebarLeft">
        <p>Left Panel content here</p>
      </morph-sidebar>

      <morph-sidebar align="right" id="sidebarRight">
        <p>Right Panel content here</p>
      </morph-sidebar>
    </body>

    ```
    

  **Todo: test this two sidebar setup and give an example on the best way to use it in two different ways. One is the one below and the other is with `app-drawer-layout` nested setup**
  
  - We may use 2 panels at the same time, one left and one right panel. `align` defaults to `left` when not specified. 

    ```html

    <body>

      <morph-sidebar id="leftSidebar" align="left" swipe-open>
        <p>Left morph-sidebar</p>
        <p>Simulated with cover animation and shadow for android. And no shadow if iOS.</p>
      </morph-sidebar>

      <morph-sidebar id="rightSidebar" align="right" swipe-open>
        <p>Right morph-sidebar</p>
        <p>Simulated with cover animation and shadow for android. And no shadow if iOS.</p>
      </morph-sidebar>

      <div>
        <h4 onclick="toggleDrawer('left')">Toggle Left Sidebar</h4>
      </div>

      <div>
        <h4 onclick="toggleDrawer('right')">Toggle Right Sidebar</h4>
      </div>

      <script>

        toggleDrawer = function(name) {
          var drawer = document.getElementById(name + 'Sidebar'); 
          drawer.toggle(); 
        };

      </script>

    </body>

    ```
    
  **ToDo: Implement the reveal animation using this new `morph-sidebar`**

  - `<morph-sidebar>` has two animation when openning and closing. The default animation of the sidebar is `cover`. It covers the morph-view element when it opens. 

  - The other animation is called `reveal` where [**morph-view**][Morph View] moves out and reveals the `<morph-sidebar>` under it. `<morph-view>` moves out of the way to accomodate the width of our sidebar. To use `reveal` we add reveal attribute to `<morph-view>` component.

    ```html

    function closeRightSidebarWithReveal() {
      let view = document.getElementById('mainView');
      view.removeAttribute('reveal');
    }

    document.addEventListener('DOMContentLoaded', function(event) {
      document.getElementById('sidebarRight').addEventListener('open-changed', closeRightSidebarWithReveal);
    });

    ```


[Main Page]: https://github.com/moduware/polymorph-components

[WCT]: https://github.com/Polymer/web-component-tester  

[Polymer Test]: https://www.polymer-project.org/2.0/docs/tools/tests

[Morph View]: https://github.com/moduware/morph-view

[app-drawer-layout]: https://github.com/PolymerElements/app-layout/tree/master/app-drawer-layout

