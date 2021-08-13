import {ErrorMsgBubbleComponent} from '../../../projects/light-break-dynamic/src/lib/component/error-msg-bubble/error-msg-bubble.component';
import {DynamicFormComponent} from '../../../projects/light-break-dynamic/src/lib/component/dynamic-form/dynamic-form.component';
import {DynamicTabComponent} from '../../../projects/light-break-dynamic/src/lib/component/dynamic-tab/dynamic-tab.component';
import {DynamicPopupComponent} from '../../../projects/light-break-dynamic/src/lib/component/dynamic-popup/dynamic-popup.component';
import {DynamicTableComponent} from '../../../projects/light-break-dynamic/src/lib/component/dynamic-table/dynamic-table.component';
import {LockScreenService} from '../../../projects/light-break-dynamic/src/lib/service/lock-screen.service';
import { interval } from 'rxjs/internal/observable/interval';
import { take } from 'rxjs/internal/operators';
import {PanelData} from '../../../projects/light-break-dynamic/src/lib/component/content-panel/panel-data';
import {OnInit, ViewChild, Component} from '@angular/core';


@Component({
	selector: 'app-test-dynamic',
	templateUrl: `./test-dynamic.component.html`,
	styleUrls: ['./test-dynamic.component.scss'],
})
export class TestDynamicComponent implements OnInit {
	@ViewChild('errorBubble', {static: true}) errorComp: ErrorMsgBubbleComponent;
	@ViewChild('dynamicForm', {static: true}) dynamicForm: DynamicFormComponent;
	@ViewChild('dynamicFormTable', {static: true}) dynamicFormTable: DynamicFormComponent;
	@ViewChild('tabListRefId', {static: true}) tabListRef: DynamicTabComponent;
	@ViewChild('p2popup', {static: true}) popupRef: DynamicPopupComponent;
	@ViewChild('tableId', {static: true}) tableRef: DynamicTableComponent;
	
	activeAutoForm = false;
	contentActive = true;
	model = {
		textBoxModel1: {
			labelWidth: '150',
			columnPerLine: 1,
			type: 'textBox',
			default: [
				''
			],
			inputPattern: /.*/,
			valuePattern: /.*/,
			validateWhileKeyPress: false,
			multiValue: false,
			note: '',
			readonly: false,
			require: false,
			maxLength: 255
		}
	}
	
	testData: PanelData = {
		id: "testId",
		html: "<div class='testClass'>test</div>",
		css: ".testClass{color:red}"
	}
	
