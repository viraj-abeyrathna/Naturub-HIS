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
    icon: 'subject',
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
  
  {
    state: '',
    name: 'Inventory',
    type: 'link',
    icon: 'devices_other',
    children: [
      {
        state: 'inventory/computer',
        name: 'Computers',
        type: 'link',
        icon: 'av_timer',
        children: []
      },
      {
        state: 'inventory/ups',
        name: 'UPS',
        type: 'link',
        icon: 'av_timer',
        children: []
      },
      {
        state: 'inventory/accesspoint',
        name: 'Access Point',
        type: 'link',
        icon: 'av_timer',
        children: []
      },
      {
        state: 'inventory/cctv',
        name: 'CCTV',
        type: 'link',
        icon: 'av_timer',
        children: []
      },
      {
        state: 'inventory/dvr',
        name: 'DVR',
        type: 'link',
        icon: 'av_timer',
        children: []
      },
      {
        state: 'inventory/ethernetswitch',
        name: 'Ethernet Switch',
        type: 'link',
        icon: 'av_timer',
        children: []
      },
      {
        state: 'inventory/mobilephone',
        name: 'Mobile Phone',
        type: 'link',
        icon: 'av_timer',
        children: []
      },
      {
        state: 'inventory/monitor',
        name: 'Monitor',
        type: 'link',
        icon: 'av_timer',
        children: []
      },
      {
        state: 'inventory/printer',
        name: 'Printer',
        type: 'link',
        icon: 'av_timer',
        children: []
      },
      {
        state: 'inventory/projector',
        name: 'Projector',
        type: 'link',
        icon: 'av_timer',
        children: []
      },
      {
        state: 'inventory/routerdongle',
        name: '4G Router & Dongle',
        type: 'link',
        icon: 'av_timer',
        children: []
      },
      {
        state: 'inventory/scanner',
        name: 'Scanner',
        type: 'link',
        icon: 'av_timer',
        children: []
      }
    ]
  },

  {
    state: '',
    name: 'Maintenance',
    type: 'link',
    icon: 'build',
    children: [
      {
        state: 'maintenance/jobcard',
        name: 'Job Card',
        type: 'link',
        icon: 'av_timer',
        children: []
      }
      // ,
      // {
      //   state: 'master/component',
      //   name: 'Components',
      //   type: 'link',
      //   icon: 'av_timer',
      //   children: []
      // },
      // {
      //   state: 'master/forms',
      //   name: 'Forms',
      //   type: 'link',
      //   icon: 'av_timer',
      //   children: []
      // }

    ]
  },
]

@Injectable()
export class MenuItems {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }
}
