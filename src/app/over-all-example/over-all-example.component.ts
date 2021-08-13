import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MenuService} from '../../../projects/light-break-dynamic/src/lib/component/collapse-menu/menu.service';

@Component({
	selector: 'app-over-all-example',
	templateUrl: './over-all-example.component.html',
	styleUrls: ['./over-all-example.component.css']
})
export class OverAllExampleComponent implements OnInit {
	activeCode = '';
	testRole = [
		'test1',
		'test5',
		'test2'
	]
	tabCreation = {
		option: {},
		tabList: ['Test Component', 'User Interface Editor', 'Function Manual']
	};
	
	menuData = {
		menuList: [
			{
				name: '<span class=\'glyphicon glyphicon-home\'></span> UI-Editor',
				route: 'main/ui-editor',
				code: 'UI_EDITOR',
				customClass: 'menuBold',
				role: ['test1'],
				numberOfData: `<div class="numberOfDataInMenu yellow">10</div>`
			},
			{
				name: '<span class=\'glyphicon glyphicon-heart\'></span> Test Component',
				route: 'main/test-component',
				code: 'TEST_COMPONENT',
				role: ['test2'],
				// numberOfData: `<div class="numberOfDataInMenu green">105</div>`
			},
			// {
			// 	name: '<span class=\'glyphicon glyphicon-heart\'></span> Test Menu',
			// 	route: 'main/test-component',
			// 	code: 'TEST_MENU',
			// 	role: ['test2'],
			// 	children: {
			// 		option: {
			// 			itemHeight: 20
			// 		},
			// 		menuList: [
			// 			{
			// 				'name': 'verifyField',
			// 				'route': 'main/function-manual#verifyField',
			// 				'code': 'FUNCTION_MANUAL_TEST_verifyField',
			// 				'customClass': 'menuChild1',
			// 				role: ["childHide"]
			// 			},
			// 			{
			// 				'name': 'generateFrameHeader',
			// 				'route': 'main/function-manual#generateFrameHeader',
			// 				'code': 'FUNCTION_MANUAL_TEST_generateFrameHeader',
			// 				'customClass': 'menuChild1',
			// 				role: ["childHide"]
			// 			},
			// 			{
			// 				'name': 'getDefault',
			// 				'route': 'main/function-manual#getDefault',
			// 				'code': 'FUNCTION_MANUAL_TEST_getDefault',
			// 				'customClass': 'menuChild1'
			// 			},
			// 		]
			// 	}
			// },
			{
				active: false,
				name: 'Function Manual',
				route: 'main/function-manual',
				code: 'FUNCTION_MANUAL',
				role: ['test5'],
				numberOfData: `<div class="numberOfDataInMenu red">8</div>`,
				children: {
					option: {
						itemHeight: 20
					},
					menuList: [
						{
							'name': 'verifyField',
							'route': 'main/function-manual#verifyField',
							'code': 'FUNCTION_MANUAL_verifyField',
							'customClass': 'menuChild1',
						},
						{
							'name': 'generateFrameHeader',
							'route': 'main/function-manual#generateFrameHeader',
							'code': 'FUNCTION_MANUAL_generateFrameHeader',
							'customClass': 'menuChild1',
						},
						{
							'name': 'getDefault',
							'route': 'main/function-manual#getDefault',
							'code': 'FUNCTION_MANUAL_getDefault',
							'customClass': 'menuChild1',
						},
						{
							'name': 'reRenderForm',
							'route': 'main/function-manual#reRenderForm',
							'code': 'FUNCTION_MANUAL_reRenderForm',
							'customClass': 'menuChild1'
						},
						{
							'name': 'reRenderField',
							'route': 'main/function-manual#reRenderField',
							'code': 'FUNCTION_MANUAL_reRenderField',
							'customClass': 'menuChild1'
						},
						{
							'name': 'setFieldAttribute',
							'route': 'main/function-manual#setFieldAttribute',
							'code': 'FUNCTION_MANUAL_setFieldAttribute',
							'customClass': 'menuChild1'
						},
						{
							'name': 'getFieldAttribute',
							'route': 'main/function-manual#getFieldAttribute',
							'code': 'FUNCTION_MANUAL_getFieldAttribute',
							'customClass': 'menuChild1'
						},
						{
							'name': 'setDataValue',
							'route': 'main/function-manual#setDataValue',
							'code': 'FUNCTION_MANUAL_setDataValue',
							'customClass': 'menuChild1'
						},
						{
							'name': 'getDataValue',
							'route': 'main/function-manual#getDataValue',
							'code': 'FUNCTION_MANUAL_getDataValue',
							'customClass': 'menuChild1'
						},
						{
							'name': 'mapSetAttribute',
							'route': 'main/function-manual#mapSetAttribute',
							'code': 'FUNCTION_MANUAL_mapSetAttribute',
							'customClass': 'menuChild1'
						},
						{
							'name': 'mapSetValue',
							'route': 'main/function-manual#mapSetValue',
							'code': 'FUNCTION_MANUAL_mapSetValue',
							'customClass': 'menuChild1'
						},
						{
							'name': 'mapGetValue',
							'route': 'main/function-manual#mapGetValue',
							'code': 'FUNCTION_MANUAL_mapGetValue',
							'customClass': 'menuChild1'
						},
						{
							'name': 'getFieldList',
							'route': 'main/function-manual#getFieldList',
							'code': 'FUNCTION_MANUAL_getFieldList',
							'customClass': 'menuChild1'
						},
						{
							'name': 'getFrameHeader',
							'route': 'main/function-manual#getFrameHeader',
							'code': 'FUNCTION_MANUAL_getFrameHeader',
							'customClass': 'menuChild1'
						},
						{
							'name': 'getFormRow',
							'route': 'main/function-manual#getFormRow',
							'code': 'FUNCTION_MANUAL_getFormRow',
							'customClass': 'menuChild1'
						},
						{
							'name': 'addRow',
							'route': 'main/function-manual#addRow',
							'code': 'FUNCTION_MANUAL_addRow',
							'customClass': 'menuChild1'
						},
						{
							'name': 'deleteRow',
							'route': 'main/function-manual#deleteRow',
							'code': 'FUNCTION_MANUAL_deleteRow',
							'customClass': 'menuChild1'
						},
						{
							'name': 'enableRow',
							'route': 'main/function-manual#enableRow',
							'code': 'FUNCTION_MANUAL_enableRow',
							'customClass': 'menuChild1'
						},
						{
							'name': 'disableRow',
							'route': 'main/function-manual#disableRow',
							'code': 'FUNCTION_MANUAL_disableRow',
							'customClass': 'menuChild1'
						},
						{
							'name': 'enableField',
							'route': 'main/function-manual#enableField',
							'code': 'FUNCTION_MANUAL_enableField',
							'customClass': 'menuChild1'
						},
						{
							'name': 'disableField',
							'route': 'main/function-manual#disableField',
							'code': 'FUNCTION_MANUAL_disableField',
							'customClass': 'menuChild1'
						},
						{
							'name': 'enableDeleteRow',
							'route': 'main/function-manual#enableDeleteRow',
							'code': 'FUNCTION_MANUAL_enableDeleteRow',
							'customClass': 'menuChild1'
						},
						{
							'name': 'disableDeleteRow',
							'route': 'main/function-manual#disableDeleteRow',
							'code': 'FUNCTION_MANUAL_disableDeleteRow',
							'customClass': 'menuChild1'
						},
						{
							'name': 'reFilter',
							'route': 'main/function-manual#reFilter',
							'code': 'FUNCTION_MANUAL_reFilter',
							'customClass': 'menuChild1'
						},
						{
							'name': 'onFormReady',
							'route': 'main/function-manual#onFormReady',
							'code': 'FUNCTION_MANUAL_onFormReady',
							'customClass': 'menuChild1'
						},
						{
							'name': 'duplicateDataRow',
							'route': 'main/function-manual#duplicateDataRow',
							'code': 'FUNCTION_MANUAL_duplicateDataRow',
							'customClass': 'menuChild1'
						},
						{
							'name': 'duplicateToNewRow',
							'route': 'main/function-manual#duplicateToNewRow',
							'code': 'FUNCTION_MANUAL_duplicateToNewRow',
							'customClass': 'menuChild1'
						},
						{
							'name': 'checkDuplicate',
							'route': 'main/function-manual#checkDuplicate',
							'code': 'FUNCTION_MANUAL_checkDuplicate',
							'customClass': 'menuChild1'
						},
						{
							'name': 'checkRequireField',
							'route': 'main/function-manual#checkRequireField',
							'code': 'FUNCTION_MANUAL_checkRequireField',
							'customClass': 'menuChild1'
						},
						{
							'name': 'checkValidateField',
							'route': 'main/function-manual#checkValidateField',
							'code': 'FUNCTION_MANUAL_checkValidateField',
							'customClass': 'menuChild1'
						},
						{
							'name': 'checkRequireAll',
							'route': 'main/function-manual#checkRequireAll',
							'code': 'FUNCTION_MANUAL_checkRequireAll',
							'customClass': 'menuChild1'
						},
						{
							'name': 'checkValidateAll',
							'route': 'main/function-manual#checkValidateAll',
							'code': 'FUNCTION_MANUAL_checkValidateAll',
							'customClass': 'menuChild1'
						},
						{
							'name': 'setMode',
							'route': 'main/function-manual#setMode',
							'code': 'FUNCTION_MANUAL_setMode',
							'customClass': 'menuChild1'
						},
						{
							'name': 'enableAdd',
							'route': 'main/function-manual#enableAdd',
							'code': 'FUNCTION_MANUAL_enableAdd',
							'customClass': 'menuChild1'
						},
						{
							'name': 'disableAdd',
							'route': 'main/function-manual#disableAdd',
							'code': 'FUNCTION_MANUAL_disableAdd',
							'customClass': 'menuChild1'
						},
						{
							'name': 'enableDelete',
							'route': 'main/function-manual#enableDelete',
							'code': 'FUNCTION_MANUAL_enableDelete',
							'customClass': 'menuChild1'
						},
						{
							'name': 'disableDelete',
							'route': 'main/function-manual#disableDelete',
							'code': 'FUNCTION_MANUAL_disableDelete',
							'customClass': 'menuChild1'
						}
					]
				}
			}
		]
	}
	
	constructor(private router: Router, private menuService: MenuService) {
		this.menuService.emitMenu.subscribe((data:any) => {
			console.log(data)
			this.activeCode = data.code;
			if (data.children === 0) {
				this.router.navigateByUrl(data.route).then();
			}
		})
	}
	
	ngOnInit() {
	}
	
	menuCallback(data) {
		this.menuService.setMenu(data);
		// console.log(data)
		// this.activeCode = data.code;
		// if (data.children === 0) {
		// 	this.router.navigateByUrl(data.route).then();
		// }
	}
}