	stepTab = [
		{
			header: '<span class=\'glyphicon glyphicon-pencil\'></span>',
			pass: '<span class=\'glyphicon glyphicon-ok\'></span>',
			label: 'Test1'
		},
		{
			header: '<span class=\'glyphicon glyphicon-pencil\'></span>',
			label: 'Test2'
		},
		{
			header: '<span class=\'glyphicon glyphicon-pencil\'></span>',
			label: 'Test3'
		},
		{
			header: '<span class=\'glyphicon glyphicon-pencil\'></span>',
			label: 'Test3'
		},
		{
			header: '<span class=\'glyphicon glyphicon-pencil\'></span>',
			label: 'Test3'
		}
	]
	tabCreation = {
		option: {},
		tabList: [
			'Form',
			'Table',
			'Content Panel',
			'Component',
			'Popup',
			'Form Table',
			'Error',
			'Lock Screen',
			'Auto Form',
		]
	};
	formCreation = {
		form: {
			option: {
				mode: 'edit',
				customClass: 'defaultDynamicForm',
				labelAlign: 'left',
				enableAnimation: true
			},
			containerList: [
				{
					containerName: 'container1',
					customClass: 'testCustomContainer',
					columnSpan: '1/3',
					fieldList: [
						{
							fieldName: 'testTextBox',
							type: 'textBox',
							label: 'Test TextBox',
							inputPattern: /[0-9]/,
							valuePattern: /^[0-9]{3}$/,
							columnPerLine: 1,
							labelWidth: '150',
							multiValue: true,
							require: true,
							readonly: false,
							default: [''],
						},
						{
							fieldName: 'testPassword',
							type: 'password',
							label: 'Test Password',
							inputPattern: /.*/,
							valuePattern: /.*/,
							columnPerLine: 1,
							labelWidth: '150',
							multiValue: false,
							require: true,
							readonly: false,
							default: [''],
						},
						{
							fieldName: 'testDate',
							type: 'date',
							label: 'Test TextBox',
							columnPerLine: 1,
							labelWidth: '150',
							multiValue: true,
							require: true,
							readonly: false,
							default: ['2018-05-12'],
							// yearOffset: 543,
							// monthListLong: ["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],
							monthListLong: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
							monthListShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
							weekDay: ['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส'],
							// displayFormat: "วันที่ D MMMM พ.ศ. YYYY"
							displayFormat: 'DD-MMM-YYYY',
							showToday: true,
							todayText: 'วันนี้',
							closeOnDateSelect: true
						},
						{
							fieldName: 'testDateInput',
							type: 'date',
							label: 'Test Date Input',
							customClass: 'dateTop',
							columnPerLine: 1,
							labelWidth: '150',
							multiValue: true,
							require: true,
							readonly: false,
							valuePattern: /(([1-9]|[12]\d{1}|3[01])-([1-9]|1[0-2]|[1-9])-([2]\d{3}))/,
							inputDatePattern: "D-M-Y",
							inputYearOffset: -543,
							default: ['2018-05-12'],
							// yearOffset: 543,
							// monthListLong: ["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],
							monthListLong: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
							monthListShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
							weekDay: ['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส'],
							// displayFormat: "วันที่ D MMMM พ.ศ. YYYY"
							displayFormat: 'DD-MMM-YYYY',
							showToday: true,
							todayText: 'วันนี้',
							closeOnDateSelect: true
						},
						{
							fieldName: 'debugDateInput',
							type: 'date',
							label: 'Debug Date Inout',
							columnPerLine: 1,
							labelWidth: '150',
							require: true,
							yearOffset: 543, // add more
							monthListLong: ['มกราคม',
								'กุมภาพันธ์',
								'มีนาคม',
								'เมษายน',
								'พฤษภาคม',
								'มิถุนายน',
								'กรกฎาคม',
								'สิงหาคม',
								'กันยายน',
								'ตุลาคม',
								'พฤศจิกายน',
								'ธันวาคม'],
							monthListShort: ['ม.ค.',
								'ก.พ.',
								'มี.ค.',
								'เม.ย.',
								'พ.ค.',
								'มิ.ย.',
								'ก.ค.',
								'ส.ค.',
								'ก.ย.',
								'ต.ค.',
								'พ.ย.',
								'ธ.ค.'],
							weekDay: ["อา", "จ", "อ", "พ", "พฤ", "ศ", "ส"],
							// displayFormat: "DD/MM/YYYY",
							displayFormat: "DD/MM/YY",
							closeOnDateSelect: true,
							note: 'รูปแบบ YYYY-MM-DD',
							// valuePattern: /(([1-9]|[12]\d{1}|3[01])\/([1-9]|1[0-2]|[1-9])\/([2]\d{3}))/,
							// valuePattern: /((0[1-9]|[12]\d|3[01]|[1-9])\/(0[1-9]|1[0-2]|[1-9])\/([2]\d{3}))/,
							valuePattern: /.*/,
							inputDatePattern: "d/m/y",
							inputYearOffset: -543,
						},
						{
							fieldName: 'testAutoComplete',
							type: 'autoComplete',
							label: 'Test Auto Complete++',
							inputPattern: /.*/,
							valuePattern: /.*/,
							columnPerLine: 1,
							showButton: false,
							require: true,
							fixedValue: false,
							placeholder: 'Auto Complete',
							showAllOnClick: true,
							valueList: [
								{
									display: 'aaaaa',
									value: 'AAA'
								},
								{
									display: 'aaaab',
									value: 'BBB'
								},
								{
									display: 'aaaac',
									value: 'CCC'
								},
								{
									display: 'aaaadd',
									value: 'DDD'
								},
								{
									display: 'aaaaee',
									value: 'EEE'
								},
								{
									display: 'aaaaef',
									value: 'fff'
								},
								{
									display: 'aaaaeg',
									value: 'ggg'
								},
								{
									display: 'aaaaeh',
									value: 'hhh'
								},
								{
									display: 'aaaaei',
									value: 'iii'
								},
								{
									display: 'aaaaej',
									value: 'jjj'
								},
								{
									display: 'aaaaek',
									value: 'kkk'
								},
								{
									display: 'aaaael',
									value: 'll1'
								},
								{
									display: 'aaaael',
									value: 'll2'
								},
								{
									display: 'aaaael',
									value: 'll3'
								},
								{
									display: 'aaaael',
									value: 'll4'
								},
								{
									display: 'aaaael',
									value: 'll5'
								},
								{
									display: 'aaaael',
									value: 'll6'
								},
								{
									display: 'aaaael',
									value: 'll7'
								},
								{
									display: 'aaaael',
									value: 'll8'
								},
								{
									display: 'aaaael',
									value: 'll9'
								},
								{
									display: 'aaaael',
									value: 'l10'
								},
								{
									display: 'aaaael',
									value: 'll11'
								},
								{
									display: 'aaaael',
									value: 'll12'
								},
								{
									display: 'aaaael',
									value: 'll13'
								},
								{
									display: 'aaaael',
									value: 'l14'
								},
								{
									display: 'aaaael',
									value: 'll45'
								},
								{
									display: 'aaaael',
									value: 'll16'
								},
								{
									display: 'aaaael',
									value: 'll17'
								},
								{
									display: 'aaaael',
									value: 'll18'
								},
								{
									display: 'aaaael',
									value: 'll19'
								},
								{
									display: 'aaaael',
									value: 'lll'
								},
								{
									display: 'aaaael',
									value: 'lll'
								},
								{
									display: 'aaaael',
									value: 'lll'
								},
								{
									display: 'aaaael',
									value: 'lll'
								}
							],
							labelWidth: '150',
							multiValue: true,
							default: [''],
						},
						{
							fieldName: 'testAutoCompleteFixed',
							type: 'autoComplete',
							label: 'Test Auto Complete Fixed',
							inputPattern: /.*/,
							valuePattern: /.*/,
							columnPerLine: 1,
							showButton: true,
							require: true,
							fixedValue: true,
							valueList: [
								{
									display: 'aaaaa',
									value: 'AAA'
								},
								{
									display: 'aaaab',
									value: 'BBB'
								},
								{
									display: 'aaaac',
									value: 'CCC'
								},
							],
							labelWidth: '150',
							multiValue: true,
							default: [''],
						},
						{
							fieldName: 'testAutoCompleteReFilter',
							type: 'autoComplete',
							label: 'Test Auto Complete Re-Filter',
							inputPattern: /.*/,
							valuePattern: /.*/,
							columnPerLine: 1,
							showButton: true,
							require: true,
							fixedValue: true,
							valueList: [],
							labelWidth: '150',
							multiValue: true,
							default: [''],
						},
						{
							fieldName: 'testImage',
							type: 'image',
							label: 'Test Images',
							columnPerLine: 1,
							multiValue: true,
							require: true,
							showDelete: true,
							accept: '.png,.jpeg,.jpg',
						},
						{
							fieldName: 'testUpload',
							type: 'fileUpload',
							label: 'Test Upload',
							columnPerLine: 1,
							multiValue: true,
							note: 'CSV abc xyz',
							require: true,
							accept: '.csv, .xlsx'
						},
						{
							fieldName: 'testMapValue',
							type: 'mapValue',
							label: 'Test Map Value',
							columnPerLine: 1,
							default: [
								{
									display: 'Popular',
									value: 'pop'
								}, {
									display: 'Not Popular',
									value: 'notPop'
								}
							]
						},
						{
							fieldName: 'testQrCode',
							type: 'qrCode',
							label: 'test QR Code Reader',
							columnPerLine: 1,
							multiValue: true
						}
					]
				},
				{
					containerName: 'Test Container',
					columnSpan: '2/3',
					fieldList: [
						{
							fieldName: 'testTextArea',
							type: 'textArea',
							label: 'Test TextArea',
							inputPattern: /.*/,
							validateInput: /.*/,
							columnPerLine: 2,
							labelWidth: '150',
							default: ['']
						},
						{
							fieldName: 'testLabel',
							type: 'label',
							label: 'Test Label',
							columnPerLine: 2,
							labelWidth: 120,
							default: ['']
						},
						{
							fieldName: 'testCheckBox',
							type: 'checkBox',
							label: 'Test Label',
							valueList: [
								{
									display: 'Popular',
									value: 'pop'
								}
								, {
									display: 'Not Popular',
									value: 'notPop'
								}
							],
							columnPerLine: 2,
							showSelectAll: true,
							displaySingleLine: false,
							// default: {
							// 	pop: true,
							// 	notPop: true
							// }
						},
						{
							fieldName: 'testRadio',
							type: 'radio',
							label: 'Test Radio',
							valueList: [
								{
									display: 'Display1',
									value: 'd1'
								}
								, {
									display: 'Display2',
									value: 'd2'
								},
								{
									display: 'Display3',
									value: 'd3'
								}
								, {
									display: 'Display4',
									value: 'd4'
								}
							],
							columnPerLine: 2,
							showSelectAll: true,
							displaySingleLine: true,
							// default: {
							// 	pop: true,
							// 	notPop: true
							// }
						},
						{
							fieldName: 'testSelectBox',
							type: 'selectBox',
							label: 'Test SelectBox',
							columnPerLine: 2,
							valueType: 'multi/single',
							require: true,
							readonly: false,
							valueList: [
								{
									display: '---Please Select---',
									value: ''
								},
								{
									display: 'Active',
									value: 'active'
								},
								{
									display: 'Inactive aaaaaaa a a a a aaaaaaaaaaaaaaa a aaaaaaaaaaaaaaaa aaaaaaaa',
									value: 'inactive'
								},
							],
							default: ['inactive']
						},
						{
							fieldName: 'testTextBox2',
							type: 'textBox',
							label: 'Test TextBox',
							inputPattern: /.*/,
							validateInput: /.*/,
							columnPerLine: 1,
							default: ['test Default2']
						},
						{
							fieldName: 'testTextArea2',
							type: 'textArea',
							label: 'Test TextArea 2',
							inputPattern: /.*/,
							validateInput: /.*/,
							columnPerLine: 2,
							default: ['test Default3']
						},
						{
							fieldName: 'testButton',
							type: 'button',
							label: 'Test Button 2',
							columnPerLine: 2,
							valueList: [{
								display: '<span class=\'glyphicon glyphicon-list-alt\' aria-hidden=\'true\'></span> <span>Template</span>',
								value: 'test1'
							}],
						},
						{
							fieldName: 'testCustomStyle',
							type: 'textBox',
							label: 'Test TextBox',
							customClass: 'testCustomClass',
							inputPattern: /[a-zA-Z]/,
							validateInput: /.*/,
							columnPerLine: 1,
							labelWidth: '150',
							multiValue: true,
							default: ['Custom Style Default'],
						},
						{
							fieldName: 'testSwapping',
							type: 'swappingBox',
							label: 'Test swapping box',
							columnPerLine: 1,
							labelWidth: 150,
							readonly: false,
							valueList: [
								{
									display: 'aaa',
									value: 'aa'
								},
								{
									display: 'bbb',
									value: 'bb'
								},
								{
									display: 'ccc',
									value: 'cc'
								},
								{
									display: 'ddd',
									value: 'dd'
								},
								{
									display: 'eee',
									value: 'ee'
								},
								{
									display: 'fff',
									value: 'ff'
								},
								{
									display: 'ggg',
									value: 'gg'
								},
								{
									display: 'fff',
									value: 'ff'
								},
							],
							default: [{
								display: 'fff',
								value: 'ff'
							}]
						},
						{
							fieldName: 'testModel',
							label: 'Test model',
							modelName: 'textBoxModel1',
							columnPerLine: 2
						},
						{
							fieldName: 'testModel2',
							label: 'Test model 2',
							modelName: 'textBoxModel1',
							columnPerLine: 2
						},
						{
							fieldName: 'testColorSelect',
							label: 'Test Color Select',
							type: "colorSelect",
							columnPerLine: 1,
							labelWidth: 150,
							multiValue: true,
							require: true,
							valueList: [
								{
									display: '5a78af',
									value: '#5a78af'
								},
								{
									display: '62959d',
									value: '#62959d'
								},
								{
									display: '5c905e',
									value: '#5c905e'
								},
								{
									display: 'abee5a',
									value: '#abee5a'
								},
								{
									display: 'f9e78c',
									value: '#f9e78c'
								},
								{
									display: 'f8cf7f',
									value: '#f8cf7f'
								},
								{
									display: 'eca66a',
									value: '#eca66a'
								},
								{
									display: 'e37557',
									value: '#e37557'
								},
								{
									display: 'e747a0',
									value: '#e747a0'
								},
							]
						}
					]
				},
			],
		},
		data: [
			{
				testTextBox: ['111'],
				testPassword: [''],
				testAutoComplete: [
					{
						display: '',
						value: ''
					}
				],
				testAutoCompleteFixed: [
					{
						display: '',
						value: ''
					}
				],
				testAutoCompleteReFilter: [
					{
						display: '',
						value: ''
					}
				],
				testTextBox2: ['testInput1Val2'],
				testTextArea: ['testAreaInput1Val'],
				testTextArea2: ['testAreaInput1Val2'],
				testLabel: ['testLabelVal'],
				testCheckBox: {
					pop: true
				},
				testRadio: ['d1', 'd2'],
				testSelectBox: [
					'inactive',
					'active'
				],
				testImage: {
					currentFile: [''],
					selectFile: {},
				},
				testUpload: {
					currentFile: [],
					selectFile: {},
				},
				testButton: [''],
				testCustomStyle: ['testCustomStyle'],
				testSwapping: [
					{
						display: 'fff',
						value: 'ff'
					}
				],
				testMapValue: [
					{
						display: 'testD1',
						value: 'testV1'
					}
				],
				testQrCode: [],
				testDateInput: [{
					display: '',
					value: '2020-04-05'
					}
				],
				debugDateInput: [{
					display: '',
					value: '2020-04-05'
					}
				],
				testDate: [{
					display: '',
					value: '2020-04-05'
				}, {
					display: '',
					value: '1982-09-01'
				}],
				testModel: [''],
				testModel2: [''],
				testColorSelect: [""]
			}
		]
	};
	formCreationTable = {
		form: {
			option: {
				formId: 'table01',
				displayMode: 'table',
				mode: 'edit',
				customClass: 'defaultDynamicForm',
				labelAlign: 'left',
				deleteRow: true,
				deleteRowText: 'Delete Row',
				disableDelete: [true],
				enableRowIndex: [true],
				disableList: [
					{
						testTextBox: true
					},
					{
						testTextBox: false
					},
					{
						testTextBox: true
					},
					{
						testTextBox: true
					}
				]
			},
			containerList: [
				{
					containerName: 'container1',
					customClass: 'testCustomContainer',
					columnSpan: '1/1',
					fieldList: [
						{
							fieldName: 'operatorFlag',
							label: 'Action',
							type: 'buttonIcon',
							width: '150px',
							columnPerLine: '1',
							valueList: [{
								display: '<span class=\'glyphicon glyphicon-pencil\' aria-hidden=\'true\'></span>',
								value: 'MOD'
							}, {
								display: '<span class=\'glyphicon glyphicon-trash\' aria-hidden=\'true\'></span>',
								value: 'RMV'
							}, {
								display: '<span class=\'glyphicon glyphicon-ban-circle\' aria-hidden=\'true\'></span>',
								value: ''
							}],
						},
						{
							fieldName: 'testTextBox',
							type: 'textBox',
							label: 'Test TextBox',
							inputPattern: /[0-1]/,
							valuePattern: /^100$/,
							multiValue: true,
							require: true,
							readonly: false,
							default: [''],
						},
						{
							fieldName: 'testCheckBox',
							type: 'checkBox',
							label: 'Test Label',
							width: '150px',
							valueList: [
								{
									display: 'Popular',
									value: 'pop'
								}
								, {
									display: 'Not Popular',
									value: 'notPop'
								}
								, {
									display: 'a',
									value: 'a'
								}
								, {
									display: 'b',
									value: 'b'
								}
								, {
									display: 'c',
									value: 'c'
								}
								, {
									display: 'd',
									value: 'd'
								}
								, {
									display: 'e',
									value: 'e'
								}
								, {
									display: 'f',
									value: 'f'
								}
							],
							columnPerLine: 2,
							showSelectAll: true,
							displaySingleLine: true,
							// default: {
							// 	pop: true,
							// 	notPop: true
							// }
						},
						{
							fieldName: 'testAutoComplete',
							type: 'autoComplete',
							label: 'Test Auto Complete',
							inputPattern: /.*/,
							valuePattern: /.{3}.*/,
							valueList: [
								{
									display: 'aaaaa',
									value: 'AAA'
								},
								{
									display: 'aaaab',
									value: 'BBB'
								},
								{
									display: 'aaaac',
									value: 'CCC'
								},
								{
									display: 'aaaadd',
									value: 'DDD'
								},
								{
									display: 'aaaaee',
									value: 'EEE'
								}
							],
							multiValue: true,
							default: [''],
						},
						{
							fieldName: 'testImage',
							type: 'image',
							label: 'Test Images',
							multiValue: true,
							width: '200px'
						},
						{
							fieldName: 'testUpload',
							type: 'fileUpload',
							label: 'Test Upload',
							multiValue: true,
							note: 'CSV abc xyz',
							width: '200px'
						},
						{
							fieldName: 'testMapValue',
							type: 'mapValue',
							label: 'Test Map Value',
							default: [
								{
									display: 'Popular',
									value: 'pop'
								}, {
									display: 'Not Popular',
									value: 'notPop'
								}
							]
						},
						{
							fieldName: 'testTextArea',
							type: 'textArea',
							label: 'Test TextArea',
							inputPattern: /.*/,
							validateInput: /.*/,
							default: ['']
						},
						{
							fieldName: 'testLabel',
							type: 'label',
							label: 'Test Label',
							default: ['']
						}
					]
				},
			],
		},
		data: [
			{
				operatorFlag: [''],
				testTextBox: ['testDup-1'],
				testAutoComplete: [
					{
						display: '1',
						value: 'ID1'
					}
				],
				testTextArea: ['testAreaInput1Val'],
				testLabel: ['testLabelVal'],
				testCheckBox: {
					pop: true
				},
				testSelectBox: [
					'inactive',
					'active'
				],
				testImage: {
					currentFile: [''],
					selectFile: {},
				},
				testUpload: {
					currentFile: [],
					selectFile: {},
				},
				testButton: [''],
				testCustomStyle: ['testCustomStyle'],
				testSwapping: [
					{
						display: 'fff',
						value: 'ff'
					}
				],
				testMapValue: [
					{
						display: 'testD1',
						value: 'testV1'
					}
				],
			}, {
				operatorFlag: [''],
				testTextBox: ['testDup-2'],
				testAutoComplete: [
					{
						display: '1',
						value: 'ID1'
					}
				],
				testTextArea: ['testAreaInput1Val'],
				testLabel: ['testLabelVal'],
				testCheckBox: {
					pop: true
				},
				testSelectBox: [
					'inactive',
					'active'
				],
				testImage: {
					currentFile: [''],
					selectFile: {},
				},
				testUpload: {
					currentFile: [],
					selectFile: {},
				},
				testButton: [''],
				testCustomStyle: ['testCustomStyle'],
				testSwapping: [
					{
						display: 'fff',
						value: 'ff'
					}
				],
				testMapValue: [
					{
						display: 'testD2',
						value: 'testV2'
					}
				],
				testQrCode: [],
				testDate: ['']
			}, {
				operatorFlag: [''],
				testTextBox: ['testDup-3'],
				testAutoComplete: [
					{
						display: '1',
						value: 'ID1'
					}
				],
				testTextBox2: ['testInput1Val2'],
				testTextArea: ['testAreaInput1Val'],
				testTextArea2: ['testAreaInput1Val2'],
				testLabel: ['testLabelVal'],
				testCheckBox: {
					pop: true
				},
				testSelectBox: [
					'inactive',
					'active'
				],
				testImage: {
					currentFile: [''],
					selectFile: {},
				},
				testUpload: {
					currentFile: [],
					selectFile: {},
				},
				testButton: [''],
				testCustomStyle: ['testCustomStyle'],
				testSwapping: [
					{
						display: 'fff',
						value: 'ff'
					}
				],
				testMapValue: [
					{
						display: 'testD3',
						value: 'testV3'
					}
				],
			}, {
				operatorFlag: [''],
				testTextBox: ['testDup-4'],
				testAutoComplete: [
					{
						display: '1',
						value: 'ID1'
					}
				],
				testTextArea: ['testAreaInput1Val'],
				testLabel: ['testLabelVal'],
				testCheckBox: {
					pop: true
				},
				testSelectBox: [
					'inactive',
					'active'
				],
				testImage: {
					currentFile: [''],
					selectFile: {},
				},
				testUpload: {
					currentFile: [],
					selectFile: {},
				},
				testButton: [''],
				testCustomStyle: ['testCustomStyle'],
				testSwapping: [
					{
						display: 'fff',
						value: 'ff'
					}
				],
				testMapValue: [
					{
						display: 'testD4',
						value: 'testV4'
					}
				],
			}
		]
	};
	tableCreation = {
		header: 'IMIE List',
		tableId: 'imieTable',
		primaryField: ['imei'],
		showSelect: 'radioBox',
		ignoreSelect: 'check:Y',
		showEdit: true,
		showDelete: true,
		showPaging: true,
		sorting: true,
		customClass: 'testCustomClassTable',
		customClassPaging: 'testCustomPaging',
		fieldList: [
			{
				fieldName: ['imei'],
				fieldNameDb: ['imei'],
				displayHeader: 'IMIE',
				width: '200px',
				align: 'left',
				action: false,
				sorting: false,
				dataStyle: "testStyle"
			},
			{
				fieldName: ['brandName'],
				fieldNameDb: ['brand_name'],
				displayHeader: 'Brand Name',
				width: '200px',
				align: 'right',
				action: true,
				relateField: ['brandId'],
			},
			{
				fieldName: ['modelName'],
				fieldNameDb: ['model_name'],
				displayHeader: 'Model Name',
				width: '200px',
				align: 'center',
				action: true,
			},
			{
				fieldName: ['technicalName1', 'technicalName2'],
				fieldNameDb: ['technical_name1', 'technical_name2'],
				displayHeader: 'Technical Name 1-2-3-4',
				multiType: 'join',
				joinChar: ',',
				width: '200px',
				align: 'left',
				action: false,
				headerSpan: 2
			},
			{
				fieldName: ['technicalName3', 'technicalName4'],
				fieldNameDb: ['technical_name3', 'technical_name4'],
				displayHeader: 'Technical Name 3-4',
				multiType: 'join',
				joinChar: ',',
				width: '200px',
				align: 'left',
				action: false,
				hideHeader: true
			},
			{
				fieldName: ['createDate', 'updateDate'],
				fieldNameDb: ['create_date', 'update_date'],
				multiType: 'oneFromLast',
				displayHeader: 'Last Update',
				width: '200px',
				align: 'left',
				action: false,
				thCustomClass: 'testThCustomClass',
				tdCustomClass: 'testTdCustomClass'
			},
		],
		data: {
			'data': [
				{
					'imei': '12345679',
					'brandId': 265,
					'brandName': 'APPLE MOBILE',
					'modelId': 1,
					'modelName': 'Iphone5',
					'technicalName1': 'Iphone5',
					'technicalName2': null,
					'technicalName3': null,
					'technicalName4': null,
					'createDate': 'Jun 12, 2018 12:00:00 AM',
					'createBy': 'a',
					'updateDate': null,
					'updateBy': null,
					'createDateToString': null,
					'updateDateToString': null,
					'check': true
				},
				{
					'imei': '12345679',
					'brandId': 265,
					'brandName': 'APPLE MOBILE',
					'modelId': 1,
					'modelName': 'Iphone5',
					'technicalName1': 'Iphone5',
					'technicalName2': null,
					'technicalName3': null,
					'technicalName4': null,
					'createDate': 'Jun 12, 2018 12:00:00 AM',
					'createBy': 'a',
					'updateDate': null,
					'updateBy': null,
					'createDateToString': null,
					'updateDateToString': null,
					'check': true
				},
				{
					'imei': '12345679',
					'brandId': 265,
					'brandName': 'APPLE MOBILE',
					'modelId': 1,
					'modelName': 'Iphone5',
					'technicalName1': 'Iphone5',
					'technicalName2': null,
					'technicalName3': null,
					'technicalName4': null,
					'createDate': 'Jun 12, 2018 12:00:00 AM',
					'createBy': 'a',
					'updateDate': null,
					'updateBy': null,
					'createDateToString': null,
					'updateDateToString': null,
					'check': true
				},
				{
					'imei': '12345679',
					'brandId': 265,
					'brandName': 'APPLE MOBILE',
					'modelId': 1,
					'modelName': 'Iphone5',
					'technicalName1': 'Iphone5',
					'technicalName2': null,
					'technicalName3': null,
					'technicalName4': null,
					'createDate': 'Jun 12, 2018 12:00:00 AM',
					'createBy': 'a',
					'updateDate': null,
					'updateBy': null,
					'createDateToString': null,
					'updateDateToString': null,
					'check': true
				},
				{
					'imei': '12345679',
					'brandId': 265,
					'brandName': 'APPLE MOBILE',
					'modelId': 1,
					'modelName': 'Iphone5',
					'technicalName1': 'Iphone5',
					'technicalName2': null,
					'technicalName3': null,
					'technicalName4': null,
					'createDate': 'Jun 12, 2018 12:00:00 AM',
					'createBy': 'a',
					'updateDate': null,
					'updateBy': null,
					'createDateToString': null,
					'updateDateToString': null,
					'check': true
				},
				{
					'imei': '12345679',
					'brandId': 265,
					'brandName': 'APPLE MOBILE',
					'modelId': 1,
					'modelName': 'Iphone5',
					'technicalName1': 'Iphone5',
					'technicalName2': null,
					'technicalName3': null,
					'technicalName4': null,
					'createDate': 'Jun 12, 2018 12:00:00 AM',
					'createBy': 'a',
					'updateDate': null,
					'updateBy': null,
					'createDateToString': null,
					'updateDateToString': null,
					'check': true
				},
				{
					'imei': '12345679',
					'brandId': 265,
					'brandName': 'APPLE MOBILE',
					'modelId': 1,
					'modelName': 'Iphone5',
					'technicalName1': 'Iphone5',
					'technicalName2': null,
					'technicalName3': null,
					'technicalName4': null,
					'createDate': 'Jun 12, 2018 12:00:00 AM',
					'createBy': 'a',
					'updateDate': null,
					'updateBy': null,
					'createDateToString': null,
					'updateDateToString': null,
					'check': true
				},
				{
					'imei': '12345679',
					'brandId': 265,
					'brandName': 'APPLE MOBILE',
					'modelId': 1,
					'modelName': 'Iphone5',
					'technicalName1': 'Iphone5',
					'technicalName2': null,
					'technicalName3': null,
					'technicalName4': null,
					'createDate': 'Jun 12, 2018 12:00:00 AM',
					'createBy': 'a',
					'updateDate': null,
					'updateBy': null,
					'createDateToString': null,
					'updateDateToString': null,
					'check': true
				},
				{
					'imei': '12345679',
					'brandId': 265,
					'brandName': 'APPLE MOBILE',
					'modelId': 1,
					'modelName': 'Iphone5',
					'technicalName1': 'Iphone5',
					'technicalName2': null,
					'technicalName3': null,
					'technicalName4': null,
					'createDate': 'Jun 12, 2018 12:00:00 AM',
					'createBy': 'a',
					'updateDate': null,
					'updateBy': null,
					'createDateToString': null,
					'updateDateToString': null,
					'check': true
				},
				{
					'imei': '12345679',
					'brandId': 265,
					'brandName': 'APPLE MOBILE',
					'modelId': 1,
					'modelName': 'Iphone5',
					'technicalName1': 'Iphone5',
					'technicalName2': null,
					'technicalName3': null,
					'technicalName4': null,
					'createDate': 'Jun 12, 2018 12:00:00 AM',
					'createBy': 'a',
					'updateDate': null,
					'updateBy': null,
					'createDateToString': null,
					'updateDateToString': null,
					'check': true
				},
				{
					'imei': '12345679',
					'brandId': 265,
					'brandName': 'APPLE MOBILE',
					'modelId': 1,
					'modelName': 'Iphone5',
					'technicalName1': 'Iphone5',
					'technicalName2': null,
					'technicalName3': null,
					'technicalName4': null,
					'createDate': 'Jun 12, 2018 12:00:00 AM',
					'createBy': 'a',
					'updateDate': null,
					'updateBy': null,
					'createDateToString': null,
					'updateDateToString': null,
					'check': true
				},
				{
					'imei': '12345679',
					'brandId': 265,
					'brandName': 'APPLE MOBILE',
					'modelId': 1,
					'modelName': 'Iphone5',
					'technicalName1': 'Iphone5',
					'technicalName2': null,
					'technicalName3': null,
					'technicalName4': null,
					'createDate': 'Jun 12, 2018 12:00:00 AM',
					'createBy': 'a',
					'updateDate': null,
					'updateBy': null,
					'createDateToString': null,
					'updateDateToString': null,
					'check': true
				},
				{
					'imei': '12345679',
					'brandId': 265,
					'brandName': 'APPLE MOBILE',
					'modelId': 1,
					'modelName': 'Iphone5',
					'technicalName1': 'Iphone5',
					'technicalName2': null,
					'technicalName3': null,
					'technicalName4': null,
					'createDate': 'Jun 12, 2018 12:00:00 AM',
					'createBy': 'a',
					'updateDate': null,
					'updateBy': null,
					'createDateToString': null,
					'updateDateToString': null,
					'check': true
				},
				{
					'imei': '12345679',
					'brandId': 265,
					'brandName': 'APPLE MOBILE',
					'modelId': 1,
					'modelName': 'Iphone5',
					'technicalName1': 'Iphone5',
					'technicalName2': null,
					'technicalName3': null,
					'technicalName4': null,
					'createDate': 'Jun 12, 2018 12:00:00 AM',
					'createBy': 'a',
					'updateDate': null,
					'updateBy': null,
					'createDateToString': null,
					'updateDateToString': null,
					'check': true
				},
				{
					'imei': '12345679',
					'brandId': 265,
					'brandName': 'APPLE MOBILE',
					'modelId': 1,
					'modelName': 'Iphone5',
					'technicalName1': 'Iphone5',
					'technicalName2': null,
					'technicalName3': null,
					'technicalName4': null,
					'createDate': 'Jun 12, 2018 12:00:00 AM',
					'createBy': 'a',
					'updateDate': null,
					'updateBy': null,
					'createDateToString': null,
					'updateDateToString': null,
					'check': true
				},
				{
					'imei': '12345679',
					'brandId': 265,
					'brandName': 'APPLE MOBILE',
					'modelId': 1,
					'modelName': 'Iphone5',
					'technicalName1': 'Iphone5',
					'technicalName2': null,
					'technicalName3': null,
					'technicalName4': null,
					'createDate': 'Jun 12, 2018 12:00:00 AM',
					'createBy': 'a',
					'updateDate': null,
					'updateBy': null,
					'createDateToString': null,
					'updateDateToString': null,
					'check': true
				},
				{
					'imei': '12345679',
					'brandId': 265,
					'brandName': 'APPLE MOBILE',
					'modelId': 1,
					'modelName': 'Iphone5',
					'technicalName1': 'Iphone5',
					'technicalName2': null,
					'technicalName3': null,
					'technicalName4': null,
					'createDate': 'Jun 12, 2018 12:00:00 AM',
					'createBy': 'a',
					'updateDate': null,
					'updateBy': null,
					'createDateToString': null,
					'updateDateToString': null,
					'check': true
				},
				{
					'imei': '12345679',
					'brandId': 265,
					'brandName': 'APPLE MOBILE',
					'modelId': 1,
					'modelName': 'Iphone5',
					'technicalName1': 'Iphone5',
					'technicalName2': null,
					'technicalName3': null,
					'technicalName4': null,
					'createDate': 'Jun 12, 2018 12:00:00 AM',
					'createBy': 'a',
					'updateDate': null,
					'updateBy': null,
					'createDateToString': null,
					'updateDateToString': null,
					'check': true
				},
				{
					'imei': '12345679',
					'brandId': 265,
					'brandName': 'APPLE MOBILE',
					'modelId': 1,
					'modelName': 'Iphone5',
					'technicalName1': 'Iphone5',
					'technicalName2': null,
					'technicalName3': null,
					'technicalName4': null,
					'createDate': 'Jun 12, 2018 12:00:00 AM',
					'createBy': 'a',
					'updateDate': null,
					'updateBy': null,
					'createDateToString': null,
					'updateDateToString': null,
					'check': true
				},
				{
					'imei': '12345679',
					'brandId': 265,
					'brandName': 'APPLE MOBILE',
					'modelId': 1,
					'modelName': 'Iphone5',
					'technicalName1': 'Iphone5',
					'technicalName2': null,
					'technicalName3': null,
					'technicalName4': null,
					'createDate': 'Jun 12, 2018 12:00:00 AM',
					'createBy': 'a',
					'updateDate': null,
					'updateBy': null,
					'createDateToString': null,
					'updateDateToString': null,
					'check': true
				},
				{
					'imei': '12345679',
					'brandId': 265,
					'brandName': 'APPLE MOBILE',
					'modelId': 1,
					'modelName': 'Iphone5',
					'technicalName1': 'Iphone5',
					'technicalName2': null,
					'technicalName3': null,
					'technicalName4': null,
					'createDate': 'Jun 12, 2018 12:00:00 AM',
					'createBy': 'a',
					'updateDate': null,
					'updateBy': null,
					'createDateToString': null,
					'updateDateToString': null,
					'check': true
				},
				{
					'imei': '12345679',
					'brandId': 265,
					'brandName': 'APPLE MOBILE',
					'modelId': 1,
					'modelName': 'Iphone5',
					'technicalName1': 'Iphone5',
					'technicalName2': null,
					'technicalName3': null,
					'technicalName4': null,
					'createDate': 'Jun 12, 2018 12:00:00 AM',
					'createBy': 'a',
					'updateDate': null,
					'updateBy': null,
					'createDateToString': null,
					'updateDateToString': null,
					'check': true
				},
				{
					'imei': '12345679',
					'brandId': 265,
					'brandName': 'APPLE MOBILE',
					'modelId': 1,
					'modelName': 'Iphone5',
					'technicalName1': 'Iphone5',
					'technicalName2': null,
					'technicalName3': null,
					'technicalName4': null,
					'createDate': 'Jun 12, 2018 12:00:00 AM',
					'createBy': 'a',
					'updateDate': null,
					'updateBy': null,
					'createDateToString': null,
					'updateDateToString': null,
					'check': true
				},
				{
					'imei': '12345679',
					'brandId': 265,
					'brandName': 'APPLE MOBILE',
					'modelId': 1,
					'modelName': 'Iphone5',
					'technicalName1': 'Iphone5',
					'technicalName2': null,
					'technicalName3': null,
					'technicalName4': null,
					'createDate': 'Jun 12, 2018 12:00:00 AM',
					'createBy': 'a',
					'updateDate': null,
					'updateBy': null,
					'createDateToString': null,
					'updateDateToString': null,
					'check': true
				},
				{
					'imei': '12345679',
					'brandId': 265,
					'brandName': 'APPLE MOBILE',
					'modelId': 1,
					'modelName': 'Iphone5',
					'technicalName1': 'Iphone5',
					'technicalName2': null,
					'technicalName3': null,
					'technicalName4': null,
					'createDate': 'Jun 12, 2018 12:00:00 AM',
					'createBy': 'a',
					'updateDate': null,
					'updateBy': null,
					'createDateToString': null,
					'updateDateToString': null,
					'check': true
				},
				{
					'imei': '12345679',
					'brandId': 265,
					'brandName': 'APPLE MOBILE',
					'modelId': 1,
					'modelName': 'Iphone5',
					'technicalName1': 'Iphone5',
					'technicalName2': null,
					'technicalName3': null,
					'technicalName4': null,
					'createDate': 'Jun 12, 2018 12:00:00 AM',
					'createBy': 'a',
					'updateDate': null,
					'updateBy': null,
					'createDateToString': null,
					'updateDateToString': null,
					'check': true
				},
				{
					'imei': '12345679',
					'brandId': 265,
					'brandName': 'APPLE MOBILE',
					'modelId': 1,
					'modelName': 'Iphone5',
					'technicalName1': 'Iphone5',
					'technicalName2': null,
					'technicalName3': null,
					'technicalName4': null,
					'createDate': 'Jun 12, 2018 12:00:00 AM',
					'createBy': 'a',
					'updateDate': null,
					'updateBy': null,
					'createDateToString': null,
					'updateDateToString': null,
					'check': true
				},
				{
					'imei': '12345679',
					'brandId': 265,
					'brandName': 'APPLE MOBILE',
					'modelId': 1,
					'modelName': 'Iphone5',
					'technicalName1': 'Iphone5',
					'technicalName2': null,
					'technicalName3': null,
					'technicalName4': null,
					'createDate': 'Jun 12, 2018 12:00:00 AM',
					'createBy': 'a',
					'updateDate': null,
					'updateBy': null,
					'createDateToString': null,
					'updateDateToString': null,
					'check': true
				},
				{
					'imei': '12345678',
					'brandId': 265,
					'brandName': 'APPLE MOBILE',
					'modelId': 1,
					'modelName': 'Iphone5',
					'technicalName1': 'Iphone5',
					'technicalName2': null,
					'technicalName3': null,
					'technicalName4': null,
					'createDate': 'Jun 7, 2018 12:00:00 AM',
					'createBy': 'vutthipp',
					'updateDate': null,
					'updateBy': null,
					'createDateToString': null,
					'updateDateToString': null,
					'check': false
				},
				{
					'imei': '11111111',
					'brandId': 6800,
					'brandName': 'test_by_som_1',
					'modelId': 3,
					'modelName': 'Som_Test_1',
					'technicalName1': 'Som_Test_1',
					'technicalName2': null,
					'technicalName3': null,
					'technicalName4': null,
					'createDate': 'Jun 12, 2018 12:00:00 AM',
					'createBy': 'mingks49',
					'updateDate': null,
					'updateBy': null,
					'createDateToString': null,
					'updateDateToString': null,
					'check': 'Y'
				},
				{
					'imei': '22222222',
					'brandId': 6800,
					'brandName': 'test_by_som_1',
					'modelId': 4,
					'modelName': 'Som_Test_2',
					'technicalName1': 'Som_Test_2',
					'technicalName2': '333',
					'technicalName3': '222',
					'technicalName4': '111',
					'createDate': 'Jun 12, 2018 12:00:00 AM',
					'createBy': 'mingks49',
					'updateDate': null,
					'updateBy': null,
					'createDateToString': null,
					'updateDateToString': null
				},
				{
					'imei': '33333333',
					'brandId': 6801,
					'brandName': 'test_by_som_2',
					'modelId': 5,
					'modelName': 'Som_Test_3',
					'technicalName1': 'Som_Test_3',
					'technicalName2': null,
					'technicalName3': null,
					'technicalName4': null,
					'createDate': 'Jun 12, 2018 12:00:00 AM',
					'createBy': 'mingks49',
					'updateDate': null,
					'updateBy': null,
					'createDateToString': null,
					'updateDateToString': null
				},
				{
					'imei': '44444444',
					'brandId': 6801,
					'brandName': 'test_by_som_2',
					'modelId': 6,
					'modelName': 'Som_Test_4',
					'technicalName1': 'Som_Test_4',
					'technicalName2': null,
					'technicalName3': null,
					'technicalName4': null,
					'createDate': 'Jun 12, 2018 12:00:00 AM',
					'createBy': 'mingks49',
					'updateDate': null,
					'updateBy': null,
					'createDateToString': null,
					'updateDateToString': null
				},
				{
					'imei': '55555555',
					'brandId': 6802,
					'brandName': 'test_by_som_3',
					'modelId': 7,
					'modelName': 'Som_Test_5',
					'technicalName1': 'Som_Test_5',
					'technicalName2': null,
					'technicalName3': null,
					'technicalName4': null,
					'createDate': 'Jun 12, 2018 12:00:00 AM',
					'createBy': 'mingks49',
					'updateDate': null,
					'updateBy': null,
					'createDateToString': null,
					'updateDateToString': null
				},
				{
					'imei': '66666666',
					'brandId': 6802,
					'brandName': 'test_by_som_3',
					'modelId': 8,
					'modelName': 'Som_Test_6',
					'technicalName1': 'Som_Test_6',
					'technicalName2': null,
					'technicalName3': null,
					'technicalName4': null,
					'createDate': 'Jun 12, 2018 12:00:00 AM',
					'createBy': 'mingks49',
					'updateDate': null,
					'updateBy': null,
					'createDateToString': null,
					'updateDateToString': null
				}
			],
			'statusCode': '000',
			'statusMessage': 'Success',
			'totalRecord': 8,
			'pageRowNum': 2
		}
	};
	errorIndex = 0;
	
