import { Component, OnInit } from '@angular/core';
import { Event } from '../_models/index';
import { EventService} from '../_services/index';
import { AlertService, AuthenticationService } from '../_services/index';
import {ConfirmDialogModule,ConfirmationService} from 'primeng/primeng';
import {Message} from 'primeng/primeng';
import {GrowlModule} from 'primeng/primeng';


@Component({
    moduleId: module.id,
    templateUrl: 'events-list.component.html',
    styleUrls: ['./events-list.component.css']
})

export class EventListComponent implements OnInit {
    events: Event[] = [];
    msgs: Message[] = [];
    
    constructor(private eventService: EventService, private confirmationService: ConfirmationService) { 
    }

    ngOnInit() {
        this.loadAllEvents();
       
    }
    private loadAllEvents() {
        this.eventService.getAll().subscribe((events) => { this.events = events; });
    }
    private createnNewEvent(){
        this.eventService.create(
            {"title": "ENEISOFT 2021", 
            "description": "Hue hue hue hue hue hue hue" , 
            "day": "02", 
            "month": "02",  
            "year": "2017",
            "startHour":  { "h": "11" , "m": "00"}, 
            "endHour":  { "h": "12", "m": "00" }, 
            "faculty": 200, 
            "place": "Teatro de la FISI", 
            "typeEvent": 1}).subscribe(() => { this.loadAllEvents() });;
    }

    confirmDelete(_id:string) {
        this.confirmationService.confirm({
            message: '¿Desea eliminar este evento?',
            header: 'Confirmación',
            icon: 'fa fa-trash',
            accept: () => {
                this.eventService.delete(_id).subscribe(() => { this.loadAllEvents() });
                this.msgs = [{severity:'info', summary:'Confirmado', detail:'Evento eliminado'}];
            },
            reject: () => {
                this.msgs = [{severity:'info', summary:'Rechazado', detail:'Evento no eliminado'}];
            }
        });
    }

}