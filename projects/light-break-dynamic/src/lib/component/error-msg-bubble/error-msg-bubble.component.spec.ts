import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {ErrorMsgBubbleComponent} from './error-msg-bubble.component';

describe('ErrorMsgBubbleComponent', () => {
	let component: ErrorMsgBubbleComponent;
	let fixture: ComponentFixture<ErrorMsgBubbleComponent>;

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			declarations: [ErrorMsgBubbleComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ErrorMsgBubbleComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should be created', () => {
		expect(component).toBeTruthy();
	});
});
