import { Component, OnInit } from '@angular/core';
import { Event,Faculty,EventType } from '../_models/index';
import { EventService,FacultyService,EventTypeService} from '../_services/index';
import { AlertService, AuthenticationService } from '../_services/index';
import {ConfirmDialogModule,ConfirmationService} from 'primeng/primeng';
import {Message} from 'primeng/primeng';
import {GrowlModule} from 'primeng/primeng';
import {CalendarModule} from 'primeng/primeng';
import {InputTextareaModule} from 'primeng/primeng';


@Component({
    moduleId: module.id,
    templateUrl: 'events-list.component.html',
    styleUrls: ['./events-list.component.css']
})

export class EventListComponent implements OnInit {
    faculties: Faculty[] = [];
    eventTypes:EventType[]=[];
    date1:Date;
    start:Date;
    end:Date;
    events: Event[] = [];
    msgs: Message[] = [];
    eventS:any={};
    displayDescription: boolean = false;
    displayUpdate: boolean = false;
    modelTemp: Event = new Event();
    es:any;
    selectedFaculty:any={};
    selectedEventType:any={};
    
    constructor(private eventService: EventService, 
        private confirmationService: ConfirmationService,
        private facultyService: FacultyService,
        private eventTypeService: EventTypeService) { 
    }

    ngOnInit() {
        this.loadAllFaculties(); 
        this.loadAllEventTypes(); 
        this.es = {
            firstDayOfWeek: 1,
            dayNames: [ "domingo","lunes","martes","miércoles","jueves","viernes","sábado" ],
            dayNamesShort: [ "dom","lun","mar","mié","jue","vie","sáb" ],
            dayNamesMin: [ "D","L","M","X","J","V","S" ],
            monthNames: [ "enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre" ],
            monthNamesShort: [ "ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic" ],
            today: 'Hoy',
            clear: 'Borrar'
        }
        this.loadAllEvents();
       
    }
    
    //update
    private updateEvent(){
        this.modelTemp.day=this.date1.getUTCDate().toString();
        if(this.date1.getUTCDate()<10) {
            this.modelTemp.day="0"+this.date1.getUTCDate().toString();
        }
        this.modelTemp.month=String(this.date1.getUTCMonth()+1);
        if(this.date1.getUTCMonth()<10) {
            this.modelTemp.month="0"+String(this.date1.getUTCMonth()+1);
        }
        this.modelTemp.year=this.date1.getUTCFullYear().toString();
        //star
        this.modelTemp.startHour.h=this.start.getHours().toString();
        if(this.start.getHours()<10) {
            this.modelTemp.startHour.h="0"+String(this.start.getHours());
        }
        this.modelTemp.startHour.m=this.start.getMinutes().toString();
        if(this.start.getMinutes()<10) {
            this.modelTemp.startHour.m="0"+String(this.start.getMinutes());
        }
        //end
        this.modelTemp.endHour.h=this.end.getHours().toString();
        if(this.end.getHours()<10) {
            this.modelTemp.endHour.h="0"+String(this.end.getHours());
        }
        this.modelTemp.endHour.m=this.end.getMinutes().toString();
        if(this.end.getHours()<10) {
            this.modelTemp.endHour.m="0"+String(this.end.getHours());
        }
        //Faculty set
        this.modelTemp.faculty=this.selectedFaculty._id;
        //Event Type set
        this.modelTemp.typeEvent=this.selectedEventType._id;
       
        this.eventService.update(this.modelTemp).subscribe(() => { this.loadAllEvents() });
        this.displayUpdate = false;
        this.msgs = [{severity:'success', summary:'Evento actualizado', detail:'Evento actualizado exitosamente'}];
        this.modelTemp=new Event();
       
    }
    showDialogUpdate(event:Event) {
        this.selectedEventType=this.modelTemp.typeEvent;
        this.selectedFaculty=this.modelTemp.faculty;
        this.modelTemp=event;
        this.displayUpdate = true;
    }
    hideDialogUpdate() {
        this.modelTemp=new Event();
        this.loadAllEvents();
        this.displayUpdate = false;
        this.msgs = [{severity:'info', summary:'Evento no actualizado', detail:'No se efectuaron cambios'}];
    }
    showDescription(event:any){
        this.eventS=event;
        this.displayDescription=true;
    }

    confirmDelete(_id:string) {
        this.confirmationService.confirm({
            message: '¿Desea eliminar este evento?',
            header: 'Eliminar evento',
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
    private loadAllEvents() {
        this.eventService.getAll().subscribe((events) => { this.events = events; });
    }
    private loadAllFaculties() {
        this.facultyService.getAll().subscribe((faculties) => { this.faculties = faculties; });
    }
    private loadAllEventTypes() {
        this.eventTypeService.getAll().subscribe((eventTypes) => { this.eventTypes = eventTypes; });
    }
}