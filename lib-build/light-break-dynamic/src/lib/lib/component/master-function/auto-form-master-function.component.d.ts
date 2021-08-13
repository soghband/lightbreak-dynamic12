import { OnInit, EventEmitter, OnDestroy } from '@angular/core';
import { FormHttpRequestService } from '../../service/form-http-request.service';
import { ContentPopupComponent } from '../content-popup/content-popup.component';
import { DynamicFormComponent } from '../dynamic-form/dynamic-form.component';
import { DynamicTableComponent } from '../dynamic-table/dynamic-table.component';
import { LockScreenService } from '../../service/lock-screen.service';
export declare class AutoFormMasterFunctionComponent implements OnInit, OnDestroy {
    private httpRequest;
    private lockScreen;
    formPopUp: ContentPopupComponent;
    confirmPopUp: ContentPopupComponent;
    errorPopUp: ContentPopupComponent;
    dynamicForm: DynamicFormComponent;
    filterForm: DynamicFormComponent;
    dynamicTable: DynamicTableComponent;
    saveControlFunction: Function;
    refinedListData: Function;
    refinedSaveData: Function;
    refinedDeleteData: Function;
    refinedMasterData: Function;
    refinedListPayload: Function;
    refinedError: Function;
    refinedMasterDataPayload: Function;
    provideData: {};
    formName: string;
    button: {
        add: string;
        save: string;
        clear: string;
        reset: string;
        search: string;
        confirm: string;
        cancel: string;
    };
    callback: EventEmitter<any>;
    private subscription;
    order: any[];
    mode: string;
    form: any;
    filterMode: string;
    filter: any;
    model: any;
    dataList: any;
    config: any;
    page: number;
    limit: number;
    tempDelete: any;
    masterData: any;
    errorContent: string;
    private tempFilter;
    constructor(httpRequest: FormHttpRequestService, lockScreen: LockScreenService);
    ngOnInit(): void;
    getConfig(): void;
    processConfig(): void;
    processLoadMasterData(): void;
    processAssignMasterData(): void;
    processLoadList(page?: number, limit?: number, filter?: boolean): void;
    processListCallback(e: any): void;
    confirmDelete(): void;
    processDeleteData(primaryKey: any): void;
    openAddForm(): void;
    loadEditData(primaryKey: any): void;
    clearForm(): void;
    resetForm(): void;
    save(): void;
    switchFilterMode(): void;
    processFilter(): void;
    clearFilter(): void;
    actKnownError(): void;
    processError(error: any): void;
    check(): void;
    ngOnDestroy(): void;
}
//# sourceMappingURL=auto-form-master-function.component.d.ts.map