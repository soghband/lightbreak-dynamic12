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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5pbWV0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbGlnaHQtYnJlYWstZHluYW1pYy9zcmMvbGliL2NvbXBvbmVudC9jb2xsYXBzZS9hbmltZXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFDekMsT0FBTyxFQUFFLEtBQUssRUFDZCxNQUFNLHFCQUFxQixDQUFDO0FBRTdCLE1BQU0sQ0FBQyxNQUFNLG1CQUFtQixHQUFHO0lBQ2xDLE9BQU8sQ0FBQyxZQUFZLEVBQUU7UUFDckIsS0FBSyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUM7WUFDakIsWUFBWSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFLFlBQVksRUFBRSxTQUFTO1NBQzdELENBQUMsQ0FBQztRQUNILEtBQUssQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDO1lBQ2xCLFlBQVksRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxZQUFZLEVBQUUsUUFBUTtTQUMzRCxDQUFDLENBQUM7UUFDSCxVQUFVLENBQUMsV0FBVyxFQUFFLENBQUMsS0FBSyxDQUFDO2dCQUM3QixPQUFPLENBQUMsbUJBQW1CLEVBQUUsS0FBSyxDQUFDO29CQUNsQyxTQUFTLEVBQUUsR0FBRztpQkFDZCxDQUFDLENBQUM7Z0JBQ0gsT0FBTyxDQUFDLG1CQUFtQixFQUFFLEtBQUssQ0FBQztvQkFDbEMsWUFBWSxFQUFFLEtBQUs7aUJBQ25CLENBQUMsQ0FBQztnQkFDSCxPQUFPLENBQUMsbUJBQW1CLEVBQUUsS0FBSyxDQUFDO29CQUNsQyxZQUFZLEVBQUUsUUFBUTtpQkFDdEIsQ0FBQyxDQUFDO2FBQ0gsQ0FDRCxDQUFDLENBQUM7UUFDSCxVQUFVLENBQUMsV0FBVyxFQUFFLENBQUMsS0FBSyxDQUFDO2dCQUM3QixPQUFPLENBQUMsaUJBQWlCLEVBQUUsS0FBSyxDQUFDO29CQUNoQyxZQUFZLEVBQUUsU0FBUztpQkFDdkIsQ0FBQyxDQUFDO2dCQUNILE9BQU8sQ0FBQyxtQkFBbUIsRUFBRSxLQUFLLENBQUM7b0JBQ2xDLFlBQVksRUFBRSxNQUFNO2lCQUNwQixDQUFDLENBQUM7Z0JBQ0gsT0FBTyxDQUFDLG1CQUFtQixFQUFFLEtBQUssQ0FBQztvQkFDbEMsU0FBUyxFQUFFLEdBQUc7aUJBQ2QsQ0FBQyxDQUFDO2FBQ0gsQ0FDRCxDQUFDLENBQUM7S0FDSCxDQUFDO0NBQ0YsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHRyaWdnZXIsIHN0YXRlLCBzdHlsZSwgdHJhbnNpdGlvbixcclxuXHRhbmltYXRlLCBncm91cCwgcXVlcnksIHN0YWdnZXIsIGtleWZyYW1lc1xyXG59IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xyXG5cclxuZXhwb3J0IGNvbnN0IFNsaWRlSW5PdXRBbmltYXRpb24gPSBbXHJcblx0dHJpZ2dlcignc2xpZGVJbk91dCcsIFtcclxuXHRcdHN0YXRlKCdpbicsIHN0eWxlKHtcclxuXHRcdFx0J21heC1oZWlnaHQnOiAnNzB2aCcsICdvcGFjaXR5JzogJzEnLCAndmlzaWJpbGl0eSc6ICd2aXNpYmxlJ1xyXG5cdFx0fSkpLFxyXG5cdFx0c3RhdGUoJ291dCcsIHN0eWxlKHtcclxuXHRcdFx0J21heC1oZWlnaHQnOiAnMHB4JywgJ29wYWNpdHknOiAnMCcsICd2aXNpYmlsaXR5JzogJ2hpZGRlbidcclxuXHRcdH0pKSxcclxuXHRcdHRyYW5zaXRpb24oJ2luID0+IG91dCcsIFtncm91cChbXHJcblx0XHRcdFx0YW5pbWF0ZSgnNDAwbXMgZWFzZS1pbi1vdXQnLCBzdHlsZSh7XHJcblx0XHRcdFx0XHQnb3BhY2l0eSc6ICcwJ1xyXG5cdFx0XHRcdH0pKSxcclxuXHRcdFx0XHRhbmltYXRlKCc2MDBtcyBlYXNlLWluLW91dCcsIHN0eWxlKHtcclxuXHRcdFx0XHRcdCdtYXgtaGVpZ2h0JzogJzBweCdcclxuXHRcdFx0XHR9KSksXHJcblx0XHRcdFx0YW5pbWF0ZSgnNzAwbXMgZWFzZS1pbi1vdXQnLCBzdHlsZSh7XHJcblx0XHRcdFx0XHQndmlzaWJpbGl0eSc6ICdoaWRkZW4nXHJcblx0XHRcdFx0fSkpXHJcblx0XHRcdF1cclxuXHRcdCldKSxcclxuXHRcdHRyYW5zaXRpb24oJ291dCA9PiBpbicsIFtncm91cChbXHJcblx0XHRcdFx0YW5pbWF0ZSgnMW1zIGVhc2UtaW4tb3V0Jywgc3R5bGUoe1xyXG5cdFx0XHRcdFx0J3Zpc2liaWxpdHknOiAndmlzaWJsZSdcclxuXHRcdFx0XHR9KSksXHJcblx0XHRcdFx0YW5pbWF0ZSgnNjAwbXMgZWFzZS1pbi1vdXQnLCBzdHlsZSh7XHJcblx0XHRcdFx0XHQnbWF4LWhlaWdodCc6ICc3MHZoJ1xyXG5cdFx0XHRcdH0pKSxcclxuXHRcdFx0XHRhbmltYXRlKCc4MDBtcyBlYXNlLWluLW91dCcsIHN0eWxlKHtcclxuXHRcdFx0XHRcdCdvcGFjaXR5JzogJzEnXHJcblx0XHRcdFx0fSkpXHJcblx0XHRcdF1cclxuXHRcdCldKVxyXG5cdF0pLFxyXG5dXHJcbiJdfQ==