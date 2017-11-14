import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { Admin } from '../_models/index';

@Injectable()
export class AdminService {
    constructor(private http: Http) { }

    getAll() {
        return this.http.get('/admin').map((response: Response) => response.json());
    }

    getById(_id: string) {
        return this.http.get('/admin/' + _id).map((response: Response) => response.json());
    }

    create(admin: Admin) {
        return this.http.post('/admin/register', admin);
    }

    update(admin: Admin) {
        return this.http.post('/admin/', admin);
    }

    delete(_id: string) {
        return this.http.delete('/admin/' + _id);
    }
}