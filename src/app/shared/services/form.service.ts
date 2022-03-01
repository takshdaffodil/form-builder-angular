import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  allFormControls: any[] = [];
  constructor(public http: HttpClient) {}

  getAvailableControls() {
    return this.http.get(`${environment.DEV_API_KEY}/availableControls`);
  }

  getFormControls() {
    return this.http.get(`${environment.DEV_API_KEY}/formdata`);
  }

  addToFormControl(control: any) {
    return this.http.post(`${environment.DEV_API_KEY}/formdata`, control);
  }

  updateDataInFormControl(index: number, data: any) {
    return this.http.put(`${environment.DEV_API_KEY}/formdata/${index}`, data);
  }

  deleteFormControlField(index: number) {
    return this.http.delete(`${environment.DEV_API_KEY}/formdata/${index}`);
  }

  saveCompleteForm(completeForm: any) {
    return this.http.post(
      `${environment.DEV_API_KEY}/savedForms`,
      completeForm
    );
  }

  uuidForForm() {
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
      /[xy]/g,
      function (c) {
        var r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16);
      }
    );
    return uuid;
  }

  modifyFormBeforeSaving(completeForm: any) {
    let modifiedForm: any = {};
    modifiedForm['actualForm'] = completeForm;
    modifiedForm['id'] = this.uuidForForm();
    modifiedForm['date'] = new Date().toLocaleDateString();
    return modifiedForm;
  }

  getAllSavedForms() {
    return this.http.get(`${environment.DEV_API_KEY}/savedForms`);
  }
}
