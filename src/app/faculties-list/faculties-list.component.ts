import { Component, OnInit } from '@angular/core';
import { Faculty } from '../_models/index';
import { FacultyService} from '../_services/index';
import { AlertService, AuthenticationService } from '../_services/index';
import {ConfirmDialogModule,ConfirmationService} from 'primeng/primeng';
import {Message} from 'primeng/primeng';
import {GrowlModule} from 'primeng/primeng';


@Component({
    moduleId: module.id,
    templateUrl: 'faculties-list.component.html',
    styleUrls: ['./faculties-list.component.css']
})

export class FacultiesListComponent implements OnInit {
    eventTypes: Faculty[] = [];
    msgs: Message[] = [];
    
    constructor(private facultyService: FacultyService, private confirmationService: ConfirmationService) { 
    }

    ngOnInit() {
        this.loadAllFaculties();
       
    }
    private loadAllFaculties() {
        this.facultyService.getAll().subscribe((eventTypes) => { this.eventTypes = eventTypes; });
    }
    private createnNewEventType(){
      
    }

    confirmDelete(_id:string) {
        this.confirmationService.confirm({
            message: '¿Desea eliminar esta facultad?',
            header: 'Confirmación',
            icon: 'fa fa-trash',
            accept: () => {
                this.facultyService.delete(_id).subscribe(() => { this.loadAllFaculties() });
                this.msgs = [{severity:'info', summary:'Confirmado', detail:'Facultad eliminada'}];
            },
            reject: () => {
                this.msgs = [{severity:'info', summary:'Rechazado', detail:'Facultad no eliminada'}];
            }
        });
    }

}