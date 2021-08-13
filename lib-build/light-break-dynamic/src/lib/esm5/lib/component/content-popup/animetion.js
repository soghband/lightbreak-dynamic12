import { trigger, state, style, transition, animate, group } from '@angular/animations';
export var FadeInOutAnimation = [
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5pbWV0aW9uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGdvZGlnaXQvbGlnaHQtYnJlYWstZHluYW1pYy8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnQvY29udGVudC1wb3B1cC9hbmltZXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNOLE9BQU8sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFDakMsT0FBTyxFQUFFLEtBQUssRUFDZCxNQUFNLHFCQUFxQixDQUFDO0FBRTdCLE1BQU0sQ0FBQyxJQUFNLGtCQUFrQixHQUFHO0lBQ2pDLE9BQU8sQ0FBQyxXQUFXLEVBQUU7UUFDcEIsS0FBSyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUM7WUFDakIsU0FBUyxFQUFFLEdBQUc7WUFDZCxZQUFZLEVBQUUsU0FBUztTQUN2QixDQUFDLENBQUM7UUFDSCxLQUFLLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQztZQUNsQixTQUFTLEVBQUUsR0FBRztZQUNkLFlBQVksRUFBRSxRQUFRO1NBQ3RCLENBQUMsQ0FBQztRQUNILFVBQVUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxLQUFLLENBQUM7Z0JBQzdCLE9BQU8sQ0FBQyxtQkFBbUIsRUFBRSxLQUFLLENBQUM7b0JBQ2xDLFNBQVMsRUFBRSxHQUFHO2lCQUNkLENBQUMsQ0FBQztnQkFDSCxPQUFPLENBQUMsbUJBQW1CLEVBQUUsS0FBSyxDQUFDO29CQUNsQyxZQUFZLEVBQUUsUUFBUTtpQkFDdEIsQ0FBQyxDQUFDO2FBQ0gsQ0FDRCxDQUFDLENBQUM7UUFDSCxVQUFVLENBQUMsV0FBVyxFQUFFLENBQUMsS0FBSyxDQUFDO2dCQUM3QixPQUFPLENBQUMsbUJBQW1CLEVBQUUsS0FBSyxDQUFDO29CQUNsQyxZQUFZLEVBQUUsU0FBUztpQkFDdkIsQ0FBQyxDQUFDO2dCQUNILE9BQU8sQ0FBQyxtQkFBbUIsRUFBRSxLQUFLLENBQUM7b0JBQ2xDLFNBQVMsRUFBRSxHQUFHO2lCQUNkLENBQUMsQ0FBQzthQUNILENBQ0QsQ0FBQyxDQUFDO0tBQ0gsQ0FBQztDQUNGLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG5cdHRyaWdnZXIsIHN0YXRlLCBzdHlsZSwgdHJhbnNpdGlvbixcclxuXHRhbmltYXRlLCBncm91cCwgcXVlcnksIHN0YWdnZXIsIGtleWZyYW1lc1xyXG59IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xyXG5cclxuZXhwb3J0IGNvbnN0IEZhZGVJbk91dEFuaW1hdGlvbiA9IFtcclxuXHR0cmlnZ2VyKCdmYWRlSW5PdXQnLCBbXHJcblx0XHRzdGF0ZSgnaW4nLCBzdHlsZSh7XHJcblx0XHRcdCdvcGFjaXR5JzogJzEnLFxyXG5cdFx0XHQndmlzaWJpbGl0eSc6ICd2aXNpYmxlJ1xyXG5cdFx0fSkpLFxyXG5cdFx0c3RhdGUoJ291dCcsIHN0eWxlKHtcclxuXHRcdFx0J29wYWNpdHknOiAnMCcsXHJcblx0XHRcdCd2aXNpYmlsaXR5JzogJ2hpZGRlbidcclxuXHRcdH0pKSxcclxuXHRcdHRyYW5zaXRpb24oJ2luID0+IG91dCcsIFtncm91cChbXHJcblx0XHRcdFx0YW5pbWF0ZSgnMTUwbXMgZWFzZS1pbi1vdXQnLCBzdHlsZSh7XHJcblx0XHRcdFx0XHQnb3BhY2l0eSc6ICcwJ1xyXG5cdFx0XHRcdH0pKSxcclxuXHRcdFx0XHRhbmltYXRlKCczMDBtcyBlYXNlLWluLW91dCcsIHN0eWxlKHtcclxuXHRcdFx0XHRcdCd2aXNpYmlsaXR5JzogJ2hpZGRlbidcclxuXHRcdFx0XHR9KSlcclxuXHRcdFx0XVxyXG5cdFx0KV0pLFxyXG5cdFx0dHJhbnNpdGlvbignb3V0ID0+IGluJywgW2dyb3VwKFtcclxuXHRcdFx0XHRhbmltYXRlKCcyMDBtcyBlYXNlLWluLW91dCcsIHN0eWxlKHtcclxuXHRcdFx0XHRcdCd2aXNpYmlsaXR5JzogJ3Zpc2libGUnXHJcblx0XHRcdFx0fSkpLFxyXG5cdFx0XHRcdGFuaW1hdGUoJzIwMG1zIGVhc2UtaW4tb3V0Jywgc3R5bGUoe1xyXG5cdFx0XHRcdFx0J29wYWNpdHknOiAnMSdcclxuXHRcdFx0XHR9KSlcclxuXHRcdFx0XVxyXG5cdFx0KV0pXHJcblx0XSksXHJcbl1cclxuIl19