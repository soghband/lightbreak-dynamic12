import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {ViewportScroller} from '@angular/common';
import {timer} from 'rxjs';

@Component({
    selector: 'app-function-maual',
    templateUrl: './function-maual.component.html',
    styleUrls: ['./function-maual.component.scss']
})
export class FunctionMaualComponent implements OnInit {
    // @Output() setMenu = new EventEmitter();
    constructor(private router: Router,private viewportScroller: ViewportScroller) {
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                // Hide loading indicator
                let urlSplit = event.url.split("#")
                timer(500).subscribe(() => {
                    let el = document.getElementById(urlSplit[1]);
                    if (el) {
                        el.scrollIntoView({behavior: 'smooth'});
                    }
                })

            }
        })
    }

    objKey = Object.keys;
    lang = 'th';
    explanationText = {
        verifyField: {
            th: 'ตรวจสอบการคั้งค่าของฟอร์มและข้อมูลว่าตรงกันหรือไม่',
            en: 'Check form config and data is match.',
            using: "verifyField()",
            parameter: "N/A",
            example: 'Return: Boolean\n' +
                'Example: \n' +
                'this.formViewChild.verifyField();'
        },
        generateFrameHeader: {
            th: 'สร้าง Header ของเฟรม',
            en: 'Create frame header.',
            using: "generateFrameHeader()",
            parameter: "N/A",
            example: 'Return: Void\n' +
                'Example: \n' +
                'this.formViewChild.generateFrameHeader();'
        },
        getDefault: {
            th: 'ดึงค่าเริ่มต้นจากการตั้งค่า',
            en: 'Get default from setting.',
            using: "getDefault()",
            parameter: "N/A",
            example: 'Return: Object\n' +
                'Example: \n' +
                'this.formViewChild.getDefault();'
        },
        reRenderForm: {
            th: 'ทำการแสดงฟอร์มใหม่ ใช้เมื่อมีการเปลี่ยนแปลงการตั้งค่าของฟิลด์หลายฟิลด์',
            en: 'Re-render from, use when change form setting',
            using: "reRenderForm()",
            parameter: "N/A",
            example: 'Return: Void\n' +
                'Example: \n' +
                'this.formViewChild.reRenderForm();'
        },
        reRenderField: {
            th: 'ทำการแสดงฟิลด์ใหม่ ใช้เมื่อมีการเปลี่ยนแปลงการตั้งค่าของฟิลด์บางฟิลด์',
            en: 'Re-render field, use when change field setting',
            using: "reRenderField(fieldNameArray)",
            parameter: "fieldNameArray: Array of field name.",
            example: 'Return: Void\n' +
                'Example: \n' +
                'this.formViewChild.reRenderField(["fieldName1","fieldName2"]);'
        },
        setFieldAttribute: {
            th: 'ตั้งค่าคุณสมบัติของฟิลด์',
            en: 'Set field attribute.',
            using: "setFieldAttribute(fieldName,attributeName,attributeValue)",
            parameter: "fieldName: Field name string\n" +
                "attributeName: Attribute name string\n" +
                "attributeValue: Attribute value string",
            example: 'Return: Void\n' +
                'Example: \n' +
                'this.formViewChild.setFieldAttribute("fieldName","type","textBox");'
        },
        getFieldAttribute: {
            th: 'ดึงค่าคุณสมบัติของฟิลด์',
            en: 'Get field attribute.',
            using: "getFieldAttribute(fieldName,attributeName)",
            parameter: "fieldName: Field name string\n" +
                "attributeName: Attribute name string",
            example: 'Return: String\n' +
                'Example: \n' +
                'this.formViewChild.getFieldAttribute("fieldName","type");'
        },
        setDataValue: {
            th: 'ตั้งค่าข้อมูลลงในฟิลด์ที่กำหนด',
            en: 'Set data value to specified field',
            using: "setDataValue(fieldName,rowIndex,value,[multiValue])",
            parameter: "fieldName: Field name string.\n" +
                "rowIndex: Data row index number.\n" +
                "value: Value string, object or array of [string or object].\n" +
                "multiValue: Set to multi value [Optional default = false].\n",
            example: 'Return: Void\n' +
                'Example1: \n' +
                'this.formViewChild.setDataValue("fieldName", 0, "Value");\n' +
                'Example2: \n' +
                'this.formViewChild.setDataValue("fieldName", 0, ["valueA","valueB"], true);\n'},
        getDataValue: {
            th: 'ดึงค่าข้อมูลจากฟิลด์ที่กำหนด',
            en: 'Get data value to specified field',
            using: "getDataValue(fieldName,rowIndex,dataIndex)",
            parameter: "fieldName: Field name string.\n" +
                "rowIndex: Data row index number.\n" +
                "dataIndex: Data index number [can > 0 if using multi-value]\n",
            example: 'Return: String/Object/Array\n' +
                'Example: \n' +
                'this.formViewChild.getDataValue("fieldName", 0, 0);\n',
        },
        mapSetAttribute: {
            th: 'กำหนดคุณสมบัติฟิลก์แบบหลายฟิลด์',
            en: 'Set field attribute by mapping.',
            using: "mapSetAttribute(mapObject)",
            parameter: "mapObject: Map object\n" +
                "   {\n" +
                "       fieldName: {\n" +
                "           attributeName: value,\n" +
                "           attributeName: value\n" +
                "       }\n" +
                "   }\n",
            example: 'Return: Void\n' +
                'Example: \n' +
                'let mapObject= {\n' +
                '   fieldName1 : {\n' +
                '       type:"autoComplete",\n' +
                '       readonly: false\n' +
                '   },\n' +
                '   fieldName2 : {\n' +
                '       type:"textBox",\n' +
                '       readonly: true\n' +
                '   }\n' +
                '};\n' +
                'this.formViewChild.mapSetAttribute(mapObject);\n',
        },
        mapSetValue: {
            th: 'กำหนดค่าข้อมูลแบบหลายฟิลด์',
            en: 'Set field data by mapping.',
            using: "mapSetValue(mapObject,rowIndex)",
            parameter: "mapObject: Map object\n" +
                "   {\n" +
                "       fieldName: value\n" +
                "   }\n" +
                "rowIndex:  Data row index number.",
            example: 'Return: Void\n' +
                'Example: \n' +
                'let mapObject= {\n' +
                '   fieldName1 : "data1",\n' +
                '   fieldName2 : "data2"\n' +
                '};\n' +
                'this.formViewChild.mapSetValue(mapObject,0);\n'
        },
        mapGetValue: {
            th: 'ดึงค่าข้อมูลแบบหลายฟิลด์',
            en: 'Get field data by mapping.',
            using: "mapGetValue(mapObject,rowIndex)",
            parameter: "mapObject: Map object\n" +
                "   {\n" +
                "       modifyName: \"fieldName.valueSource:valueType\"\n" +
                "   }\n" +
                "   valueSource: [display/value default = value if not found display or not specified]\n" +
                "   valueType: [string/int/double/bool]}\n" +
                "rowIndex: Data row index number.",
            example: 'Return: Object\n' +
                'Example: \n' +
                'let mapObject= {\n' +
                '   getData1 : "fieldName1.value:string",\n' +
                '   getData2 : "fieldName2.display:string",\n' +
                '   getData3 : "fieldName3",\n' +
                '   getData4 : "fieldName4:string",\n' +
                '   getData5 : "fieldName5:int",\n' +
                '   getData6 : "fieldName6:float",\n' +
                '   getData7 : "fieldName7:bool"\n' +
                '};\n' +
                'let mapData = this.formViewChild.mapGetValue(mapObject,0);'
        },
        getFieldList: {
            th: 'ดึงข้อมูลลิสชื่อฟิลด์',
            en: 'Get list field name data',
            using: "getFieldList()",
            parameter: "N/A",
            example: 'Return: String array\n' +
                'Example: \n' +
                'let fieldList = this.formViewChild.getFieldList();'
        },
        getFrameHeader: {
            th: 'ดึงข้อมูชื่อเฟรม',
            en: 'Get frame name',
            using: "getFrameHeader(rowIndex)",
            parameter: "rowIndex: Data row index number.",
            example: 'Return: String\n' +
                'Example: \n' +
                'let frameName = this.formViewChild.getFrameHeader(0);'
        },
        getFormRow: {
            th: 'ดึงจำนวนแถวของแบบฟอร์ม',
            en: 'Get form row number',
            using: "getFormRow()",
            parameter: "N/A",
            example: 'Return: Number\n' +
                'Example: \n' +
                'let rowNumber = this.formViewChild.getFormRow();'
        },
        addRow: {
            th: 'เพิ่มแถว',
            en: 'Add new row',
            using: "addRow([rowIndex=null], [sourceAction=null])",
            parameter: "rowIndex: Number of add row optional\n" +
                "sourceAction: Callback check key optional",
            example: 'Return: Void\n' +
                'Example1: \n' +
                'this.formViewChild.addRow();\n' +
                'Example2: \n' +
                'this.formViewChild.addRow(5);\n' +
                'Example3: \n' +
                'this.formViewChild.addRow(2,"addFromFunction1");'
        },
        deleteRow: {
            th: 'ลบแถว',
            en: 'Delete row',
            using: "deleteRow(rowIndex, [sourceAction=null])",
            parameter: "rowIndex: Number of array list of delete row\n" +
                "sourceAction: Callback check key optional",
            example: 'Return: Void\n' +
                'Example1: \n' +
                'this.formViewChild.deleteRow(5);\n' +
                'Example2: \n' +
                'this.formViewChild.deleteRow([3,5]);\n' +
                'Example3: \n' +
                'this.formViewChild.deleteRow(2,"deleteFromFunction1");'
        },
        enableRow: {
            th: 'เปิดใช้งานแถว',
            en: 'Enable row',
            using: "enableRow(rowIndex)",
            parameter: "rowIndex: Number of enable row.",
            example: 'Return: Void\n' +
                'Example1: \n' +
                'this.formViewChild.enableRow(5);'
        },
        disableRow: {
            th: 'ปิดใช้งานแถว',
            en: 'Disable row',
            using: "disableRow(rowIndex)",
            parameter: "rowIndex: Number of disable row.",
            example: 'Return: Void\n' +
                'Example: \n' +
                'this.formViewChild.disableRow(5);'
        },
        enableField: {
            th: 'เปิดใช้งานฟิลด์',
            en: 'Enable field',
            using: "enableField(rowIndex,fieldName)",
            parameter: "rowIndex: Number of row." +
                "fieldName: Field name string\n",
            example: 'Return: Void\n' +
                'Example: \n' +
                'this.formViewChild.enableField(0,"fieldName1");'
        },
        disableField: {
            th: 'ปิดใช้งานฟิลด์',
            en: 'Disable field',
            using: "disableField(rowIndex,fieldName)",
            parameter: "rowIndex: Number of row." +
                "fieldName: Field name string\n",
            example: 'Return: Void\n' +
                'Example: \n' +
                'this.formViewChild.disableField(0,"fieldName1");'
        },
        enableDeleteRow: {
            th: 'เปิดใช้งานปุ่มลบแถว',
            en: 'Enable delete button row',
            using: "enableDeleteRow(rowIndex)",
            parameter: "rowIndex: Number of data row.",
            example: 'Return: Void\n' +
                'Example: \n' +
                'this.formViewChild.enableDeleteRow(0);'
        },
        disableDeleteRow: {
            th: 'ปิดใช้งานปุ่มลบแถว',
            en: 'Disable delete button row',
            using: "disableDeleteRow(rowIndex)",
            parameter: "rowIndex: Number of data row.",
            example: 'Return: Void\n' +
                'Example: \n' +
                'this.formViewChild.disableDeleteRow(0);'
        },
        reFilter: {
            th: 'ทำการกรองข้อมูลใหม่สำหรับ Auto Complete',
            en: 'Re-filter data for auto complete',
            using: "reFilter(rowIndex)",
            parameter: "rowIndex: Number of data row.",
            example: 'Return: Void\n' +
                'Example: \n' +
                'this.formViewChild.reFilter(0);'
        },
        onFormReady: {
            th: 'เรียกใช้งาน Function Callback เมื่อแบบฟอร์มพร้อมใช้งาน',
            en: 'Subscribe function callback when form ready',
            using: "onFormReady(rowNum,[data=null],[timeout=15000],[debug=false])",
            parameter: "rowNum: Number of data row.\n" +
                "data: Data work within subscribe optional [default = null]\n" +
                "timeout: Timeout millisecond optional [default = 15000]\n" +
                "debug: Using debug mode optional [default = false]",
            example: 'Return: Void\n' +
                'Example: \n' +
                'this.formViewChild.onFormReady(3)\n' +
                '   .subscribe(data => {\n' +
                '       console.log("form ready",data);\n' +
                '   );'
        },
        duplicateDataRow: {
            th: 'ทำการคัดลอกข้อมูลจากแถวในแบบฟอร์ม',
            en: 'Copy data from source row to specified row',
            using: "duplicateDataRow(sourceRowIndex,destinationRowIndex,actionOnFromReady)",
            parameter: "sourceRowIndex: Number of source data row.\n" +
                "destinationRowIndex: Number of destination data row.\n" +
                "actionOnFromReady: Action when from ready optional [default = true]",
            example: 'Return: Void\n' +
                'Example: \n' +
                'this.formViewChild.duplicateDataRow(0,1);'
        },
        duplicateToNewRow: {
            th: 'ทำการสร้างแถวข้อมูลใหม่และคัดลอกข้อมูลจากแถวในแบบฟอร์มไปที่แถวใหม่',
            en: 'Create new row and copy data from source row to new row',
            using: "duplicateToNewRow(sourceRowIndex,[sourceAction=null])",
            parameter: "sourceRowIndex: Number of source data row.\n" +
                "sourceAction: Callback check key optional [default = null]",
            example: 'Return: Void\n' +
                'Example: \n' +
                'this.formViewChild.duplicateToNewRow(0,"duplicateFunction");'
        },
        checkDuplicate: {
            th: 'ตรวจสอบค่าซ้ำ',
            en: 'Check duplicate data.',
            using: "checkDuplicate(fieldList,[regExPattern=/(.*)/],[regExIndex=0])",
            parameter: "fieldList: Field name list.\n" +
                "regExPattern: Regular expression pattern support group pattern optional [default = /(.*)/].\n" +
                "regExIndex: Regular expression group check index [default = 0].\n",
            example: 'Return: Boolean\n' +
                'Example: \n' +
                'let duplicate = this.formViewChild.checkDuplicate(0,/(a-zA-Z*)(-\\d)/,1);'
        },
        checkRequireField: {
            th: 'ตรวจสอบฟิลด์ที่จำเป็น โดยอ้างอิงจากคุณสมบัติ [require]',
            en: 'Check require field reference attribute [require]',
            using: "checkRequireField(rowIndex)",
            parameter: "rowIndex: Data row index number.",
            example: 'Return: Boolean\n' +
                'Example: \n' +
                'let check = this.formViewChild.checkRequireField(0);'
        },
        checkValidateField: {
            th: 'ตรวจสอบฟิลด์ที่ข้อมูล โดยอ้างอิงจากคุณสมบัติ [valuePattern]',
            en: 'Check validate field reference attribute [valuePattern]',
            using: "checkValidateField(rowIndex)",
            parameter: "rowIndex: Data row index number.",
            example: 'Return: Boolean\n' +
                'Example: \n' +
                'let check = this.formViewChild.checkValidateField(0);'
        },
        checkRequireAll: {
            th: 'ตรวจสอบฟิลด์ที่จำเป็น โดยอ้างอิงจากคุณสมบัติ [require] ในทุกแถว',
            en: 'Check require field reference attribute [require] in all row.',
            using: "checkRequireAll()",
            parameter: "N/A",
            example: 'Return: Boolean\n' +
                'Example: \n' +
                'let check = this.formViewChild.checkRequireAll();'
        },
        checkValidateAll: {
            th: 'ตรวจสอบฟิลด์ที่ข้อมูล โดยอ้างอิงจากคุณสมบัติ [valuePattern] ในทุกแถว',
            en: 'Check validate field reference attribute [valuePattern] in all row',
            using: "checkValidateAll()",
            parameter: "N/A",
            example: 'Return: Boolean\n' +
                'Example: \n' +
                'let check = this.formViewChild.checkValidateAll();'
        },
        setMode: {
            th: 'ตั้งค่าโหมด เพิ่ม / แก้ไข / มุมมอง',
            en: 'Setting mode add / edit / view',
            using: "setMode(DynamicFormModeEnumMode)",
            parameter: "enumMode: DynamicFormMode Enum = [add/edit/view]",
            example: 'Return: Void\n' +
                'Example: \n' +
                'this.formViewChild.setMode(DynamicFormMode.edit);'
        },
        enableAdd: {
            th: 'เปิดโมดูลเพิ่มแถว',
            en: 'Enable module add row',
            using: "enableAdd()",
            parameter: "N/A",
            example: 'Return: Void\n' +
                'Example: \n' +
                'this.formViewChild.enableAdd();'
        },
        disableAdd: {
            th: 'ปิดโมดูลเพิ่มแถว',
            en: 'Disable module add row',
            using: "disableAdd()",
            parameter: "N/A",
            example: 'Return: Void\n' +
                'Example: \n' +
                'this.formViewChild.disableAdd();'
        },
        enableDelete: {
            th: 'เปิดโมดูลลบแถว',
            en: 'Enable module delete row',
            using: "enableDelete()",
            parameter: "N/A",
            example: 'Return: Void\n' +
                'Example: \n' +
                'this.formViewChild.enableDelete();'
        },
        disableDelete: {
            th: 'ปิดโมดูลลบแถว',
            en: 'Disable module delete row',
            using: "disableDelete()",
            parameter: "N/A",
            example: 'Return: Void\n' +
                'Example: \n' +
                'this.formViewChild.disableDelete();'
        },
    };

    ngOnInit() {
        let menuList = [];
        for (let menuItemIndex in this.explanationText) {
            menuList.push({
                name: menuItemIndex,
                route: 'main/function-manual#'+menuItemIndex,
                code: 'FUNCTION_MANUAL_'+menuItemIndex,
            })
        }
        // console.log(JSON.stringify(menuList));


    }

    changeLng(lang) {
        this.lang = lang
    }
}
