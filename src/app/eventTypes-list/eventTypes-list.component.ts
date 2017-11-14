import { Component, OnInit } from '@angular/core';
import { EventType } from '../_models/index';
import { EventTypeService} from '../_services/index';
import { AlertService, AuthenticationService } from '../_services/index';
import {ConfirmDialogModule,ConfirmationService} from 'primeng/primeng';
import {Message} from 'primeng/primeng';
import {GrowlModule} from 'primeng/primeng';


@Component({
    moduleId: module.id,
    templateUrl: 'eventTypes-list.component.html',
    styleUrls: ['./eventTypes-list.component.css']
})

export class EventTypesListComponent implements OnInit {
    eventTypes: EventType[] = [];
    msgs: Message[] = [];
    
    constructor(private eventTypeService: EventTypeService, private confirmationService: ConfirmationService) { 
    }

    ngOnInit() {
        this.loadAllEventTypes();
       
    }
    private loadAllEventTypes() {
        this.eventTypeService.getAll().subscribe((eventTypes) => { this.eventTypes = eventTypes; });
    }
    private createnNewEventType(){
      
    }

    confirmDelete(_id:string) {
        this.confirmationService.confirm({
            message: '¿Desea eliminar esta categoría de evento?',
            header: 'Confirmación',
            icon: 'fa fa-trash',
            accept: () => {
                this.eventTypeService.delete(_id).subscribe(() => { this.loadAllEventTypes() });
                this.msgs = [{severity:'info', summary:'Confirmado', detail:'Categoría eliminada'}];
            },
            reject: () => {
                this.msgs = [{severity:'info', summary:'Rechazado', detail:'Categoría no eliminada'}];
            }
        });
    }

}