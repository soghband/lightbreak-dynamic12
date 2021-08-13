import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {TextBoxComponent} from './textbox.component';

describe('TextBoxComponent', () => {
	let component: TextBoxComponent;
	let fixture: ComponentFixture<TextBoxComponent>;

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			declarations: [TextBoxComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(TextBoxComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should be created', () => {
		expect(component).toBeTruthy();
	});
});
