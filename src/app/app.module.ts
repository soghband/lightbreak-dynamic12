import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {OverAllExampleComponent} from './over-all-example/over-all-example.component';
import {P2UiEditorComponent} from './ui-editor/p2-ui-editor/p2-ui-editor.component';
import {TestDynamicComponent} from './test-dynamic/test-dynamic.component';
import {FunctionMaualComponent} from './function-maual/function-maual.component';
import {FormsModule} from '@angular/forms';
import {ExplanationPanelComponent} from './function-maual/explanation-panel/explanation-panel.component';
import {FunctionPanelComponent} from './function-maual/function-panel/function-panel.component';
import {FunctionSpecificationComponent} from './function-maual/function-specification/function-specification.component';
import { ExampleContentComponent } from './test-dynamic/example-content/example-content.component';
import {LightBreakDynamicModule} from '../../projects/light-break-dynamic/src/lib/light-break-dynamic.module';
import {LockScreenService} from '../../projects/light-break-dynamic/src/lib/service/lock-screen.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
import {NgJsonEditorModule} from 'ang-jsoneditor';
import { HeaderComponent } from './header/header.component';
import { TestAutoFormComponent } from './test-dynamic/test-auto-form/test-auto-form.component';
import {FormHttpRequestService} from '../../projects/light-break-dynamic/src/lib/service/form-http-request.service';
import {HttpClientModule} from '@angular/common/http';
import {MenuService} from '../../projects/light-break-dynamic/src/lib/component/collapse-menu/menu.service';


@NgModule({
    declarations: [
        AppComponent,
        OverAllExampleComponent,
        P2UiEditorComponent,
        TestDynamicComponent,
        FunctionMaualComponent,
        ExplanationPanelComponent,
        FunctionPanelComponent,
        FunctionSpecificationComponent,
        ExampleContentComponent,
        HeaderComponent,
        TestAutoFormComponent
    ],
	imports: [
		BrowserAnimationsModule,
		AppRoutingModule,
		LightBreakDynamicModule,
		FormsModule,
		NgJsonEditorModule,
	],
    providers: [LockScreenService, FormHttpRequestService, MenuService],
    bootstrap: [AppComponent],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class AppModule {
}
