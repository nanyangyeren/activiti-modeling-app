import { HeaderBreadcrumbsComponent } from './header-breadcrumbs.component';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { SharedModule } from '../../shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { TranslationService, TranslationMock } from '@alfresco/adf-core';

describe('HeaderBreadcrumbsComponent', () => {
    let fixture: ComponentFixture<HeaderBreadcrumbsComponent>;
    let component: HeaderBreadcrumbsComponent;

    const mockCrumbs = [
        { url: '/home', name: 'Dashboard' },
        { url: '/application', name: 'Application' },
        { name: 'Process' }
    ];

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                SharedModule,
                MatIconModule,
                TranslateModule.forRoot(),
                NoopAnimationsModule,
                RouterTestingModule
            ],
            providers: [
                { provide: TranslationService, useClass: TranslationMock },
                {
                    provide: Store,
                    useValue: {
                        select: jest.fn().mockReturnValue(of({}))
                    }
                }
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HeaderBreadcrumbsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        component.breadcrumbs$ = of(mockCrumbs);
        fixture.detectChanges();
    });

    it('should check if all crumbs is displayed', () => {
        const crumbs = fixture.debugElement.queryAll(By.css('.ama-breadcrumb-item'));
        expect(crumbs.length).toBe(3);
    });

    it('should check if first two are links', () => {
        const crumbs = fixture.debugElement.queryAll(By.css('.ama-breadcrumb-item'));
        const link1 = crumbs[0].query(By.css('a.ama-breadcrumb-item-anchor'));
        const link2 = crumbs[1].query(By.css('a.ama-breadcrumb-item-anchor'));

        expect(link1).not.toBeNull();
        expect(link2).not.toBeNull();
    });

    it('should check if first two have chevron icon', () => {
        const crumbs = fixture.debugElement.queryAll(By.css('.ama-breadcrumb-item'));
        const icon1 = crumbs[0].query(By.css('.ama-breadcrumb-item-chevron'));
        const icon2 = crumbs[1].query(By.css('.ama-breadcrumb-item-chevron'));

        expect(icon1).not.toBeNull();
        expect(icon2).not.toBeNull();
    });

    it('should check if last crumb is active', () => {
        const crumbs = fixture.debugElement.queryAll(By.css('.ama-breadcrumb-item'));
        const active = crumbs[2].query(By.css('.ama-breadcrumb-item-current'));
        expect(active).not.toBeNull();
    });

    it('should check if last crumb don`t have chevron icon', () => {
        const crumbs = fixture.debugElement.queryAll(By.css('.ama-breadcrumb-item'));
        const active = crumbs[2].query(By.css('.ama-breadcrumb-item-chevron'));
        expect(active).toBeNull();
    });

});
