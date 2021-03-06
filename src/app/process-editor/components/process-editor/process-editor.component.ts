 /*!
 * @license
 * Copyright 2018 Alfresco, Inc. and/or its affiliates.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ProcessModelerService } from '../../services/process-modeler.service';
import {
    selectProcessDiagram,
    selectProcess,
    selectProcessCrumb
} from '../../store/process-editor.selectors';
import {
    Process,
    ProcessDiagramData,
    OpenConfirmDialogAction,
    BreadcrumbItem,
    AmaState,
    SnackbarErrorAction,
    EntityDialogForm,
    selectApplicationCrumb
} from 'ama-sdk';
import { DeleteProcessAttemptAction } from '../../../application-editor/store/actions/processes';
import { DownloadProcessAction, ValidateProcessAttemptAction } from '../../store/process-editor.actions';
import { combineLatest, of } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { documentationHandler } from '../../services/bpmn-js/property-handlers/documentation.handler';
import { nameHandler } from '../../services/bpmn-js/property-handlers/name.handler';

@Component({
    templateUrl: './process-editor.component.html',
    encapsulation: ViewEncapsulation.None
})
export class ProcessEditorComponent implements OnInit {
    process$: Observable<Process>;
    diagram$: Observable<ProcessDiagramData>;
    loadingFinished$: Observable<boolean>;
    breadcrumbs$: Observable<BreadcrumbItem[]>;

    constructor(private store: Store<AmaState>, private processModeler: ProcessModelerService) {}

    ngOnInit() {
        this.process$ = this.store.select(selectProcess);
        this.diagram$ = this.store.select(selectProcessDiagram);
        this.loadingFinished$ = combineLatest(this.process$, this.diagram$).pipe(
            map(([process, diagram]) => process !== null && diagram !== null)
        );

        this.breadcrumbs$ = combineLatest(
            of({ url: '/home', name: 'Dashboard' }),
            this.store.select(selectApplicationCrumb).pipe(filter(value => value !== null)),
            this.store.select(selectProcessCrumb).pipe(filter(value => value !== null))
        );
    }

    saveDiagram(processId: string): void {
        const element = this.processModeler.getRootProcessElement();
        const metadata: Partial<EntityDialogForm> = {
            name: nameHandler.get(element),
            description: documentationHandler.get(element),
        };
        this.processModeler
            .export()
            .then(content => this.store.dispatch(new ValidateProcessAttemptAction({ processId, content, metadata })))
            .catch(err => {
                this.store.dispatch(new SnackbarErrorAction('APP.PROCESS_EDITOR.ERRORS.SAVE_DIAGRAM'));
                return console.error(err);
            });
    }

    downloadDiagram(process: Process): void {
        this.store.dispatch(new DownloadProcessAction(process));
    }

    deleteProcess(processId: string): void {
        const action = new DeleteProcessAttemptAction(processId);

        this.store.dispatch(
            new OpenConfirmDialogAction({
                dialogData: {
                    subtitle: 'APP.DIALOGS.CONFIRM.CUSTOM.PROCESS'
                },
                action: action
            })
        );
    }
}