	constructor(private lockScreen: LockScreenService) {
	}
	
	ngOnInit() {
		this.dynamicForm.onFormReady(1).subscribe((status) => {
			console.log(status);
		})
	}
	
	checkData() {
		console.log(this.formCreation.data);
	}
	
	processCallBack(data) {
		console.log(data);
		if (data.action == 'page' && data.pageNumber == 2) {
			let p2Data = {
				'data': [
					{
						'imei': '7777777777',
						'brandId': 265,
						'brandName': 'APPLE MOBILE',
						'modelId': 1,
						'modelName': 'Iphone5',
						'technicalName1': 'Iphone5',
						'technicalName2': null,
						'technicalName3': null,
						'technicalName4': null,
						'createDate': 'Jun 12, 2018 12:00:00 AM',
						'createBy': 'a',
						'updateDate': null,
						'updateBy': null,
						'createDateToString': null,
						'updateDateToString': null
					},
					{
						'imei': '88888888888',
						'brandId': 265,
						'brandName': 'APPLE MOBILE',
						'modelId': 1,
						'modelName': 'Iphone5',
						'technicalName1': 'Iphone5',
						'technicalName2': null,
						'technicalName3': null,
						'technicalName4': null,
						'createDate': 'Jun 7, 2018 12:00:00 AM',
						'createBy': 'vutthipp',
						'updateDate': null,
						'updateBy': null,
						'createDateToString': null,
						'updateDateToString': null
					},
					{
						'imei': '9999999999',
						'brandId': 6800,
						'brandName': 'test_by_som_1',
						'modelId': 3,
						'modelName': 'Som_Test_1',
						'technicalName1': 'Som_Test_1',
						'technicalName2': null,
						'technicalName3': null,
						'technicalName4': null,
						'createDate': 'Jun 12, 2018 12:00:00 AM',
						'createBy': 'mingks49',
						'updateDate': null,
						'updateBy': null,
						'createDateToString': null,
						'updateDateToString': null
					},
					{
						'imei': '1010101010',
						'brandId': 6800,
						'brandName': 'test_by_som_1',
						'modelId': 4,
						'modelName': 'Som_Test_2',
						'technicalName1': 'Som_Test_2',
						'technicalName2': '333',
						'technicalName3': '222',
						'technicalName4': '111',
						'createDate': 'Jun 12, 2018 12:00:00 AM',
						'createBy': 'mingks49',
						'updateDate': null,
						'updateBy': null,
						'createDateToString': null,
						'updateDateToString': null
					},
					{
						'imei': '10111111111',
						'brandId': 6801,
						'brandName': 'test_by_som_2',
						'modelId': 5,
						'modelName': 'Som_Test_3',
						'technicalName1': 'Som_Test_3',
						'technicalName2': null,
						'technicalName3': null,
						'technicalName4': null,
						'createDate': 'Jun 12, 2018 12:00:00 AM',
						'createBy': 'mingks49',
						'updateDate': null,
						'updateBy': null,
						'createDateToString': null,
						'updateDateToString': null
					},
					{
						'imei': '1022222222222',
						'brandId': 6801,
						'brandName': 'test_by_som_2',
						'modelId': 6,
						'modelName': 'Som_Test_4',
						'technicalName1': 'Som_Test_4',
						'technicalName2': null,
						'technicalName3': null,
						'technicalName4': null,
						'createDate': 'Jun 12, 2018 12:00:00 AM',
						'createBy': 'mingks49',
						'updateDate': null,
						'updateBy': null,
						'createDateToString': null,
						'updateDateToString': null
					},
					{
						'imei': '10333333333',
						'brandId': 6802,
						'brandName': 'test_by_som_3',
						'modelId': 7,
						'modelName': 'Som_Test_5',
						'technicalName1': 'Som_Test_5',
						'technicalName2': null,
						'technicalName3': null,
						'technicalName4': null,
						'createDate': 'Jun 12, 2018 12:00:00 AM',
						'createBy': 'mingks49',
						'updateDate': null,
						'updateBy': null,
						'createDateToString': null,
						'updateDateToString': null
					},
					{
						'imei': '1044444444',
						'brandId': 6802,
						'brandName': 'test_by_som_3',
						'modelId': 8,
						'modelName': 'Som_Test_6',
						'technicalName1': 'Som_Test_6',
						'technicalName2': null,
						'technicalName3': null,
						'technicalName4': null,
						'createDate': 'Jun 12, 2018 12:00:00 AM',
						'createBy': 'mingks49',
						'updateDate': null,
						'updateBy': null,
						'createDateToString': null,
						'updateDateToString': null
					}
				],
				'statusCode': '000',
				'statusMessage': 'Success',
				'totalRecord': 8,
				'pageRowNum': 2
			}
			this.tableCreation.data = p2Data;
		} else if (data.action == 'page' && data.pageNumber == 1) {
			let p1Data = {
				'data': [
					{
						'imei': '12345679',
						'brandId': 265,
						'brandName': 'APPLE MOBILE',
						'modelId': 1,
						'modelName': 'Iphone5',
						'technicalName1': 'Iphone5',
						'technicalName2': null,
						'technicalName3': null,
						'technicalName4': null,
						'createDate': 'Jun 12, 2018 12:00:00 AM',
						'createBy': 'a',
						'updateDate': null,
						'updateBy': null,
						'createDateToString': null,
						'updateDateToString': null,
						'check': true
					},
					{
						'imei': '12345678',
						'brandId': 265,
						'brandName': 'APPLE MOBILE',
						'modelId': 1,
						'modelName': 'Iphone5',
						'technicalName1': 'Iphone5',
						'technicalName2': null,
						'technicalName3': null,
						'technicalName4': null,
						'createDate': 'Jun 7, 2018 12:00:00 AM',
						'createBy': 'vutthipp',
						'updateDate': null,
						'updateBy': null,
						'createDateToString': null,
						'updateDateToString': null,
						'check': false
					},
					{
						'imei': '11111111',
						'brandId': 6800,
						'brandName': 'test_by_som_1',
						'modelId': 3,
						'modelName': 'Som_Test_1',
						'technicalName1': 'Som_Test_1',
						'technicalName2': null,
						'technicalName3': null,
						'technicalName4': null,
						'createDate': 'Jun 12, 2018 12:00:00 AM',
						'createBy': 'mingks49',
						'updateDate': null,
						'updateBy': null,
						'createDateToString': null,
						'updateDateToString': null,
						'check': 'Y'
					},
					{
						'imei': '22222222',
						'brandId': 6800,
						'brandName': 'test_by_som_1',
						'modelId': 4,
						'modelName': 'Som_Test_2',
						'technicalName1': 'Som_Test_2',
						'technicalName2': '333',
						'technicalName3': '222',
						'technicalName4': '111',
						'createDate': 'Jun 12, 2018 12:00:00 AM',
						'createBy': 'mingks49',
						'updateDate': null,
						'updateBy': null,
						'createDateToString': null,
						'updateDateToString': null
					},
					{
						'imei': '33333333',
						'brandId': 6801,
						'brandName': 'test_by_som_2',
						'modelId': 5,
						'modelName': 'Som_Test_3',
						'technicalName1': 'Som_Test_3',
						'technicalName2': null,
						'technicalName3': null,
						'technicalName4': null,
						'createDate': 'Jun 12, 2018 12:00:00 AM',
						'createBy': 'mingks49',
						'updateDate': null,
						'updateBy': null,
						'createDateToString': null,
						'updateDateToString': null
					},
					{
						'imei': '44444444',
						'brandId': 6801,
						'brandName': 'test_by_som_2',
						'modelId': 6,
						'modelName': 'Som_Test_4',
						'technicalName1': 'Som_Test_4',
						'technicalName2': null,
						'technicalName3': null,
						'technicalName4': null,
						'createDate': 'Jun 12, 2018 12:00:00 AM',
						'createBy': 'mingks49',
						'updateDate': null,
						'updateBy': null,
						'createDateToString': null,
						'updateDateToString': null
					},
					{
						'imei': '55555555',
						'brandId': 6802,
						'brandName': 'test_by_som_3',
						'modelId': 7,
						'modelName': 'Som_Test_5',
						'technicalName1': 'Som_Test_5',
						'technicalName2': null,
						'technicalName3': null,
						'technicalName4': null,
						'createDate': 'Jun 12, 2018 12:00:00 AM',
						'createBy': 'mingks49',
						'updateDate': null,
						'updateBy': null,
						'createDateToString': null,
						'updateDateToString': null
					},
					{
						'imei': '66666666',
						'brandId': 6802,
						'brandName': 'test_by_som_3',
						'modelId': 8,
						'modelName': 'Som_Test_6',
						'technicalName1': 'Som_Test_6',
						'technicalName2': null,
						'technicalName3': null,
						'technicalName4': null,
						'createDate': 'Jun 12, 2018 12:00:00 AM',
						'createBy': 'mingks49',
						'updateDate': null,
						'updateBy': null,
						'createDateToString': null,
						'updateDateToString': null
					}
				],
				'statusCode': '000',
				'statusMessage': 'Success',
				'totalRecord': 8,
				'pageRowNum': 2
			};
			this.tableCreation.data = p1Data;
		}
		if (data.action == 'clickBtn' && data.fieldName == 'testAutoCompleteReFilter') {
			this.dynamicForm.mapSetAttribute({
				testAutoCompleteReFilter: {
					valueList: [
						{
							display: 'bbbbbb',
							value: 'bbb'
						},
						{
							display: 'bbbbbbn',
							value: 'bn'
						},
						{
							display: 'bbbbbm',
							value: 'bm'
						},
					]
				}
			});
			this.dynamicForm.reFilterField("testAutoCompleteReFilter", 0,0);
		}
	}
	
