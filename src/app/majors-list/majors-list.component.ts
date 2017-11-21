/*CRUD methods for majors
by Luciano*/
import { Component, OnInit } from '@angular/core';
import { Major, Faculty} from '../_models/index';
import { MajorService,FacultyService } from '../_services/index';
import { AlertService, AuthenticationService } from '../_services/index';
import { ConfirmDialogModule, ConfirmationService } from 'primeng/primeng';
import { Message } from 'primeng/primeng';
import { GrowlModule } from 'primeng/primeng';
import { DialogModule } from 'primeng/primeng';
import {DropdownModule} from 'primeng/primeng';



@Component({
    moduleId: module.id,
    templateUrl: 'majors-list.component.html',
    styleUrls: ['./majors-list.component.css']
})

export class MajorsListComponent implements OnInit {
    majors: Major[] = [];
    faculties: Faculty[] = [];
    msgs: Message[] = [];
    model: any = {};//temporary
    modelTemp: any = {};//temporary variable for update
    displayNew: boolean = false;//flag for display create faculty dialog
    displayUpdate: boolean = false;//flag for display update faculty dialog
    selectedFaculty:any={};//temporary variable for selected faculty

    constructor(private majorService: MajorService,private facultyService: FacultyService, private confirmationService: ConfirmationService) {
        
    }

    ngOnInit() {
        this.loadAllMajors();
        
    }
    //Create Dialog methods
    private createMajor() {
        this.model.faculty=this.selectedFaculty._id;
        let newMajorName = this.model.name;
        this.majorService.create(this.model).subscribe(() => { this.loadAllMajors() });
        this.displayNew = false;
        this.msgs = [{ severity: 'success', summary: 'Escuela agregado', detail: 'Se agregó ' + newMajorName }];
        this.model = {};
    }
    showDialogNew() {
        this.loadAllFaculties(); 
        this.displayNew = true;
    }
    hideDialogNew() {
        this.model = {};
        this.loadAllMajors();
        this.displayNew = false;
        this.msgs = [{ severity: 'info', summary: 'Escuela no creada', detail: 'No se efectuaron cambios' }];
    }
    // Update Dialog methods
    private updateMajor() {
        this.modelTemp.faculty=this.selectedFaculty._id;
        this.majorService.update(this.modelTemp).subscribe(() => { this.loadAllMajors() });
        this.displayUpdate = false;
        this.msgs = [{ severity: 'success', summary: 'Escuela actualizada', detail: 'Escuela actualizada exitosamente' }];
        this.modelTemp = {};
    }
    showDialogUpdate(major: Major) {
        this.loadAllFaculties(); 
        this.modelTemp = major;
        this.displayUpdate = true;
    }
    hideDialogUpdate() {
        this.modelTemp = {};
        this.loadAllMajors();
        this.displayUpdate = false;
        this.msgs = [{ severity: 'info', summary: 'Escuela no actualizada', detail: 'No se efectuaron cambios' }];
    }


    confirmDelete(_id: string, name: string) {
        this.confirmationService.confirm({
            message: '¿Desea eliminar esta escuela?',
            header: 'Confirmación',
            icon: 'fa fa-trash',
            accept: () => {
                this.majorService.delete(_id).subscribe(() => { this.loadAllMajors() });
                this.msgs = [{ severity: 'success', summary: 'Confirmado', detail: 'Escuela '+name+ ' eliminada' }];
            },
            reject: () => {
                this.msgs = [{ severity: 'info', summary: 'Rechazado', detail: 'Escuela '+name + ' no eliminada' }];
            }
        });
    }
    //Method for load all event types
    private loadAllMajors() {
        this.majorService.getAll().subscribe((majors) => { this.majors = majors; });
    }
    //Method for load all event types
    private loadAllFaculties() {
        this.facultyService.getAll().subscribe((faculties) => { this.faculties = faculties; });
    }

}