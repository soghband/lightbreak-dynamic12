import { trigger, state, style, transition, animate, group } from '@angular/animations';
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
            ])]),
        transition('out => in', [group([
                animate('200ms ease-in-out', style({
                    'visibility': 'visible'
                })),
                animate('200ms ease-in-out', style({
                    'opacity': '1'
                }))
            ])])
    ]),
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5pbWV0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbGlnaHQtYnJlYWstZHluYW1pYy9zcmMvbGliL2NvbXBvbmVudC9jb250ZW50LXBvcHVwL2FuaW1ldGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ04sT0FBTyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUNqQyxPQUFPLEVBQUUsS0FBSyxFQUNkLE1BQU0scUJBQXFCLENBQUM7QUFFN0IsTUFBTSxDQUFDLE1BQU0sa0JBQWtCLEdBQUc7SUFDakMsT0FBTyxDQUFDLFdBQVcsRUFBRTtRQUNwQixLQUFLLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQztZQUNqQixTQUFTLEVBQUUsR0FBRztZQUNkLFlBQVksRUFBRSxTQUFTO1NBQ3ZCLENBQUMsQ0FBQztRQUNILEtBQUssQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDO1lBQ2xCLFNBQVMsRUFBRSxHQUFHO1lBQ2QsWUFBWSxFQUFFLFFBQVE7U0FDdEIsQ0FBQyxDQUFDO1FBQ0gsVUFBVSxDQUFDLFdBQVcsRUFBRSxDQUFDLEtBQUssQ0FBQztnQkFDN0IsT0FBTyxDQUFDLG1CQUFtQixFQUFFLEtBQUssQ0FBQztvQkFDbEMsU0FBUyxFQUFFLEdBQUc7aUJBQ2QsQ0FBQyxDQUFDO2dCQUNILE9BQU8sQ0FBQyxtQkFBbUIsRUFBRSxLQUFLLENBQUM7b0JBQ2xDLFlBQVksRUFBRSxRQUFRO2lCQUN0QixDQUFDLENBQUM7YUFDSCxDQUNELENBQUMsQ0FBQztRQUNILFVBQVUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxLQUFLLENBQUM7Z0JBQzdCLE9BQU8sQ0FBQyxtQkFBbUIsRUFBRSxLQUFLLENBQUM7b0JBQ2xDLFlBQVksRUFBRSxTQUFTO2lCQUN2QixDQUFDLENBQUM7Z0JBQ0gsT0FBTyxDQUFDLG1CQUFtQixFQUFFLEtBQUssQ0FBQztvQkFDbEMsU0FBUyxFQUFFLEdBQUc7aUJBQ2QsQ0FBQyxDQUFDO2FBQ0gsQ0FDRCxDQUFDLENBQUM7S0FDSCxDQUFDO0NBQ0YsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcblx0dHJpZ2dlciwgc3RhdGUsIHN0eWxlLCB0cmFuc2l0aW9uLFxyXG5cdGFuaW1hdGUsIGdyb3VwLCBxdWVyeSwgc3RhZ2dlciwga2V5ZnJhbWVzXHJcbn0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XHJcblxyXG5leHBvcnQgY29uc3QgRmFkZUluT3V0QW5pbWF0aW9uID0gW1xyXG5cdHRyaWdnZXIoJ2ZhZGVJbk91dCcsIFtcclxuXHRcdHN0YXRlKCdpbicsIHN0eWxlKHtcclxuXHRcdFx0J29wYWNpdHknOiAnMScsXHJcblx0XHRcdCd2aXNpYmlsaXR5JzogJ3Zpc2libGUnXHJcblx0XHR9KSksXHJcblx0XHRzdGF0ZSgnb3V0Jywgc3R5bGUoe1xyXG5cdFx0XHQnb3BhY2l0eSc6ICcwJyxcclxuXHRcdFx0J3Zpc2liaWxpdHknOiAnaGlkZGVuJ1xyXG5cdFx0fSkpLFxyXG5cdFx0dHJhbnNpdGlvbignaW4gPT4gb3V0JywgW2dyb3VwKFtcclxuXHRcdFx0XHRhbmltYXRlKCcxNTBtcyBlYXNlLWluLW91dCcsIHN0eWxlKHtcclxuXHRcdFx0XHRcdCdvcGFjaXR5JzogJzAnXHJcblx0XHRcdFx0fSkpLFxyXG5cdFx0XHRcdGFuaW1hdGUoJzMwMG1zIGVhc2UtaW4tb3V0Jywgc3R5bGUoe1xyXG5cdFx0XHRcdFx0J3Zpc2liaWxpdHknOiAnaGlkZGVuJ1xyXG5cdFx0XHRcdH0pKVxyXG5cdFx0XHRdXHJcblx0XHQpXSksXHJcblx0XHR0cmFuc2l0aW9uKCdvdXQgPT4gaW4nLCBbZ3JvdXAoW1xyXG5cdFx0XHRcdGFuaW1hdGUoJzIwMG1zIGVhc2UtaW4tb3V0Jywgc3R5bGUoe1xyXG5cdFx0XHRcdFx0J3Zpc2liaWxpdHknOiAndmlzaWJsZSdcclxuXHRcdFx0XHR9KSksXHJcblx0XHRcdFx0YW5pbWF0ZSgnMjAwbXMgZWFzZS1pbi1vdXQnLCBzdHlsZSh7XHJcblx0XHRcdFx0XHQnb3BhY2l0eSc6ICcxJ1xyXG5cdFx0XHRcdH0pKVxyXG5cdFx0XHRdXHJcblx0XHQpXSlcclxuXHRdKSxcclxuXVxyXG4iXX0=