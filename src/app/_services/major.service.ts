import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Major } from '../_models/index';

@Injectable()
export class MajorService {
    constructor(private http: Http) {}

    getAll() { 
        return this.http.get('/admin/majorsAll').map((response: Response) => response.json());
    }

    create(major: Major) {
        return this.http.post('/admin/registerMajor', major);
    }

    update(major: Major) {
        return this.http.post('/admin/editMajor/', major);
    }

    delete(_id: string) {
        return this.http.delete('/admin/deleteMajor/'+_id);
    }
}