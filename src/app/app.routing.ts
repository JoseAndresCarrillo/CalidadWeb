import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { NavbarComponent } from './navbar/navbar.component';
import { EventListComponent } from './events-list/events-list.component';
import { EventTypesListComponent } from './eventTypes-list/eventTypes-list.component';
import { FacultiesListComponent } from './faculties-list/faculties-list.component';
import { PlacesListComponent } from './places-list/places-list.component';
import { NewEventComponent } from './new-event/new-event.component';
import { AuthGuard } from './_guards/index';

const appRoutes: Routes = [
    { path:'login', component: LoginComponent },
    {
              path:'', 
              component: NavbarComponent,
              children: [
                { path: '', component: HomeComponent, canActivate: [AuthGuard] },
                { path: 'events-list', component: EventListComponent, canActivate: [AuthGuard] },
                { path: 'eventTypes-list', component: EventTypesListComponent, canActivate: [AuthGuard] },
                { path: 'new-event', component: NewEventComponent, canActivate: [AuthGuard] },
                { path: 'faculties-list', component: FacultiesListComponent, canActivate: [AuthGuard] },
                { path: 'places-list', component: PlacesListComponent, canActivate: [AuthGuard] },
                ]
      },

    // otherwise redirect to home
    { path: '**', redirectTo: '/' }
];

export const routing = RouterModule.forRoot(appRoutes);