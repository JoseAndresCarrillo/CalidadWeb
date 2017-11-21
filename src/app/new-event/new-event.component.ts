import { Component, OnInit } from '@angular/core';
import { Event,Faculty,EventType } from '../_models/index';
import { Message } from 'primeng/primeng';
import { EventService,FacultyService,EventTypeService } from '../_services/index';
import { GrowlModule } from 'primeng/primeng';
import { AlertService, AuthenticationService } from '../_services/index';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {CalendarModule} from 'primeng/primeng';
import {InputTextareaModule} from 'primeng/primeng';

@Component({
    moduleId: module.id,
    templateUrl: './new-event.component.html',
    styleUrls: ['./new-event.component.css']
})
export class NewEventComponent implements OnInit {
    model: Event = new Event();
    faculties: Faculty[] = [];
    eventTypes:EventType[]=[];
    date1:Date;
    start:Date;
    end:Date;
    msgs: Message[] = [];
    es:any;
    selectedFaculty:any={};
    selectedEventType:any={};
    constructor(private eventService: EventService,
        private router: Router, private alertService: AlertService,
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
    }

    createEvent() {
       
        this.model.day=this.date1.getUTCDate().toString();
        if(this.date1.getUTCDate()<10) {
            this.model.day="0"+this.date1.getUTCDate().toString();
        }
        this.model.month=String(this.date1.getUTCMonth()+1);
        if(this.date1.getUTCMonth()<10) {
            this.model.month="0"+String(this.date1.getUTCMonth()+1);
        }
        this.model.year=this.date1.getUTCFullYear().toString();
        //star
        this.model.startHour.h=this.start.getHours().toString();
        if(this.start.getHours()<10) {
            this.model.startHour.h="0"+String(this.start.getHours());
        }
        this.model.startHour.m=this.start.getMinutes().toString();
        if(this.start.getMinutes()<10) {
            this.model.startHour.m="0"+String(this.start.getMinutes());
        }
        //end
        this.model.endHour.h=this.end.getHours().toString();
        if(this.end.getHours()<10) {
            this.model.endHour.h="0"+String(this.end.getHours());
        }
        this.model.endHour.m=this.end.getMinutes().toString();
        if(this.end.getHours()<10) {
            this.model.endHour.m="0"+String(this.end.getHours());
        }
        //Faculty set
        this.model.faculty=this.selectedFaculty._id;
        //Event Type set
        this.model.typeEvent=this.selectedEventType._id;
       
        this.eventService.create(this.model).subscribe(
            data => {
                this.msgs = [{ severity: 'success', summary: 'Evento registrado', detail: 'Evento '+this.model.title+' registrado exitosamente' }];
                this.router.navigate(['/events-list']);
            },
            error => {
                this.msgs = [{ severity: 'error', summary: 'Error del servidor', detail: 'Ha ocurrido un problema con el registro.' }];
            }
        );
    }
    private loadAllFaculties() {
        this.facultyService.getAll().subscribe((faculties) => { this.faculties = faculties; });
    }
    private loadAllEventTypes() {
        this.eventTypeService.getAll().subscribe((eventTypes) => { this.eventTypes = eventTypes; });
    }


}
