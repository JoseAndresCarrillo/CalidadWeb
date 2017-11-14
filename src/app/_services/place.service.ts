import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Place} from '../_models/index';

@Injectable()
export class PlaceService {
    constructor(private http: Http) {}

    getAll() { 
        return this.http.get('/admin/placesAll').map((response: Response) => response.json());
    }

    create(place: Place) {
        return this.http.post('/admin/registerPlace', place);
    }

    update(faculty: Place) {
        return this.http.post('/admin/editPlace/', faculty);
    }

    delete(_id: string) {
        return this.http.delete('/admin/deletePlace/'+_id);
    }
}