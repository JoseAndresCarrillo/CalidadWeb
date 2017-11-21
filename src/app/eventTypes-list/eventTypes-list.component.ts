/*CRUD methods for event types
by Luciano*/

import { Component, OnInit } from '@angular/core';
import { EventType } from '../_models/index';
import { EventTypeService} from '../_services/index';
import { AlertService, AuthenticationService } from '../_services/index';
import {ConfirmDialogModule,ConfirmationService} from 'primeng/primeng';
import {Message} from 'primeng/primeng';
import {GrowlModule} from 'primeng/primeng';
import {DialogModule} from 'primeng/primeng';


@Component({
    moduleId: module.id,
    templateUrl: 'eventTypes-list.component.html',
    styleUrls: ['./eventTypes-list.component.css']
})

export class EventTypesListComponent implements OnInit {
    eventTypes: EventType[] = [];//array for populate data table
    msgs: Message[] = [];//variable for messages
    model:any={};//temporary
    modelTemp:any={};//temporary variable for update
    displayNew: boolean = false;//flag for display create event type dialog
    displayUpdate: boolean = false;//flag for display update event type dialog
    constructor(private eventTypeService: EventTypeService, private confirmationService: ConfirmationService) { 
    }
    //On init
    ngOnInit() {
        this.loadAllEventTypes();
       
    }
    //Create Dialog methods
    private createNewEventType(){
        let newCategoryName=this.model.name;
        this.eventTypeService.create(this.model).subscribe(
            data => {
                this.loadAllEventTypes();
                this.msgs = [{severity:'success', summary:'Categoría agregada', detail:'Se agregó la categoría '+newCategoryName}];
            },
            error => {
                this.msgs = [{ severity: 'error', summary: 'Error en el servidor', detail: 'No se agregó al categoría' }];
            }
        );
        this.displayNew = false;
       
        this.model={};
    }
    showDialogNew() {
        this.displayNew = true;
    }
    hideDialogNew() {
        this.model={};
        this.loadAllEventTypes();
        this.displayNew = false;
        this.msgs = [{severity:'info', summary:'Categoría no creada', detail:'No se efectuaron cambios'}];
    }
    // Update Dialog methods
    private updateEventType(){
        this.eventTypeService.update(this.modelTemp).subscribe(() => { this.loadAllEventTypes() });
        this.displayUpdate = false;
        this.msgs = [{severity:'success', summary:'Categoría actualizada', detail:'Categoría actualizada exitosamente'}];
        this.modelTemp={};
       
    }
    showDialogUpdate(eventType:EventType) {
        this.modelTemp=eventType;
        this.displayUpdate = true;
    }
    hideDialogUpdate() {
        this.modelTemp={};
        this.loadAllEventTypes();
        this.displayUpdate = false;
        this.msgs = [{severity:'info', summary:'Categoría no actualizada', detail:'No se efectuaron cambios'}];
    }
    // Delete dialog
    confirmDelete(_id:string, name:string) {
        this.confirmationService.confirm({
            message: '¿Desea eliminar esta categoría de evento?',
            header: 'Eliminar categoría de evento',
            icon: 'fa fa-trash',
            accept: () => {
                this.eventTypeService.delete(_id).subscribe(() => { this.loadAllEventTypes() });
                this.msgs = [{severity:'success', summary:'Confirmado', detail:'Categoría '+name+' eliminada'}];
            },
            reject: () => {
                this.msgs = [{severity:'info', summary:'Rechazado', detail:'Categoría '+name+' no eliminada'}];
            }
        });
    }
    //Method for load all event types
    private loadAllEventTypes() {
        this.eventTypeService.getAll().subscribe((eventTypes) => { this.eventTypes = eventTypes; });
    }

}