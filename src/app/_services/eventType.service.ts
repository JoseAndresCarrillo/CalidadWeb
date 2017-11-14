import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { EventType } from '../_models/index';

@Injectable()
export class EventTypeService {
    constructor(private http: Http) {}

    getAll() { 
        return this.http.get('/admin/eventTypes').map((response: Response) => response.json());
    }

    create(eventType: EventType) {
        return this.http.post('/admin/registerEventType', eventType);
    }

    update(eventType: EventType) {
        return this.http.post('/admin/editEventTypes', eventType);
    }

    delete(_id: string) {
        return this.http.delete('/admin/deleteEventTypes/'+_id);
    }
}