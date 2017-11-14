import { Component, OnInit } from '@angular/core';
import { Place } from '../_models/index';
import { PlaceService} from '../_services/index';
import { AlertService, AuthenticationService } from '../_services/index';
import {ConfirmDialogModule,ConfirmationService} from 'primeng/primeng';
import {Message} from 'primeng/primeng';
import {GrowlModule} from 'primeng/primeng';


@Component({
    moduleId: module.id,
    templateUrl: 'places-list.component.html',
    styleUrls: ['./places-list.component.css']
})

export class PlacesListComponent implements OnInit {
    places: Place[] = [];
    msgs: Message[] = [];
    
    constructor(private placeService: PlaceService, private confirmationService: ConfirmationService) { 
    }

    ngOnInit() {
        this.loadAllPlaces();
       
    }
    private loadAllPlaces() {
        this.placeService.getAll().subscribe((places) => { this.places = places; });
    }
    private createnNewEventType(){
      
    }

    confirmDelete(_id:string) {
        this.confirmationService.confirm({
            message: '¿Desea eliminar esta lugar?',
            header: 'Confirmación',
            icon: 'fa fa-trash',
            accept: () => {
                this.placeService.delete(_id).subscribe(() => { this.loadAllPlaces() });
                this.msgs = [{severity:'info', summary:'Confirmado', detail:'Lugar eliminado'}];
            },
            reject: () => {
                this.msgs = [{severity:'info', summary:'Rechazado', detail:'Lugar no eliminado'}];
            }
        });
    }

}