import { Routes } from '@angular/router';
import { EntryPageComponent } from './entry-page/entry-page.component';
import { GamePageComponent } from './game-page/game-page.component';

export const routes: Routes = [
    { path: 'entry', component: EntryPageComponent },
    { path: 'game', component: GamePageComponent },
    { path: '', redirectTo: '/entry', pathMatch: 'full' },
];
