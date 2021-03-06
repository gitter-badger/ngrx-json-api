import { Response, ResponseOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

import { NgrxJsonApi } from './api';
import { Payload } from './interfaces';


export class JsonApiMock {
    constructor() { }

    create(payload: Payload) {
        if (payload.jsonApiData.data.type === 'SUCCESS') {
            return Observable.of('SUCCESS');
        } else if (payload.jsonApiData.data.type === 'FAIL') {
            return Observable.throw('FAIL');
        }
    }

    update(payload: Payload) {
        if (payload.jsonApiData.data.type === 'SUCCESS') {
            return Observable.of('SUCCESS');
        } else if (payload.jsonApiData.data.type === 'FAIL') {
            return Observable.throw('FAIL');
        }
    }

    find(payload: Payload) {
        if (payload.query.type === 'SUCCESS') {
            let res = {
                data: {
                    type: 'SUCCESS'
                }
            }
            return Observable.of(new Response(
                new ResponseOptions({
                    body: JSON.stringify(res),
                    status: 200
                })
            ));
        } else if (payload.query.type === 'FAIL') {
            let res = {
                data: {
                    type: 'FAIL'
                }
            }
            return Observable.throw(new Response(
                new ResponseOptions({ status: 404 })
            ));
        }
    }

    delete(payload: Payload) {
        if (payload.query.type === 'SUCCESS') {
            return Observable.of(new Response(
                new ResponseOptions({})));
        } else if (payload.query.type === 'FAIL') {
            return Observable.throw(new Response(
                new ResponseOptions({ status: 404 })));
        }
    }
}

export const MOCK_JSON_API_PROVIDERS = [
    { provide: JsonApiMock, useClass: JsonApiMock },
    { provide: NgrxJsonApi, useExisting: JsonApiMock }
];
