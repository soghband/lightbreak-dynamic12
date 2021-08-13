import { trigger, state, style, transition, animate, group } from '@angular/animations';
export const SlideInOutAnimation = [
    trigger('slideInOut', [
        state('in', style({
            'max-height': '70vh', 'opacity': '1', 'visibility': 'visible'
        })),
        state('out', style({
            'max-height': '0px', 'opacity': '0', 'visibility': 'hidden'
        })),
        transition('in => out', [group([
                animate('400ms ease-in-out', style({
                    'opacity': '0'
                })),
                animate('600ms ease-in-out', style({
                    'max-height': '0px'
                })),
                animate('700ms ease-in-out', style({
                    'visibility': 'hidden'
                }))
            ])]),
        transition('out => in', [group([
                animate('1ms ease-in-out', style({
                    'visibility': 'visible'
                })),
                animate('600ms ease-in-out', style({
                    'max-height': '70vh'
                })),
                animate('800ms ease-in-out', style({
                    'opacity': '1'
                }))
            ])])
    ]),
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5pbWV0aW9uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGdvZGlnaXQvbGlnaHQtYnJlYWstZHluYW1pYy8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnQvY29sbGFwc2UvYW5pbWV0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQ3pDLE9BQU8sRUFBRSxLQUFLLEVBQ2QsTUFBTSxxQkFBcUIsQ0FBQztBQUU3QixNQUFNLENBQUMsTUFBTSxtQkFBbUIsR0FBRztJQUNsQyxPQUFPLENBQUMsWUFBWSxFQUFFO1FBQ3JCLEtBQUssQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDO1lBQ2pCLFlBQVksRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxZQUFZLEVBQUUsU0FBUztTQUM3RCxDQUFDLENBQUM7UUFDSCxLQUFLLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQztZQUNsQixZQUFZLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsWUFBWSxFQUFFLFFBQVE7U0FDM0QsQ0FBQyxDQUFDO1FBQ0gsVUFBVSxDQUFDLFdBQVcsRUFBRSxDQUFDLEtBQUssQ0FBQztnQkFDN0IsT0FBTyxDQUFDLG1CQUFtQixFQUFFLEtBQUssQ0FBQztvQkFDbEMsU0FBUyxFQUFFLEdBQUc7aUJBQ2QsQ0FBQyxDQUFDO2dCQUNILE9BQU8sQ0FBQyxtQkFBbUIsRUFBRSxLQUFLLENBQUM7b0JBQ2xDLFlBQVksRUFBRSxLQUFLO2lCQUNuQixDQUFDLENBQUM7Z0JBQ0gsT0FBTyxDQUFDLG1CQUFtQixFQUFFLEtBQUssQ0FBQztvQkFDbEMsWUFBWSxFQUFFLFFBQVE7aUJBQ3RCLENBQUMsQ0FBQzthQUNILENBQ0QsQ0FBQyxDQUFDO1FBQ0gsVUFBVSxDQUFDLFdBQVcsRUFBRSxDQUFDLEtBQUssQ0FBQztnQkFDN0IsT0FBTyxDQUFDLGlCQUFpQixFQUFFLEtBQUssQ0FBQztvQkFDaEMsWUFBWSxFQUFFLFNBQVM7aUJBQ3ZCLENBQUMsQ0FBQztnQkFDSCxPQUFPLENBQUMsbUJBQW1CLEVBQUUsS0FBSyxDQUFDO29CQUNsQyxZQUFZLEVBQUUsTUFBTTtpQkFDcEIsQ0FBQyxDQUFDO2dCQUNILE9BQU8sQ0FBQyxtQkFBbUIsRUFBRSxLQUFLLENBQUM7b0JBQ2xDLFNBQVMsRUFBRSxHQUFHO2lCQUNkLENBQUMsQ0FBQzthQUNILENBQ0QsQ0FBQyxDQUFDO0tBQ0gsQ0FBQztDQUNGLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB0cmlnZ2VyLCBzdGF0ZSwgc3R5bGUsIHRyYW5zaXRpb24sXHJcblx0YW5pbWF0ZSwgZ3JvdXAsIHF1ZXJ5LCBzdGFnZ2VyLCBrZXlmcmFtZXNcclxufSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcclxuXHJcbmV4cG9ydCBjb25zdCBTbGlkZUluT3V0QW5pbWF0aW9uID0gW1xyXG5cdHRyaWdnZXIoJ3NsaWRlSW5PdXQnLCBbXHJcblx0XHRzdGF0ZSgnaW4nLCBzdHlsZSh7XHJcblx0XHRcdCdtYXgtaGVpZ2h0JzogJzcwdmgnLCAnb3BhY2l0eSc6ICcxJywgJ3Zpc2liaWxpdHknOiAndmlzaWJsZSdcclxuXHRcdH0pKSxcclxuXHRcdHN0YXRlKCdvdXQnLCBzdHlsZSh7XHJcblx0XHRcdCdtYXgtaGVpZ2h0JzogJzBweCcsICdvcGFjaXR5JzogJzAnLCAndmlzaWJpbGl0eSc6ICdoaWRkZW4nXHJcblx0XHR9KSksXHJcblx0XHR0cmFuc2l0aW9uKCdpbiA9PiBvdXQnLCBbZ3JvdXAoW1xyXG5cdFx0XHRcdGFuaW1hdGUoJzQwMG1zIGVhc2UtaW4tb3V0Jywgc3R5bGUoe1xyXG5cdFx0XHRcdFx0J29wYWNpdHknOiAnMCdcclxuXHRcdFx0XHR9KSksXHJcblx0XHRcdFx0YW5pbWF0ZSgnNjAwbXMgZWFzZS1pbi1vdXQnLCBzdHlsZSh7XHJcblx0XHRcdFx0XHQnbWF4LWhlaWdodCc6ICcwcHgnXHJcblx0XHRcdFx0fSkpLFxyXG5cdFx0XHRcdGFuaW1hdGUoJzcwMG1zIGVhc2UtaW4tb3V0Jywgc3R5bGUoe1xyXG5cdFx0XHRcdFx0J3Zpc2liaWxpdHknOiAnaGlkZGVuJ1xyXG5cdFx0XHRcdH0pKVxyXG5cdFx0XHRdXHJcblx0XHQpXSksXHJcblx0XHR0cmFuc2l0aW9uKCdvdXQgPT4gaW4nLCBbZ3JvdXAoW1xyXG5cdFx0XHRcdGFuaW1hdGUoJzFtcyBlYXNlLWluLW91dCcsIHN0eWxlKHtcclxuXHRcdFx0XHRcdCd2aXNpYmlsaXR5JzogJ3Zpc2libGUnXHJcblx0XHRcdFx0fSkpLFxyXG5cdFx0XHRcdGFuaW1hdGUoJzYwMG1zIGVhc2UtaW4tb3V0Jywgc3R5bGUoe1xyXG5cdFx0XHRcdFx0J21heC1oZWlnaHQnOiAnNzB2aCdcclxuXHRcdFx0XHR9KSksXHJcblx0XHRcdFx0YW5pbWF0ZSgnODAwbXMgZWFzZS1pbi1vdXQnLCBzdHlsZSh7XHJcblx0XHRcdFx0XHQnb3BhY2l0eSc6ICcxJ1xyXG5cdFx0XHRcdH0pKVxyXG5cdFx0XHRdXHJcblx0XHQpXSlcclxuXHRdKSxcclxuXVxyXG4iXX0=