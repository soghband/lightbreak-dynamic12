import {
	trigger, state, style, transition,
	animate, group, query, stagger, keyframes
} from '@angular/animations';

export const FadeInOutAnimation = [
	trigger('fadeInOut', [
		state('in', style({
			'opacity': '1',
			'visibility': 'visible'
		})),
		state('out', style({
			'opacity': '0',
			'visibility': 'hidden'
		})),
		transition('in => out', [group([
				animate('150ms ease-in-out', style({
					'opacity': '0'
				})),
				animate('300ms ease-in-out', style({
					'visibility': 'hidden'
				}))
			]
		)]),
		transition('out => in', [group([
				animate('200ms ease-in-out', style({
					'visibility': 'visible'
				})),
				animate('200ms ease-in-out', style({
					'opacity': '1'
				}))
			]
		)])
	]),
]
