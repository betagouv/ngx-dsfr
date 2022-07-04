import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkWrapperComponent } from './link-wrapper.component';

describe('LinkWrapperComponent', () => {
  let component: LinkWrapperComponent;
  let fixture: ComponentFixture<LinkWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LinkWrapperComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(LinkWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
