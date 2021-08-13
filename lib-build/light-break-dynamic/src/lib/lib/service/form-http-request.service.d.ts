import { HttpClient, HttpHeaders } from '@angular/common/http';
export declare class FormHttpRequestService {
    private http;
    apiUrl: string;
    formConfigUrl: string;
    checkHash: any;
    httpOption: {
        headers: HttpHeaders;
    };
    constructor(http: HttpClient);
    processCheckHash(): void;
    getHash(formName: any): any;
    getCheckHash(): import("rxjs").Observable<Object>;
    setToken(token: any): void;
    setApiUrl(url: any): void;
    setFormConfigUrl(url: any): void;
    post(payload: any): import("rxjs").Observable<Object>;
    getConfig(module: any): import("rxjs").Observable<Object>;
}
