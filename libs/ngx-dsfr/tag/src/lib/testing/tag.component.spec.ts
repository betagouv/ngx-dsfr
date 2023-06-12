/**
 * Angular imports
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';

/**
 * 3rd-party imports
 */
import { ElementSize } from '@betagouv/ngx-dsfr';

/**
 * Internal imports
 */
import { DsfrTagComponent, EMPTY_LABEL_ERROR, TagType } from '../tag.component';
import { TestHostComponent } from './test-host.component';
import { DsfrTagHarness } from './tag.harness';
import { RouterLinkDirectiveStub } from '@betagouv/ngx-dsfr/testing';

describe('DsfrTagComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let testHost: TestHostComponent;
  let componentUnderTest: DsfrTagComponent;
  let harnessLoader: HarnessLoader;
  let dsfrTagHarness: DsfrTagHarness;

  const testLabel = 'testLabel';
  const testIcon = 'testIcon';
  const testLink = 'testLink';
  const testSelected = jest.fn();
  const testDeleted = jest.fn();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        DsfrTagComponent,
        TestHostComponent,
        RouterLinkDirectiveStub
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    testHost = fixture.componentInstance;
    componentUnderTest = fixture.debugElement.query(
      By.directive(DsfrTagComponent)
    ).componentInstance;

    /*
     * We're retrieving a HarnessLoader HERE to be able to get
     * the Test Harness for the DsfrTagComponent LATER.
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

  it('should throw an error when no label is provided', async () => {
    try {
      fixture.detectChanges();
      throw 'It should have thrown an error about "label"';
    } catch (error) {
      expect(error).toBe(EMPTY_LABEL_ERROR);
    }
  });

  describe(', when all required properties are provided, ', () => {
    beforeEach(async () => {
      testHost.testLabel = testLabel;
      dsfrTagHarness = await harnessLoader.getHarness<DsfrTagHarness>(
        DsfrTagHarness
      );
    });

    it('should display the proper label', async () => {
      const label = await dsfrTagHarness.getPTagText();
      expect(label).toEqual(testLabel);
    });

    it('should add the right class by default', async () => {
      const classes = await dsfrTagHarness.getTagPAttribute('class');
      expect(classes).toEqual('fr-tag');
    });

    it('should add the right classes when an icon is requested', async () => {
      testHost.testLabel = testLabel;
      testHost.testIcon = testIcon;
      dsfrTagHarness = await harnessLoader.getHarness<DsfrTagHarness>(
        DsfrTagHarness
      );
      const classes = await dsfrTagHarness.getTagPAttribute('class');
      expect(classes).toContain('fr-tag--icon-left');
      expect(classes).toContain(testIcon);
    });

    it('should add the right class when we want a small tag', async () => {
      testHost.testLabel = testLabel;
      testHost.testSize = ElementSize.SMALL;
      dsfrTagHarness = await harnessLoader.getHarness<DsfrTagHarness>(
        DsfrTagHarness
      );
      const classes = await dsfrTagHarness.getTagPAttribute('class');
      expect(classes).toContain('fr-tag--sm');
    });

    it('should use the proper template when we want a clickable tag', async () => {
      testHost.testLabel = testLabel;
      testHost.testType = TagType.CLICKABLE;
      testHost.testLink = testLink;
      dsfrTagHarness = await harnessLoader.getHarness<DsfrTagHarness>(
        DsfrTagHarness
      );
      const pTagText = await dsfrTagHarness.getPTagText();
      expect(pTagText).toBeNull();
      const aTagText = await dsfrTagHarness.getATagText();
      expect(aTagText).toEqual(testLabel);
    });

    it('should use the proper template when we want a selectable tag', async () => {
      testHost.testLabel = testLabel;
      testHost.testType = TagType.SELECTABLE;
      dsfrTagHarness = await harnessLoader.getHarness<DsfrTagHarness>(
        DsfrTagHarness
      );
      const pTagText = await dsfrTagHarness.getPTagText();
      expect(pTagText).toBeNull();
      const buttonTagText = await dsfrTagHarness.getButtonTagText();
      expect(buttonTagText).toEqual(testLabel);
    });

    it('should use the proper template, with the right class, when we want a deletable tag', async () => {
      testHost.testLabel = testLabel;
      testHost.testType = TagType.DELETABLE;
      dsfrTagHarness = await harnessLoader.getHarness<DsfrTagHarness>(
        DsfrTagHarness
      );
      const pTagText = await dsfrTagHarness.getPTagText();
      expect(pTagText).toBeNull();
      const buttonTagText = await dsfrTagHarness.getButtonTagText();
      expect(buttonTagText).toEqual(testLabel);
      const classes = await dsfrTagHarness.getTagButtonAttribute('class');
      expect(classes).toContain('fr-tag--dismiss');
    });

    it('should send a selected event when we select a tag', async () => {
      testHost.testLabel = testLabel;
      testHost.testType = TagType.SELECTABLE;
      testHost.testSelected = testSelected;
      dsfrTagHarness = await harnessLoader.getHarness<DsfrTagHarness>(
        DsfrTagHarness
      );
      const button = fixture.debugElement.nativeElement.querySelector(
        'button.fr-tag'
      );
      button.click();
      expect(testSelected).toHaveBeenCalled();
      const isSelected = await dsfrTagHarness.getTagButtonAttribute('aria-pressed');
      expect(isSelected).toEqual('true');
    });

    it('should send a deleted event when we delete a tag', async () => {
      testHost.testLabel = testLabel;
      testHost.testType = TagType.DELETABLE;
      testHost.testDeleted = testDeleted;
      dsfrTagHarness = await harnessLoader.getHarness<DsfrTagHarness>(
        DsfrTagHarness
      );
      const button = fixture.debugElement.nativeElement.querySelector(
        'button.fr-tag'
      );
      button.click();
      expect(testDeleted).toHaveBeenCalled();
      const buttonTagText = await dsfrTagHarness.getButtonTagText();
      expect(buttonTagText).toBeNull();
    });
  });
});
