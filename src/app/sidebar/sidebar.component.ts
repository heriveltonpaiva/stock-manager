import { Component, OnInit } from '@angular/core';


export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    { path: '/dashboard',       title: 'Painel Financeiro',   icon:'nc-bank',        class: '' },
    { path: '/note',            title: 'Notas de Negociação', icon:'nc-paper',       class: '' },
    { path: '/operations',      title: 'Operações de Ativos', icon:'nc-tile-56',     class: '' },
    { path: '/stock-position',  title: 'Minhas Posições',     icon:'nc-trophy',      class: '' },
    { path: '/total-operation', title: 'Detalhes Financeiros',icon:'nc-money-coins', class: '' }
];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
}
