import { MorphElement} from '@moduware/morph-element/morph-element.js';
import '@polymer/app-layout/app-drawer/app-drawer.js';
import '@polymer/app-layout/app-layout.js';
import '@polymer/polymer/lib/utils/render-status.js';
import { DomModule } from '@polymer/polymer/lib/elements/dom-module.js';

var $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = /*html*/`
<dom-module id="morph-sidebar">
  <template id="styles">
    <style>

      :host {
        --app-drawer-width: 260px;

        --morph-sidebar-scrim-background-android: rgba(0, 0, 0, 0.2);
        --morph-sidebar-scrim-background-ios: rgba(0, 0, 0, 0);

      }

      :host([platform="ios"]) #scrim {
        --app-drawer-scrim-background: var(--custom-ios-scrim-background, var(--morph-sidebar-scrim-background-ios));
      }

      :host([platform="android"]) #scrim {
        --app-drawer-scrim-background: var(--morph-sidebar-scrim-background-android);
      }

      :host([platform="android"][opened]) #contentContainer {
        box-shadow: 0 0 20px rgba(0,0,0,.5);
      }

    </style>

  </template>

  
</dom-module>
`;

document.head.appendChild($_documentContainer.content);

var subTemplate;
var AppDrawerSuperClass = customElements.get('app-drawer');

/**
 * `morph-sidebar`
 * A navigation drawer that can slide in from the left or right and that morphs for current mobile OS
 *
 * @customElement
 * @polymer
 * @demo morph-sidebar/demo/index.html
 */
class MorphSidebar extends MorphElement(AppDrawerSuperClass) {
  static get properties() {
    return {
      transitionDuration: {
        type: Number,
        computed: 'computedTransitionDuration(platform)'
      },
      transitionDurationAndroid: {
        type: Number,
        value: 300
      },
      transitionDurationIos: {
        type: Number,
        value: 400
      },
      transitionDurationWeb: {
        type: Number,
        value: 200
      }
    };
  }

  /**
   * This will return our template inherited from superclass <app-drawer> with our styles inserted
   */      
  static get template() {
    if (!subTemplate) {
      // first clone our superclass <app-drawer> template
      let superClass = customElements.get('app-drawer');
      subTemplate = superClass.template.cloneNode(true);

      // here we will get the content of our <style> so we can insert them into the superclass <style>
      // note the added id="styles" in our template tag above
      const subStyle = DomModule.import('morph-sidebar', 'template#styles').content;

      // get the content of current style from superClass
      const superStyle = subTemplate.content.querySelector('style');

      // append our added style at the bottom of the current style to get higher priority
      superStyle.parentNode.appendChild(subStyle);
    }
    return subTemplate;
  }


  /**
   * computedTransitionDuration - Sets the transition duration based on the platform.
   *
   * @param  {String} platform current platform
   * @return {Number}          returns the appropriate transitionDuration based on platform
   */
  computedTransitionDuration(platform) {
    if(platform == "android") {
      return this.transitionDurationAndroid;
    } else if(platform == "ios") {
      return this.transitionDurationIos;
    } else {
      return this.transitionDurationWeb;
    }
  }

}

customElements.define('morph-sidebar', MorphSidebar);