	addError() {
		this.errorIndex++;
		this.errorComp.addError('test' + this.errorIndex, 'testMsg' + this.errorIndex);
	}
	
	clearError() {
		this.errorComp.clearError();
	}
	
	testSetAttribute() {
		this.dynamicForm.setFieldAttribute('testAutoComplete', 'label', 'Test set attribute success');
	}
	
	testGetAttribute() {
		let attribute = this.dynamicForm.getFieldAttribute('testTextBox', 'label');
		console.log(attribute);
	}
	
	testSetValue() {
		this.dynamicForm.setDataValue('testTextArea2', 0, 'test assign value');
	}
	
	testGetValue() {
		let value = this.dynamicForm.getDataValue('testRadio', 0);
		console.log(value);
	}
	
	testGetInput() {
		let input = this.dynamicForm.getDynamicInput('testAutoComplete');
		console.log(input);
		input.processCall(0);
	}
	testSetLickScreenColor() {
		this.lockScreen.setColor1("#FF0000")
		this.lockScreen.setColor2("#0000FF")
	}
	
	testLockScreen() {
		this.lockScreen.lockScreen();
		interval(5000)
			.pipe(take(1))
			.subscribe(() => {
				//this.lockScreen.unLockScreen();
			});
		interval(3000)
			.pipe(take(1))
			.subscribe(() => {
				//this.lockScreen.unLockScreen();
			});
	}
	
