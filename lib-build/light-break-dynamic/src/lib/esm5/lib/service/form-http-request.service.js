import { __decorate, __metadata } from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
var FormHttpRequestService = /** @class */ (function () {
    function FormHttpRequestService(http) {
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
    FormHttpRequestService.prototype.processCheckHash = function () {
        var _this = this;
        this.getCheckHash().subscribe(function (resp) {
            _this.checkHash = resp;
        });
    };
    FormHttpRequestService.prototype.getHash = function (formName) {
        if (this.checkHash && this.checkHash[formName]) {
            return this.checkHash[formName];
        }
        return null;
    };
    FormHttpRequestService.prototype.getCheckHash = function () {
        var url = this.formConfigUrl + "_check-hash";
        return this.http.post(url, null, this.httpOption);
    };
    FormHttpRequestService.prototype.setToken = function (token) {
        this.httpOption.headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Token': token
        });
    };
    FormHttpRequestService.prototype.setApiUrl = function (url) {
        this.apiUrl = url;
    };
    FormHttpRequestService.prototype.setFormConfigUrl = function (url) {
        if (!String(url).match(/\/$/)) {
            url = url + "/";
        }
        this.formConfigUrl = url;
        this.processCheckHash();
    };
    FormHttpRequestService.prototype.post = function (payload) {
        var url = this.apiUrl;
        return this.http.post(url, payload, this.httpOption);
    };
    FormHttpRequestService.prototype.getConfig = function (module) {
        var url = this.formConfigUrl + module;
        return this.http.post(url, null, this.httpOption);
    };
    FormHttpRequestService.ctorParameters = function () { return [
        { type: HttpClient }
    ]; };
    FormHttpRequestService.ɵprov = i0.ɵɵdefineInjectable({ factory: function FormHttpRequestService_Factory() { return new FormHttpRequestService(i0.ɵɵinject(i1.HttpClient)); }, token: FormHttpRequestService, providedIn: "root" });
    FormHttpRequestService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [HttpClient])
    ], FormHttpRequestService);
    return FormHttpRequestService;
}());
export { FormHttpRequestService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1odHRwLXJlcXVlc3Quc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bnb2RpZ2l0L2xpZ2h0LWJyZWFrLWR5bmFtaWMvIiwic291cmNlcyI6WyJsaWIvc2VydmljZS9mb3JtLWh0dHAtcmVxdWVzdC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBQyxVQUFVLEVBQUUsV0FBVyxFQUFDLE1BQU0sc0JBQXNCLENBQUM7OztBQUs3RDtJQVVFLGdDQUFvQixJQUFnQjtRQUFoQixTQUFJLEdBQUosSUFBSSxDQUFZO1FBVHBDLFdBQU0sR0FBRyxFQUFFLENBQUM7UUFDWixrQkFBYSxHQUFHLEVBQUUsQ0FBQztRQUNuQixjQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLGVBQVUsR0FBRztZQUNYLE9BQU8sRUFBRyxJQUFJLFdBQVcsQ0FBQztnQkFDeEIsY0FBYyxFQUFHLGtCQUFrQjthQUNwQyxDQUFDO1NBQ0gsQ0FBQztJQUVzQyxDQUFDO0lBRXpDLGlEQUFnQixHQUFoQjtRQUFBLGlCQUlDO1FBSEMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDLFNBQVMsQ0FBQyxVQUFDLElBQVE7WUFDckMsS0FBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUE7UUFDdkIsQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDO0lBQ0Qsd0NBQU8sR0FBUCxVQUFRLFFBQVE7UUFDZCxJQUFJLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUM5QyxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDakM7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFDRCw2Q0FBWSxHQUFaO1FBQ0UsSUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUM7UUFDL0MsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNwRCxDQUFDO0lBQ0QseUNBQVEsR0FBUixVQUFTLEtBQUs7UUFDWixJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sR0FBRyxJQUFJLFdBQVcsQ0FBQztZQUN4QyxjQUFjLEVBQUcsa0JBQWtCO1lBQ25DLE9BQU8sRUFBRSxLQUFLO1NBQ2YsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUNELDBDQUFTLEdBQVQsVUFBVSxHQUFHO1FBQ1gsSUFBSSxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUM7SUFDcEIsQ0FBQztJQUNELGlEQUFnQixHQUFoQixVQUFpQixHQUFHO1FBQ2xCLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQzdCLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFBO1NBQ2hCO1FBQ0QsSUFBSSxDQUFDLGFBQWEsR0FBRyxHQUFHLENBQUM7UUFDekIsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7SUFDMUIsQ0FBQztJQUVELHFDQUFJLEdBQUosVUFBSyxPQUFPO1FBQ1YsSUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUN4QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3ZELENBQUM7SUFDRCwwQ0FBUyxHQUFULFVBQVUsTUFBTTtRQUNkLElBQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxhQUFhLEdBQUcsTUFBTSxDQUFDO1FBQ3hDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDcEQsQ0FBQzs7Z0JBekN5QixVQUFVOzs7SUFWekIsc0JBQXNCO1FBSGxDLFVBQVUsQ0FBQztZQUNWLFVBQVUsRUFBRSxNQUFNO1NBQ25CLENBQUM7eUNBVzBCLFVBQVU7T0FWekIsc0JBQXNCLENBb0RsQztpQ0ExREQ7Q0EwREMsQUFwREQsSUFvREM7U0FwRFksc0JBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtIdHRwQ2xpZW50LCBIdHRwSGVhZGVyc30gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBGb3JtSHR0cFJlcXVlc3RTZXJ2aWNlIHtcbiAgYXBpVXJsID0gXCJcIjtcbiAgZm9ybUNvbmZpZ1VybCA9IFwiXCI7XG4gIGNoZWNrSGFzaCA9IG51bGw7XG4gIGh0dHBPcHRpb24gPSB7XG4gICAgaGVhZGVyczogIG5ldyBIdHRwSGVhZGVycyh7XG4gICAgICAnQ29udGVudC1UeXBlJzogICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICB9KSxcbiAgfTtcbiAgXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cENsaWVudCkgeyB9XG4gIFxuICBwcm9jZXNzQ2hlY2tIYXNoKCkge1xuICAgIHRoaXMuZ2V0Q2hlY2tIYXNoKCkuc3Vic2NyaWJlKChyZXNwOmFueSkgPT4ge1xuICAgICAgdGhpcy5jaGVja0hhc2ggPSByZXNwXG4gICAgfSlcbiAgfVxuICBnZXRIYXNoKGZvcm1OYW1lKSB7XG4gICAgaWYgKHRoaXMuY2hlY2tIYXNoICYmIHRoaXMuY2hlY2tIYXNoW2Zvcm1OYW1lXSkge1xuICAgICAgcmV0dXJuIHRoaXMuY2hlY2tIYXNoW2Zvcm1OYW1lXTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgZ2V0Q2hlY2tIYXNoKCkge1xuICAgIGNvbnN0IHVybCA9IHRoaXMuZm9ybUNvbmZpZ1VybCArIFwiX2NoZWNrLWhhc2hcIjtcbiAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QodXJsLCBudWxsLCB0aGlzLmh0dHBPcHRpb24pO1xuICB9XG4gIHNldFRva2VuKHRva2VuKSB7XG4gICAgdGhpcy5odHRwT3B0aW9uLmhlYWRlcnMgPSBuZXcgSHR0cEhlYWRlcnMoe1xuICAgICAgJ0NvbnRlbnQtVHlwZSc6ICAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAnVG9rZW4nOiB0b2tlblxuICAgIH0pO1xuICB9XG4gIHNldEFwaVVybCh1cmwpIHtcbiAgICB0aGlzLmFwaVVybCA9IHVybDtcbiAgfVxuICBzZXRGb3JtQ29uZmlnVXJsKHVybCkge1xuICAgIGlmICghU3RyaW5nKHVybCkubWF0Y2goL1xcLyQvKSkge1xuICAgICAgdXJsID0gdXJsICsgXCIvXCJcbiAgICB9XG4gICAgdGhpcy5mb3JtQ29uZmlnVXJsID0gdXJsO1xuICAgIHRoaXMucHJvY2Vzc0NoZWNrSGFzaCgpO1xuICB9XG4gIFxuICBwb3N0KHBheWxvYWQpIHtcbiAgICBjb25zdCB1cmwgPSB0aGlzLmFwaVVybDtcbiAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QodXJsLCBwYXlsb2FkLCB0aGlzLmh0dHBPcHRpb24pO1xuICB9XG4gIGdldENvbmZpZyhtb2R1bGUpIHtcbiAgICBjb25zdCB1cmwgPSB0aGlzLmZvcm1Db25maWdVcmwgKyBtb2R1bGU7XG4gICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KHVybCwgbnVsbCwgdGhpcy5odHRwT3B0aW9uKTtcbiAgfVxufVxuIl19