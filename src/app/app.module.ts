import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { routing } from './app.routing';

import { customHttpProvider } from './_helpers/index';
import { AlertComponent } from './_directives/index';
import { AuthGuard } from './_guards/index';
import { AlertService, AuthenticationService, AdminService, 
    EventService, EventTypeService, FacultyService, PlaceService } from './_services/index';
import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { NavbarComponent } from './navbar/index';
import { EventListComponent } from './events-list/index';
import { EventTypesListComponent } from './eventTypes-list/index';
import { FacultiesListComponent } from './faculties-list/index';
import { PlacesListComponent } from './places-list/index';
import { NewEventComponent } from './new-event/new-event.component';
import {DataTableModule,SharedModule} from 'primeng/primeng';
import {ConfirmDialogModule,ConfirmationService} from 'primeng/primeng';
import {GrowlModule} from 'primeng/primeng';
import {PanelModule} from 'primeng/primeng';


@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpModule,
        routing,
        DataTableModule,
        SharedModule,
        ConfirmDialogModule,
        GrowlModule,
        PanelModule
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        LoginComponent,
        EventListComponent,
        NavbarComponent,
        NewEventComponent,
        EventTypesListComponent,
        FacultiesListComponent,
        PlacesListComponent
    ],
    providers: [
        customHttpProvider,
        AuthGuard,
        AlertService,
        AuthenticationService,
        AdminService,
        EventService,
        EventTypeService,
        FacultyService,
        ConfirmationService,
        PlaceService,

    ],
    bootstrap: [AppComponent]
})

export class AppModule { }