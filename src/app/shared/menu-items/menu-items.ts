import { Injectable } from '@angular/core';

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
  children: any;
}

const MENUITEMS = [
  {
    state: 'dashboard',
    name: 'Dashboard',
    type: 'link',
    icon: 'av_timer',
    children: []
  },
  {
    state: '',
    name: 'Master',
    type: 'link',
    icon: 'crop_7_5',
    children: [
      {
        state: 'master/dataset',
        name: 'Data Sets',
        type: 'link',
        icon: 'av_timer',
        children: []
      },
      {
        state: 'master/component',
        name: 'Components',
        type: 'link',
        icon: 'av_timer',
        children: []
      },
      {
        state: 'master/forms',
        name: 'Forms',
        type: 'link',
        icon: 'av_timer',
        children: []
      }

    ]
  },
]

@Injectable()
export class MenuItems {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }
}
