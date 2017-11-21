import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Event } from '../_models/index';

@Injectable()
export class EventService {
    constructor(private http: Http) {}

    getAll() { 
        return this.http.get('/admin/events').map((response: Response) => response.json());
    }

    create(event: Event) {
        return this.http.post('/admin/registerEvent', event);
    }

    update(event: Event) {
        return this.http.post('/admin/editEvent/', event);
    }

    delete(_id: string) {
        return this.http.delete('/admin/deleteEvent/'+_id);
    }
}