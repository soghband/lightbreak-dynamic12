import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
export class FormHttpRequestService {
    constructor(http) {
        this.http = http;
        this.apiUrl = "";
        this.formConfigUrl = "";
        this.checkHash = null;
        this.httpOption = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            }),
        };
    }
    processCheckHash() {
        this.getCheckHash().subscribe((resp) => {
            this.checkHash = resp;
        });
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
            'Content-Type': 'application/json',
            'Token': token
        });
    }
    setApiUrl(url) {
        this.apiUrl = url;
    }
    setFormConfigUrl(url) {
        if (!String(url).match(/\/$/)) {
            url = url + "/";
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
FormHttpRequestService.ɵprov = i0.ɵɵdefineInjectable({ factory: function FormHttpRequestService_Factory() { return new FormHttpRequestService(i0.ɵɵinject(i1.HttpClient)); }, token: FormHttpRequestService, providedIn: "root" });
FormHttpRequestService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
FormHttpRequestService.ctorParameters = () => [
    { type: HttpClient }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1odHRwLXJlcXVlc3Quc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2xpZ2h0LWJyZWFrLWR5bmFtaWMvc3JjL2xpYi9zZXJ2aWNlL2Zvcm0taHR0cC1yZXF1ZXN0LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUMsVUFBVSxFQUFFLFdBQVcsRUFBQyxNQUFNLHNCQUFzQixDQUFDOzs7QUFLN0QsTUFBTSxPQUFPLHNCQUFzQjtJQVVqQyxZQUFvQixJQUFnQjtRQUFoQixTQUFJLEdBQUosSUFBSSxDQUFZO1FBVHBDLFdBQU0sR0FBRyxFQUFFLENBQUM7UUFDWixrQkFBYSxHQUFHLEVBQUUsQ0FBQztRQUNuQixjQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLGVBQVUsR0FBRztZQUNYLE9BQU8sRUFBRyxJQUFJLFdBQVcsQ0FBQztnQkFDeEIsY0FBYyxFQUFHLGtCQUFrQjthQUNwQyxDQUFDO1NBQ0gsQ0FBQztJQUVzQyxDQUFDO0lBRXpDLGdCQUFnQjtRQUNkLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFRLEVBQUUsRUFBRTtZQUN6QyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQTtRQUN2QixDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFDRCxPQUFPLENBQUMsUUFBUTtRQUNkLElBQUksSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQzlDLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUNqQztRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUNELFlBQVk7UUFDVixNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQztRQUMvQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3BELENBQUM7SUFDRCxRQUFRLENBQUMsS0FBSztRQUNaLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxHQUFHLElBQUksV0FBVyxDQUFDO1lBQ3hDLGNBQWMsRUFBRyxrQkFBa0I7WUFDbkMsT0FBTyxFQUFFLEtBQUs7U0FDZixDQUFDLENBQUM7SUFDTCxDQUFDO0lBQ0QsU0FBUyxDQUFDLEdBQUc7UUFDWCxJQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQztJQUNwQixDQUFDO0lBQ0QsZ0JBQWdCLENBQUMsR0FBRztRQUNsQixJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUM3QixHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQTtTQUNoQjtRQUNELElBQUksQ0FBQyxhQUFhLEdBQUcsR0FBRyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO0lBQzFCLENBQUM7SUFFRCxJQUFJLENBQUMsT0FBTztRQUNWLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDeEIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUN2RCxDQUFDO0lBQ0QsU0FBUyxDQUFDLE1BQU07UUFDZCxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsYUFBYSxHQUFHLE1BQU0sQ0FBQztRQUN4QyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3BELENBQUM7Ozs7WUF0REYsVUFBVSxTQUFDO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2FBQ25COzs7WUFKTyxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtIdHRwQ2xpZW50LCBIdHRwSGVhZGVyc30gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBGb3JtSHR0cFJlcXVlc3RTZXJ2aWNlIHtcbiAgYXBpVXJsID0gXCJcIjtcbiAgZm9ybUNvbmZpZ1VybCA9IFwiXCI7XG4gIGNoZWNrSGFzaCA9IG51bGw7XG4gIGh0dHBPcHRpb24gPSB7XG4gICAgaGVhZGVyczogIG5ldyBIdHRwSGVhZGVycyh7XG4gICAgICAnQ29udGVudC1UeXBlJzogICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICB9KSxcbiAgfTtcbiAgXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cENsaWVudCkgeyB9XG4gIFxuICBwcm9jZXNzQ2hlY2tIYXNoKCkge1xuICAgIHRoaXMuZ2V0Q2hlY2tIYXNoKCkuc3Vic2NyaWJlKChyZXNwOmFueSkgPT4ge1xuICAgICAgdGhpcy5jaGVja0hhc2ggPSByZXNwXG4gICAgfSlcbiAgfVxuICBnZXRIYXNoKGZvcm1OYW1lKSB7XG4gICAgaWYgKHRoaXMuY2hlY2tIYXNoICYmIHRoaXMuY2hlY2tIYXNoW2Zvcm1OYW1lXSkge1xuICAgICAgcmV0dXJuIHRoaXMuY2hlY2tIYXNoW2Zvcm1OYW1lXTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgZ2V0Q2hlY2tIYXNoKCkge1xuICAgIGNvbnN0IHVybCA9IHRoaXMuZm9ybUNvbmZpZ1VybCArIFwiX2NoZWNrLWhhc2hcIjtcbiAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QodXJsLCBudWxsLCB0aGlzLmh0dHBPcHRpb24pO1xuICB9XG4gIHNldFRva2VuKHRva2VuKSB7XG4gICAgdGhpcy5odHRwT3B0aW9uLmhlYWRlcnMgPSBuZXcgSHR0cEhlYWRlcnMoe1xuICAgICAgJ0NvbnRlbnQtVHlwZSc6ICAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAnVG9rZW4nOiB0b2tlblxuICAgIH0pO1xuICB9XG4gIHNldEFwaVVybCh1cmwpIHtcbiAgICB0aGlzLmFwaVVybCA9IHVybDtcbiAgfVxuICBzZXRGb3JtQ29uZmlnVXJsKHVybCkge1xuICAgIGlmICghU3RyaW5nKHVybCkubWF0Y2goL1xcLyQvKSkge1xuICAgICAgdXJsID0gdXJsICsgXCIvXCJcbiAgICB9XG4gICAgdGhpcy5mb3JtQ29uZmlnVXJsID0gdXJsO1xuICAgIHRoaXMucHJvY2Vzc0NoZWNrSGFzaCgpO1xuICB9XG4gIFxuICBwb3N0KHBheWxvYWQpIHtcbiAgICBjb25zdCB1cmwgPSB0aGlzLmFwaVVybDtcbiAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QodXJsLCBwYXlsb2FkLCB0aGlzLmh0dHBPcHRpb24pO1xuICB9XG4gIGdldENvbmZpZyhtb2R1bGUpIHtcbiAgICBjb25zdCB1cmwgPSB0aGlzLmZvcm1Db25maWdVcmwgKyBtb2R1bGU7XG4gICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KHVybCwgbnVsbCwgdGhpcy5odHRwT3B0aW9uKTtcbiAgfVxufVxuIl19