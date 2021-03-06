import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { ApplicationTreeFilterComponent } from './application-tree-filter.component';
import { MatExpansionModule, MatIconModule, MatProgressSpinnerModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SharedModule } from 'ama-sdk';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { PROCESS } from 'ama-sdk';
import { TranslationMock, TranslationService } from '@alfresco/adf-core';

describe('ApplicationTreeFilterComponent ', () => {
    let fixture: ComponentFixture<ApplicationTreeFilterComponent>;
    let component: ApplicationTreeFilterComponent;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                MatExpansionModule,
                MatIconModule,
                MatProgressSpinnerModule,
                TranslateModule.forRoot(),
                SharedModule,
                NoopAnimationsModule
            ],
            declarations: [ApplicationTreeFilterComponent],
            providers: [
                { provide: TranslationService, useClass: TranslationMock }
            ],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ApplicationTreeFilterComponent);
        component = fixture.componentInstance;
    });


    it ('should create', () => {
        expect(component).toBeTruthy();
    });

    it ('when tree filter is extended the correct data should be emitted', () => {
        spyOn(component.opened, 'emit');

        component.expanded = false;
        component.ignoreOpenEmit = false;
        component.applicationId = 'appIdTest';
        component.filter = {
            icon: '',
            name: 'Processes',
            type: PROCESS
        };

        component.contents = [];

        const filter = fixture.nativeElement.querySelector('.application-tree-filter');
        filter.dispatchEvent(new Event('opened'));
        fixture.detectChanges();

        expect(component.opened.emit).toHaveBeenCalledWith({
            applicationId: 'appIdTest',
            type: PROCESS,
            loadData: true
        });
    });

    it ('when tree filter is closed the correct data should be emitted', () => {
        spyOn(component.closed, 'emit');

        component.expanded = false;

        component.applicationId = 'appIdTest';
        component.filter = {
            icon: '',
            name: 'Processes',
            type: PROCESS
        };

        component.contents = [];

        const filter = fixture.nativeElement.querySelector('.application-tree-filter');
        filter.dispatchEvent(new Event('closed'));
        fixture.detectChanges();

        expect(component.closed.emit).toHaveBeenCalledWith({ type: PROCESS });
    });
});
