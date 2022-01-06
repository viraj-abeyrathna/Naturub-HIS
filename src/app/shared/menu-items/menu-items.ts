import { Injectable } from '@angular/core';

export interface Menu {
    state: string;
    name: string;
    type: string;
    icon: string; 
    children:any;
  }

  const MENUITEMS=[
    {
        state: 'dashboard',
        name: 'Dashboard',
        type: 'link',
        icon: 'av_timer',
        children:[]
    },
    {
        state: '',
        name: 'Master',
        type: 'link',
        icon: 'crop_7_5',
        children:[
            {
                state: '/master/dataset',
                name: 'Dataset',
                type: 'link',
                icon: 'av_timer',
                children:[]
            },
            {
                state: 'master/component',
                name: 'Component',
                type: 'link',
                icon: 'av_timer',
                children:[]
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
  