	testReRenderField() {
		let fieldType = this.dynamicForm.getFieldAttribute('testSwapping', 'type');
		if (fieldType == 'hidden') {
			this.dynamicForm.setFieldAttribute('testSwapping', 'type', 'swappingBox')
		} else {
			this.dynamicForm.setFieldAttribute('testSwapping', 'type', 'hidden')
		}
		this.dynamicForm.reRenderField(['testSwapping']);
	}
	
	popupError() {
		this.popupRef.set('error', 'test Error');
	}
	
	popupInfo() {
		this.popupRef.set('info', 'test Informations');
	}
	
	popupSuccess() {
		this.popupRef.set('success', 'test Success');
	}
	
	popupWarning() {
		this.popupRef.set('warning', 'test Warning');
	}
	
	popupConfirm() {
		this.popupRef.set('confirm', 'test Confirm');
	}
	
	popupCallback(event) {
		console.log(event)
	}
	
	testMapSetAttribute() {
		let setAttribute = {
			testTextBox: {
				type: 'textArea',
				label: 'test Map Attribute',
				inputPattern: /[0-9]/,
				columnPerLine: 1,
			}
		}
		this.dynamicForm.mapSetAttribute(setAttribute);
		this.dynamicForm.reRenderForm();
	}
	
	testMapSetValue() {
		let valueSet = {
			testTextBox: 'aaaa >> Test Map set',
			testTextArea: 'bbbb >> Test Map set',
			testLabel: 'cccc >> Test Map set',
			testSelectBox: ['active', 'inactive'],
		};
		this.dynamicForm.mapSetValue(valueSet, 0);
	}
	
