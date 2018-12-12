import { LitElement, html } from '@polymer/lit-element';
import * as Gestures from '@polymer/polymer/lib/utils/gestures';
import { getPlatform } from '@moduware/lit-utils';

/**
 * @extends HTMLElement
 */
export class MorphSidebar extends LitElement {
  /**
   *  Object describing property-related metadata used by Polymer features
   */
  static get properties() {
    return {
      /** Indicates if device or platform OS is Android or IOS */
      platform: {
        type: String,
        reflect: true
      },

      opened: Boolean,
      'body-swipe': Boolean
    };
  }

  firstUpdated() {
    super.firstUpdated();
    /* PRIVATE VARIABLES */
    this.$container = this.shadowRoot.getElementById('container');
    this._bodySwipeThresholdAchieved = false;
    this._sidebarSwipeAreaWidth = 50;
    this._sidebarSwipeIntensityThreshold = 30;
    this._sidebarOpenDragThreshold = 8;
    this._sidebarPositionOpenThreshold = 100;
    this._sidebarWidth = 260; // 260 for android

    this._openedEvent = new Event('opened');
    this._closedEvent = new Event('closed');

    if (!this.hasAttribute('platform')) {
      this.platform = getPlatform();
    }

    if(this['body-swipe'] != null) {
      Gestures.addListener(document.body, 'track', this.handleBodyTrack.bind(this));
    }
    Gestures.addListener(this, 'track', this.handleTrack.bind(this));
  }

  updated(changedProperties) {
    super.updated();
    if(changedProperties.has('opened')) {
      if(changedProperties.get('opened') != null) {
        this.dispatchEvent(this._closedEvent);
      } else {
        this.dispatchEvent(this._openedEvent);
      }
    }
    // if(this.opened != null && !changedProperties.has('opened')) {
    //   this.dispatchEvent(this._closedEvent);
    // }
  }

  handleBodyTrack(e) {
    if(this.opened) return;

    if(e.detail.state == 'start')
    {
      this.$container.classList.add('no-transitions');
    }
    else if(e.detail.state == 'end')
    {
      this.$container.classList.remove('no-transitions');

      if(this._bodySwipeThresholdAchieved) {
        this._bodySwipeThresholdAchieved = false;
        if(e.detail.x < this._sidebarPositionOpenThreshold) {
          this.removeAttribute('opened');
        } else {
          this.setAttribute('opened','');
        }
        this.$container.removeAttribute('style');
      }
    }
    else if(e.detail.state == 'track')
    {
      if(e.detail.x < this._sidebarSwipeAreaWidth && e.detail.dx > this._sidebarSwipeIntensityThreshold)
        this._bodySwipeThresholdAchieved = true;

      if(this._bodySwipeThresholdAchieved) {
        if(e.detail.dx > this._sidebarWidth) return;
        this.$container.style.transform = `translateX(${e.detail.dx}px)`;
      }
    }
  }

  handleTrack(e) {
    if(e.detail.state == 'start') {
      this.$container.classList.add('no-transitions');
    } else if(e.detail.state == 'track') {
      if(e.detail.dx > 0) return;
      if(e.detail.dx < -5) {
        this.$container.style.transform = `translateX(calc(100% + ${e.detail.dx}px))`;
      } else {
        this.$container.removeAttribute('style');
      }
    } else if(e.detail.state == 'end') {
      this.$container.classList.remove('no-transitions');

      if(e.detail.x < this._sidebarPositionOpenThreshold) {
        this.removeAttribute('opened');
      } else {
        this.setAttribute('opened','');
      }
      this.$container.removeAttribute('style');
    }
  }

  render() {
    return html`
      <style>
      :host {
        --sidebar-width: 260px;

        display: block;
        position: absolute;
        top: 0; left: 0;
        width: 100%; height: 100%;
        transform: translateX(-100%);
      }

      :host .container {
        background-color: #d5d4ee;
        position: absolute;
        top: 0; right: 0;
        width: var(--sidebar-width); height: 100%;
        transform: translateX(0);
        transition: transform 400ms linear;
        /* TODO: add transition prop here */
      }
      :host .container.no-transitions {
        transition: none;
      }
      :host([opened]) .container {
        transform: translateX(100%);
      }
      :host([platform="android"][opened]) .container {
        box-shadow: 0 0 20px rgba(0,0,0,.5);
      }
      </style>
      <div id="container" class="container">
        <slot></slot>
      </div>
    `;
  }
}
// Register the element with the browser
customElements.define('morph-sidebar', MorphSidebar);
