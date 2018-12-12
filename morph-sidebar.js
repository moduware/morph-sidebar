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

      opened: Boolean
    };
  }

  firstUpdated() {
    super.firstUpdated();

    if (!this.hasAttribute('platform')) {
      this.platform = getPlatform();
    }

    Gestures.addListener(document.body, 'track', this.handleBodyTrack.bind(this));
    Gestures.addListener(this, 'track', this.handleTrack.bind(this));
    this.$container = this.shadowRoot.getElementById('container');
  }
  handleBodyTrack(e) {
    const sidebarSwipeAreaWidth = 50;
    const sidebarSwipeIntensityThreshold = 30;
    if(this.opened) return;
    if(e.detail.x < sidebarSwipeAreaWidth) return;
    if(e.detail.dx > sidebarSwipeIntensityThreshold) this.setAttribute('opened', '');
    console.log(e.detail);
  }

  handleTrack(e) {
    console.log(e.detail);
    if(e.detail.state == 'start') {
      this.$container.classList.add('no-transitions');
    } else if(e.detail.state == 'track') {
      if(e.detail.dx > 0) return;
      this.$container.style.transform = `translateX(calc(100% + ${e.detail.dx}px))`;
    } else if(e.detail.state == 'end') {
      this.$container.classList.remove('no-transitions');

      if(e.detail.x < 100) {
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
