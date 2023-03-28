// eslint-disable-next-line no-unused-vars
import { Component, Element, h, Prop, State, Watch } from '@stencil/core';
import { state } from '../../store/internal';
import Keys from '../../elements/Keys';
import get from '../../utils/query/get';
import { result } from 'lodash-es';
import Value from '../../elements/Value';

@Component({
  tag: 'streamline-row',
  styleUrls: ['../../css/tailwind.scss', '../../css/focus.scss'],
  shadow: true,
})
// eslint-disable-next-line no-unused-vars
export class StreamlineRow {
  private button: HTMLElement;

  // eslint-disable-next-line no-undef
  @Element() el: HTMLStreamlineRowElement;

  @Prop({ mutable: true, reflect: true }) disabled = false;
  @Prop() item: any;
  @Prop() mb;
  @Prop({ reflect: true, mutable: true }) isCurrentSite = false;
  @Prop({ reflect: true, mutable: true }) isFav = false;
  @Prop({ reflect: true, mutable: true }) isFocus = false;
  @Prop({ reflect: true, mutable: true }) isEdit = false;

  @State() showKey = false;

  @Watch('isFocus')
  onChangeIsFocus(value) {
    value ? this.button.focus?.() : this.button?.blur?.();
  }

  private onClick = () => {
    if (this.item?.type === 'api' && this.item?.route) {
      state.searchedValue = state.searchValue;
      get({ ...this.item });
    }
  };

  private onKeyPress = (e) => {
    if (e.key === 'Enter' && this.item?.type === 'api' && this.item?.route) {
      this.onClick();
    }
  };

  render() {
    const isTable = state.active === 'query' && state.action.table.length >= 2;

    return (
      <li class="relative select-all">
        <a
          ref={(el) => (this.button = el as HTMLElement)}
          tabindex={0}
          href={
            state.active === 'query'
              ? result(this.item, state.action?.href)
              : this.item.type !== 'api'
              ? this.item.href
              : '#0'
          }
          class="sl-px focus-inner focus-white peer relative inline-block flex h-9 w-full cursor-pointer flex-wrap items-center text-sm font-medium text-slate-900 sm:hover:bg-slate-50 sm:hover:text-blue-600"
          onBlur={() => (this.showKey = false)}
          onClick={this.onClick}
          onFocus={() => (this.showKey = true)}
          onKeyPress={this.onKeyPress}
          onMouseDown={(e) => e.preventDefault()}
        >
          {!isTable &&
            (state.searchValue !== '' &&
            this.item.nameActive &&
            this.item.nameActive !== '' ? (
              <Value>{this.item.nameActive}</Value>
            ) : (
              <span>{this.item.name}</span>
            ))}
        </a>
        {isTable && (
          <div class="sl-px sl-grid pointer-events-none absolute top-0 h-full w-full items-center font-semibold text-slate-700 sm:peer-hover:text-blue-600">
            {state.action.table.map((itemNested) => {
              return (
                <span class="relative line-clamp-1">
                  {itemNested?.value
                    ? result(this.item, itemNested?.value)
                    : ''}
                </span>
              );
            })}
          </div>
        )}
        {this.showKey && (
          <div class="absolute right-2 top-1/2 -translate-y-1/2">
            <Keys keys={['↵']} />
          </div>
        )}
        {this.item.dropdown && (
          <streamline-dropdown
            class="absolute right-4 top-0 block hidden h-full w-12 opacity-0 focus-within:opacity-100 hover:opacity-100 peer-hover:opacity-100 sm:right-8 sm:block lg:right-12"
            type="entry"
            items={this.item.dropdown}
          />
        )}
      </li>
    );
  }
}