	testMapGetValue() {
		let valueGet = {
			a1: 'testTextBox',
			a2: 'testTextArea',
			a3: 'testSelectBox.display',
			b1: 'testAutoComplete',
			b2: 'testImage',
			b3: 'testUpload',
			b4: 'testSwapping.display',
			b5: 'testMapValue.display',
			b6: 'testSwapping.all',
			c1: 'testCheckBox.all',
			c2: 'testCheckBox.display',
			c3: 'testCheckBox.value',
			c4: 'testCheckBox',
			r1: 'testRadio',
			r2: 'testRadio.display',
			r3: 'testRadio.value',
			d1: 'testDate',
		};
		let returnData = this.dynamicForm.mapGetValue(valueGet, 0);
		console.log(returnData);
	}
	
	testGetRequire() {
		let checkRequire = this.dynamicForm.checkRequireField(0);
		console.log(checkRequire);
	}
	
	getTableCheckList() {
		console.log(this.tableRef.getCheckedList());
	}
	
	clearTableCheckList() {
		this.tableRef.clearCheckedList();
	}
	
	testGetValidate() {
		let checkValidate = this.dynamicForm.checkValidateField(0);
		console.log(checkValidate);
	}
	
	testEnableFormRow() {
		this.dynamicFormTable.enableRow(0);
	}
	
