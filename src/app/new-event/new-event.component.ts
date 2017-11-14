import { Component, OnInit } from '@angular/core';
import { Event } from '../_models/index';
import { EventService} from '../_services/index';
import { AlertService, AuthenticationService } from '../_services/index';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.css']
})
export class NewEventComponent implements OnInit {
  model: Event=new Event(); 

  constructor(private eventService: EventService,
    private router: Router) { 
  }

  ngOnInit() {
  }

  createEvent(){
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
    "typeEvent": 1});
   //this.router.navigate(['/events-list']);
  }


}
