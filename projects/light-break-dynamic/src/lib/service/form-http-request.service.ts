import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FormHttpRequestService {
  apiUrl = "";
  formConfigUrl = "";
  checkHash = null;
  httpOption = {
    headers:  new HttpHeaders({
      'Content-Type':  'application/json',
    }),
  };
  
  constructor(private http: HttpClient) { }
  
  processCheckHash() {
    this.getCheckHash().subscribe((resp:any) => {
      this.checkHash = resp
    })
  }
  getHash(formName) {
    if (this.checkHash && this.checkHash[formName]) {
      return this.checkHash[formName];
    }
    return null;
  }
  getCheckHash() {
    const url = this.formConfigUrl + "_check-hash";
    return this.http.post(url, null, this.httpOption);
  }
  setToken(token) {
    this.httpOption.headers = new HttpHeaders({
      'Content-Type':  'application/json',
      'Token': token
    });
  }
  setApiUrl(url) {
    this.apiUrl = url;
  }
  setFormConfigUrl(url) {
    if (!String(url).match(/\/$/)) {
      url = url + "/"
    }
    this.formConfigUrl = url;
    this.processCheckHash();
  }
  
  post(payload) {
    const url = this.apiUrl;
    return this.http.post(url, payload, this.httpOption);
  }
  getConfig(module) {
    const url = this.formConfigUrl + module;
    return this.http.post(url, null, this.httpOption);
  }
}