	testDisableFormRow() {
		this.dynamicFormTable.disableRow(0);
	}
	
	testAddRow() {
		this.dynamicFormTable.addRow();
	}
	
	testFormTableGetInput() {
		let input = this.dynamicFormTable.getDynamicInput('testTextBox');
		console.log(input);
	}
	
	testDeleteMulti() {
		this.dynamicFormTable.deleteRow([1, 2]);
	}
	
	testEnableField() {
		this.dynamicFormTable.enableField(0, 'testCheckBox')
	}
	
	testDisableField() {
		this.dynamicFormTable.disableField(0, 'testCheckBox')
	}
	
	testEditMode() {
		this.dynamicForm.setMode('edit');
	}
	
	testViewMode() {
		this.dynamicForm.setMode('view');
	}
	
	toggleLockTab() {
		this.tabListRef.toggleLockTab();
	}
	
	testNextTab() {
		this.tabListRef.nextTab();
	}
	
	testDisableTab() {
		this.tabListRef.disableTab(5);
	}
	
	testEnableTab() {
		this.tabListRef.enableTab(5);
	}
	
	testDuplicateToNewRow() {
		this.dynamicFormTable.duplicateToNewRow(0);
	}
	
	testCheckDuplicate() {
		let check = this.dynamicFormTable.checkDuplicate(['testTextBox'], /([a-zA-Z].*)(-)(\d)/g, 1);
		console.log(check)
	}
	
	contentPopup() {
	
	}
	
	checkDataTable() {
		console.log(this.formCreationTable.data);
	}
	
	testReRenderForm() {
		this.dynamicForm.reRenderForm();
	}
	
	testReRenderTableForm() {
		this.dynamicFormTable.reRenderForm();
	}
	
	testMapSetAutoComplete() {
		this.dynamicForm.mapSetValue({
			'testAutoComplete': 'AAA'
		}, 0)
	}
	
	testSetRow(rownum) {
		this.dynamicFormTable.setRowNum(rownum).subscribe(() => {
			console.log(this.formCreationTable.data)
		})
	}
	
	// testDelete() {
	// 	this.dynamicFormTable.deleteRowTest(2);
	// }
	testSetDefault() {
		this.dynamicForm.setDefault();
	}
	toggleContent() {
		if (this.contentActive === false) {
			this.contentActive = true
		} else {
			this.contentActive = false;
		}
	}
}
