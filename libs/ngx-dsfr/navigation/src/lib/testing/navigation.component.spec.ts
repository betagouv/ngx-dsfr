/**
 * Angular imports
 */
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Router } from '@angular/router';

/**
 * 3rd-party imports
 */
import { RouterLinkDirectiveStub } from '@betagouv/ngx-dsfr/testing';

/**
 * Internal imports
 */
import {
  DsfrNavigationComponent,
  EMPTY_NAVIGATION_ERROR,
  Navigation,
} from '../navigation.component';
import { TestHostComponent } from './test-host.component';
import { DsfrNavigationHarness } from './navigation.harness';


describe('DsfrLinkComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let testHost: TestHostComponent;
  let componentUnderTest: DsfrNavigationComponent;
  let harnessLoader: HarnessLoader;
  let dsfrNavigationHarness: DsfrNavigationHarness;

  const testNavigation: Navigation = [
    {
      "id": "a",
      "icon": "dashboard",
      "label": "MEGA MENU",
      "isShow": false,
      "userRoles": [
        "ROLE_USER",
        "ROLE_ADMIN"
      ],
      "href": "modules",
      "isChildAvailable": true,
      "child": {
        "isMega": true,
        "title": "Titre éditorialisé",
        "description": "Lorem [...] elit ut.",
        "items": [
          {
            "id": "b",
            "icon": "cog",
            "label": "Config",
            "isShow": false,
            "href": "admin/dashboard/config",
            "categories": [
              {
                "id": 'c',
                "label": "Config 1",
                "href": "admin/dashboard/config",
              },
              {
                "id": 'f',
                "label": "Config 2",
                "href": "/modules/navigation"
              },
            ]
          },
          {
            "id": "b2",
            "icon": "cog",
            "label": "Config",
            "isShow": false,
            "href": "admin/dashboard/config",
            "categories": [
              {
                "id": 'eec',
                "label": "ConfigEE 1",
                "href": "admin/dashboard/config",
              },
              {
                "id": 'fee',
                "label": "Configee 2",
                "href": "admin/dashboard/config"
              },
            ]
          }
        ]
      }
    },
    {
      "id": "k",
      "icon": "dashboard",
      "label": "MEGA MENU 2",
      "isShow": false,
      "userRoles": [
        "ROLE_USER",
        "ROLE_ADMIN"
      ],
      "href": "dash",
      "isChildAvailable": true,
      "child": {
        "isMega": true,
        "title": "title",
        "description": "description",
        "items": [
          {
            "id": "l",
            "icon": "cog",
            "label": "Config",
            "isShow": false,
            "href": "admin/dashboard/config",
            "categories": [
              {
                "id": 'm',
                "label": "Config",
                "href": "admin/dashboard/config",
              },
              {
                "id": 'p',
                "label": "Config",
                "href": "admin/dashboard/config"
              },
            ]
          }
        ]
      }
    },
    {
      "id": "g",
      "icon": "dashboard",
      "label": "Simple Menu",
      "isShow": false,
      "userRoles": [
        "ROLE_USER",
        "ROLE_ADMIN"
      ],
      "href": "dashboard",
      "isChildAvailable": true,
      "child": {
        "isMega": false,
        "items": [
          {
            "id": 'h',
            "icon": "cog",
            "label": "Config",
            "isShow": false,
            "href": "admin/dashboard/config",
          },
          {
            "id": 'i',
            "icon": "cog",
            "label": "Config",
            "isShow": false,
            "href": "admin/dashboard/config",
          },
        ]
      }
    },
    {
      "id": "j",
      "icon": "dashboard",
      "label": "Acces direct",
      "isShow": false,
      "userRoles": [
        "ROLE_USER",
        "ROLE_ADMIN"
      ],
      "href": "dashboard",
      "isChildAvailable": false,
    },
  ];

  beforeEach(async () => {
    const routerSpy = jest.fn();
    await TestBed.configureTestingModule({
      declarations: [
        DsfrNavigationComponent,
        TestHostComponent,
        RouterLinkDirectiveStub
      ],
      providers: [ // [1]
        { provide: Router, useValue: routerSpy },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],

    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    testHost = fixture.componentInstance;
    componentUnderTest = fixture.debugElement.query(
      By.directive(DsfrNavigationComponent)
    ).componentInstance;

    /*
     * We're retrieving a HarnessLoader HERE to be able to get
     * the Test Harness for the DsfrNavigationComponent LATER.
     *
     * We're NOT doing both HERE since getHarness() triggers
     * indirectly the Change Detection mechanism and thus,
     * Data Binding and ngOnInit()...
     */
    harnessLoader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should be created', () => {
    expect(componentUnderTest).toBeTruthy();
  });

  describe('when navigation is not provided or is undefined, ', () => {
    it('should throw an error when no navigation is provided', async () => {
      try {
        fixture.detectChanges();
        throw 'It should have thrown an error about "navigation"';
      } catch (error) {
        expect(error).toBe(EMPTY_NAVIGATION_ERROR);
      }
    });
  });

  // describe(' all required properties are provided, ', () => {
  //   beforeEach(async () => {
  //     testHost.navigation = testNavigation;

  //     dsfrNavigationHarness = await harnessLoader.getHarness<DsfrNavigationHarness>(
  //       DsfrNavigationHarness
  //     );
  //   });
  //   it('should have NO added classes', async () => {
  //     expect(await dsfrNavigationHarness.getNavigationAttribute('class')).toBe(null);
  //   });
  // });

});
