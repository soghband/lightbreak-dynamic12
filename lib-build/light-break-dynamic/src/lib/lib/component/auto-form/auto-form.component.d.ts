import { OnInit } from '@angular/core';
import { AutoFormMasterFunctionComponent } from '../master-function/auto-form-master-function.component';
import { FormHttpRequestService } from '../../service/form-http-request.service';
import { LockScreenService } from '../../service/lock-screen.service';
export declare class AutoFormComponent extends AutoFormMasterFunctionComponent implements OnInit {
    private http;
    private lockScr;
    constructor(http: FormHttpRequestService, lockScr: LockScreenService);
}
//# sourceMappingURL=auto-form.component.d.ts.map