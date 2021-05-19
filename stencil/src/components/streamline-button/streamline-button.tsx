// eslint-disable-next-line no-unused-vars
import { Component, h, Prop, Host } from '@stencil/core';
import { stateLocal } from '../../store/local';

/**
 * Box.
 */
@Component({
  tag: 'streamline-button',
  shadow: true,
  styleUrl: 'streamline-button.scss',
})
export class StreamlineButton {
  @Prop({ reflect: true }) icon: string;
  @Prop({ reflect: true }) text: string;
  @Prop({ reflect: true }) type: string;

  private handleClick() {
    if (this.icon === 'menu' || this.icon === 'tasks') {
      stateLocal.active = this.icon;
    }
  }

  render() {
    const iconWordpress = (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 -2 24 24">
        <path d="M20 10c0-5.51-4.49-10-10-10C4.48 0 0 4.49 0 10c0 5.52 4.48 10 10 10 5.51 0 10-4.48 10-10zM7.78 15.37L4.37 6.22c.55-.02 1.17-.08 1.17-.08.5-.06.44-1.13-.06-1.11 0 0-1.45.11-2.37.11-.18 0-.37 0-.58-.01C4.12 2.69 6.87 1.11 10 1.11c2.33 0 4.45.87 6.05 2.34-.68-.11-1.65.39-1.65 1.58 0 .74.45 1.36.9 2.1.35.61.55 1.36.55 2.46 0 1.49-1.4 5-1.4 5l-3.03-8.37c.54-.02.82-.17.82-.17.5-.05.44-1.25-.06-1.22 0 0-1.44.12-2.38.12-.87 0-2.33-.12-2.33-.12-.5-.03-.56 1.2-.06 1.22l.92.08 1.26 3.41zM17.41 10c.24-.64.74-1.87.43-4.25.7 1.29 1.05 2.71 1.05 4.25 0 3.29-1.73 6.24-4.4 7.78.97-2.59 1.94-5.2 2.92-7.78zM6.1 18.09C3.12 16.65 1.11 13.53 1.11 10c0-1.3.23-2.48.72-3.59C3.25 10.3 4.67 14.2 6.1 18.09zm4.03-6.63l2.58 6.98c-.86.29-1.76.45-2.71.45-.79 0-1.57-.11-2.29-.33.81-2.38 1.62-4.74 2.42-7.1z" />
      </svg>
    );

    const iconMenu = (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M5 5v1.5h14V5H5zm0 7.8h14v-1.5H5v1.5zM5 19h14v-1.5H5V19z" />
      </svg>
    );

    const iconTasks = (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M19.75 9c0-1.257-.565-2.197-1.39-2.858-.797-.64-1.827-1.017-2.815-1.247-1.802-.42-3.703-.403-4.383-.396L11 4.5V6l.177-.001c.696-.006 2.416-.02 4.028.356.887.207 1.67.518 2.216.957.52.416.829.945.829 1.688 0 .592-.167.966-.407 1.23-.255.281-.656.508-1.236.674-1.19.34-2.82.346-4.607.346h-.077c-1.692 0-3.527 0-4.942.404-.732.209-1.424.545-1.935 1.108-.526.579-.796 1.33-.796 2.238 0 1.257.565 2.197 1.39 2.858.797.64 1.827 1.017 2.815 1.247 1.802.42 3.703.403 4.383.396L13 19.5h.714V22L18 18.5 13.714 15v3H13l-.177.001c-.696.006-2.416.02-4.028-.356-.887-.207-1.67-.518-2.216-.957-.52-.416-.829-.945-.829-1.688 0-.592.167-.966.407-1.23.255-.281.656-.508 1.237-.674 1.189-.34 2.819-.346 4.606-.346h.077c1.692 0 3.527 0 4.941-.404.732-.209 1.425-.545 1.936-1.108.526-.579.796-1.33.796-2.238z" />
      </svg>
    );

    const iconHeart = (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <path
          fill="currentColor"
          d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"
        />
      </svg>
    );

    return (
      <Host>
        <div class={'focus' + (this.type ? ` ${this.type}` : '')}>
          <button
            onClick={() => this.handleClick()}
            class={
              'container' +
              (this.type ? ` ${this.type}` : '') +
              (stateLocal.active === this.icon ? ` is-active` : '')
            }
          >
            {this.icon === 'wordpress'
              ? iconWordpress
              : this.icon === 'menu'
              ? iconMenu
              : this.icon === 'tasks' && iconTasks}
            {this.text && <span>{this.text}</span>}
          </button>
        </div>
        {this.type === 'is-main' && (
          <div class={'focus is-icon'}>
            <button class={'icon'}>{iconHeart}</button>
          </div>
        )}
      </Host>
    );
  }
}
