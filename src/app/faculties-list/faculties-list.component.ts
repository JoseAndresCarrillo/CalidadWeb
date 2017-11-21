/*CRUD methods for event types
by Luciano*/
import { Component, OnInit } from '@angular/core';
import { Faculty } from '../_models/index';
import { FacultyService } from '../_services/index';
import { AlertService, AuthenticationService } from '../_services/index';
import { ConfirmDialogModule, ConfirmationService } from 'primeng/primeng';
import { Message } from 'primeng/primeng';
import { GrowlModule } from 'primeng/primeng';
import { DialogModule } from 'primeng/primeng';


@Component({
    moduleId: module.id,
    templateUrl: 'faculties-list.component.html',
    styleUrls: ['./faculties-list.component.css']
})

export class FacultiesListComponent implements OnInit {
    faculties: Faculty[] = [];
    msgs: Message[] = [];
    model: any = {};//temporary
    modelTemp: any = {};//temporary variable for update
    displayNew: boolean = false;//flag for display create faculty dialog
    displayUpdate: boolean = false;//flag for display update faculty dialog

    constructor(private facultyService: FacultyService, private confirmationService: ConfirmationService) {
    }

    ngOnInit() {
        this.loadAllFaculties();

    }
    //Create Dialog methods
    private createFaculty() {
        let newFacultyName = this.model.name;
        this.facultyService.create(this.model).subscribe(() => { this.loadAllFaculties() });
        this.displayNew = false;
        this.msgs = [{ severity: 'success', summary: 'Facultad agregada', detail: 'Se agregó la ' + newFacultyName }];
        this.model = {};
    }
    showDialogNew() {
        this.displayNew = true;
    }
    hideDialogNew() {
        this.model = {};
        this.loadAllFaculties();
        this.displayNew = false;
        this.msgs = [{ severity: 'info', summary: 'Facultad no creada', detail: 'No se efectuaron cambios' }];
    }
    // Update Dialog methods
    private updateFaculty() {
        this.facultyService.update(this.modelTemp).subscribe(() => { this.loadAllFaculties() });
        this.displayUpdate = false;
        this.msgs = [{ severity: 'success', summary: 'Facultad actualizada', detail: 'Facultad actualizada exitosamente' }];
        this.modelTemp = {};
    }
    showDialogUpdate(faculty: Faculty) {
        this.modelTemp = faculty;
        this.displayUpdate = true;
    }
    hideDialogUpdate() {
        this.modelTemp = {};
        this.loadAllFaculties();
        this.displayUpdate = false;
        this.msgs = [{ severity: 'info', summary: 'Facultad no actualizada', detail: 'No se efectuaron cambios' }];
    }


    confirmDelete(_id: string, name: string) {
        this.confirmationService.confirm({
            message: '¿Desea eliminar esta facultad?',
            header: 'Eliminar facultad',
            icon: 'fa fa-trash',
            accept: () => {
                this.facultyService.delete(_id).subscribe(() => { this.loadAllFaculties() });
                this.msgs = [{ severity: 'success', summary: 'Confirmado', detail: name + 'eliminada' }];
            },
            reject: () => {
                this.msgs = [{ severity: 'info', summary: 'Rechazado', detail: name + ' no eliminada' }];
            }
        });
    }
    //Method for load all event types
    private loadAllFaculties() {
        this.facultyService.getAll().subscribe((faculties) => { this.faculties = faculties; });
    }

}