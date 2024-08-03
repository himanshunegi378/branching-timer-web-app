import { v4 } from 'uuid';
import { TimerCard } from '../contexts/TimerCards/TimerCard';
import { memoize } from 'lodash';
import React, { ReactNode } from 'react';
// window.fetch = memoize(window.fetch);
export class Plugin {
  private _id: string = v4();
  private baseUrl: string = '';
  private code: string = '';
  private ui: React.ComponentType = () => <></>;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async init() {
    debugger;
    const manifest = await fetch(`${this.baseUrl}/manifest.json`).then((res) =>
      res.json()
    );
    const code = await fetch(`${this.baseUrl}${manifest.code}`).then((res) =>
      res.text()
    );
    if (manifest.ui) {
      const html_source = await fetch(`${this.baseUrl}${manifest.ui}`).then(
        (res) => res.text()
      );
      const blob = new Blob([html_source], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      this.ui = () => <iframe title={this.id} id={this.id} src={url} />;
    }
    this.code = code;
    return this;
  }

  get id() {
    return this._id;
  }

  get name() {
    return 'plugin';
  }

  execute(ctx: { timerCard: TimerCard }): void {
    // eslint-disable-next-line no-new-func
    const func = Function.apply(null, [
      'ctx',
      'UI',
      'pluginInstance',
      this.code,
    ]);
    debugger;
    func(ctx, this.ui, this);
  }
}
