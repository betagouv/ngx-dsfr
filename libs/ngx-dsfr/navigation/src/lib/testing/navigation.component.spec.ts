/**
 * Angular imports
 */
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
  Navigation
} from '../navigation.component';
import { TestHostComponent } from './test-host.component';
import { DsfrNavigationHarness } from './navigation.harness';

describe('DsfrNavigationComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let testHost: TestHostComponent;
  let componentUnderTest: DsfrNavigationComponent;
  let harnessLoader: HarnessLoader;
  let dsfrNavigationHarness: DsfrNavigationHarness;

  const testNavigation: Navigation = [
    {
      'id': 'a',
      'label': 'MEGA MENU',
      'userRoles': [
        'ROLE_USER',
        'ROLE_ADMIN'
      ],
      'href': 'modules',
      'child': {
        'isMega': true,
        'title': 'Titre éditorialisé',
        'description': 'Lorem [...] elit ut.',
        'children': [
          {
            'id': 'b',
            'label': 'Config',
            'href': 'admin/dashboard/config',
            'children': [
              {
                'id': 'c',
                'label': 'Config 1',
                'href': 'admin/dashboard/config'
              },
              {
                'id': 'f',
                'label': 'Config 2',
                'href': '/modules/navigation'
              }
            ]
          },
          {
            'id': 'b2',
            'label': 'Config',
            'href': 'admin/dashboard/config',
            'children': [
              {
                'id': 'eec',
                'label': 'ConfigEE 1',
                'href': 'admin/dashboard/config'
              },
              {
                'id': 'fee',
                'label': 'Configee 2',
                'href': 'admin/dashboard/config'
              }
            ]
          }
        ]
      }
    },
    {
      'id': 'k',
      'label': 'MEGA MENU 2',
      'userRoles': [
        'ROLE_USER',
        'ROLE_ADMIN'
      ],
      'href': 'dash',
      'child': {
        'isMega': true,
        'title': 'title',
        'description': 'description',
        'children': [
          {
            'id': 'l',
            'label': 'Config',
            'href': 'admin/dashboard/config',
            'children': [
              {
                'id': 'm',
                'label': 'Config',
                'href': 'admin/dashboard/config'
              },
              {
                'id': 'p',
                'label': 'Config',
                'href': 'admin/dashboard/config'
              }
            ]
          }
        ]
      }
    },
    {
      'id': 'g',
      'label': 'Simple Menu',
      'userRoles': [
        'ROLE_USER',
        'ROLE_ADMIN'
      ],
      'href': 'dashboard',
      'child': {
        'isMega': false,
        'children': [
          {
            'id': 'h',
            'label': 'Config',
            'href': 'admin/dashboard/config'
          },
          {
            'id': 'i',
            'label': 'Config',
            'href': 'admin/dashboard/config'
          }
        ]
      }
    },
    {
      'id': 'j',
      'label': 'Acces direct',
      'userRoles': [
        'ROLE_USER',
        'ROLE_ADMIN'
      ],
      'href': 'dashboard'
    }
  ];

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [
        DsfrNavigationComponent,
        TestHostComponent,
        RouterLinkDirectiveStub
      ],
      providers: [
        {
          provide: Router,
          useValue: {url: ''}
        }
      ]
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

  describe(' all required properties are provided, ', () => {
    beforeEach(async () => {
      testHost.navigation = testNavigation;

      dsfrNavigationHarness = await harnessLoader.getHarness<DsfrNavigationHarness>(
        DsfrNavigationHarness
      );
    });
    it('should have NO added classes', async () => {
      expect(await dsfrNavigationHarness.getNavigationAttribute('class')).toBe('fr-nav');
    });

    it('should have the mega menu class on the first item', async () => {
      expect(await dsfrNavigationHarness.getFirstNavItemClass()).toContain('fr-mega-menu');
    });
  });

});
