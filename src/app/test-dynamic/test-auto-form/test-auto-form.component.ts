import {Component, OnInit, ViewChild} from '@angular/core';
import {FormHttpRequestService} from '../../../../projects/light-break-dynamic/src/lib/service/form-http-request.service';
import {AutoFormComponent} from '../../../../projects/light-break-dynamic/src/lib/component/auto-form/auto-form.component';
;

@Component({
  selector: 'app-test-auto-form',
  templateUrl: './test-auto-form.component.html',
  styleUrls: ['./test-auto-form.component.scss']
})
export class TestAutoFormComponent implements OnInit {
  @ViewChild("autoForm") autoFromVC: AutoFormComponent;
  active = true
  
  constructor(private formHttp: FormHttpRequestService) { }
  
  ngOnInit(): void {
    this.formHttp.setApiUrl("http://localhost:3000/api")
    // this.formHttp.setApiUrl("http://localhost:3000/master-api")
    this.formHttp.setFormConfigUrl("http://localhost:3000/form/")
    // this.formHttp.setFormConfigUrl("http://localhost:3000/master-form/")
    this.active = true
  }

  refinedData(data) {
    let refinedData = [];
    let pad = (n, width, z) => {
      z = z || '0';
      n = n + '';
      return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
    }
    for (let dataRow of data) {
      dataRow.idZeroPad = "<span class='glyphicon-random glyphicon'></span>" + pad(dataRow.id, 5, 0);
      refinedData.push(dataRow)
    }
    return refinedData;
  }
  refinedMasterData(data) {
    let returnData = {};
    for (let dataName in data) {
      let dataSet = data[dataName]
      dataSet.unshift({
        display:"=====Please Select=====",
        value: ""
      })
      returnData[dataName] = dataSet
    }
    return returnData;
  }
  refinedListPayload(data, form) {
    console.log(data)
    // data["param"] = {
    //   team_id: 41
    // }
    if (form === "user") {
      if (!data["param"]) {
        data["param"] = {}
      }
      data["param"]["user_self"] = 81
      data["param"]["team_id"] = 1
    }
    return data
  }
  refinedMasterPayload(data, formName) {
    console.log(data);
    // data.dataList[0]["param"] = {
    //   team_id: 41
    // }
    return data
  }
  refinedSaveData(data, formName) {
    console.log(data);
    data["team_id"] = 41;
    return data;
  }
  callbackEvent(e) {
    console.log("event", e);
    if (e.event == "saveSuccess") {
      // this.autoFromVC.processLoadMasterData();
    }
  }
}
