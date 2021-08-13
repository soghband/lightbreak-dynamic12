import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {OverAllExampleComponent} from './over-all-example/over-all-example.component';
import {P2UiEditorComponent} from './ui-editor/p2-ui-editor/p2-ui-editor.component';
import {TestDynamicComponent} from './test-dynamic/test-dynamic.component';
import {FunctionMaualComponent} from './function-maual/function-maual.component';

const routes: Routes = [
    {
        path: 'main',
        component: OverAllExampleComponent,
        children:[
            {
                path: 'ui-editor',
                component: P2UiEditorComponent
            },
            {
                path: 'test-component',
                component: TestDynamicComponent
            },
            {
                path: 'function-manual',
                component: FunctionMaualComponent
            },
        ]
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
