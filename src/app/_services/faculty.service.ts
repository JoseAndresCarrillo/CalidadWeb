import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Faculty } from '../_models/index';

@Injectable()
export class FacultyService {
    constructor(private http: Http) {}

    getAll() { 
        return this.http.get('/admin/faculties').map((response: Response) => response.json());
    }

    create(faculty: Faculty) {
        return this.http.post('/admin/registerFaculty', faculty);
    }

    update(faculty: Faculty) {
        return this.http.post('/admin/editFaculties', faculty);
    }

    delete(_id: string) {
        return this.http.delete('/admin/deleteFaculty/'+_id);
    }
}