import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  allFormControls: any[] = [];
  formToPreview: any[] = [];
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

  modifyFormBeforeSaving(formName: any, completeForm: any) {
    let modifiedForm: any = {};
    modifiedForm['actualForm'] = completeForm;
    modifiedForm['id'] = this.uuidForForm();
    modifiedForm['date'] = new Date().toLocaleDateString();
    modifiedForm['name'] = formName.name;
    return modifiedForm;
  }

  getAllSavedForms() {
    return this.http.get(`${environment.DEV_API_KEY}/savedForms`);
  }

  emptyFormControl(id: number) {
    return this.http.delete(`${environment.DEV_API_KEY}/formdata/${id}`);
  }

  deleteSavedForm(id: string) {
    return this.http.delete(`${environment.DEV_API_KEY}/savedForms/${id}`);
  }

  updateSavedFormControls(data: any) {
    let id = data.idToUpdate;

    delete data.idToUpdate;
    delete data.update;
    let actualForm: any[];
    this.getaSavedForm(id).subscribe((res: any) => {
      actualForm = res.actualForm;
      let index: number = actualForm.findIndex(
        (item: any) => item.id === data.id
      );
      actualForm.splice(index, 1, data);
      console.log(actualForm);
      this.http
        .patch(`${environment.DEV_API_KEY}/savedForms/${id}`, { actualForm })
        .subscribe(() => {
          console.log('Saved form updated');
        });
    });
  }

  getaSavedForm(id: string) {
    return this.http.get(`${environment.DEV_API_KEY}/savedForms/${id}`);
  }
}

interface controlType {
  name: string;
  label: string;
  value: string;
  id: string;
}
