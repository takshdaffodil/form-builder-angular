import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormService } from 'src/app/shared/services/form.service';

@Component({
  selector: 'app-form-editor',
  templateUrl: './form-editor.component.html',
  styleUrls: ['./form-editor.component.css'],
})
export class FormEditorComponent {
  update = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public formservice: FormService,
    public dialogRef: MatDialogRef<FormEditorComponent>
  ) {
    if (data.update) {
      this.update = true;
    }
  }

  commonForm = new FormGroup({
    labelEdit: new FormControl(this.data.label),
    nameEdit: new FormControl(this.data.name),
    valueEdit: new FormControl(this.data.value),
  });
  checkboxForm = new FormGroup({
    labelEdit: new FormControl(this.data.label),
    nameEdit: new FormControl(this.data.name),
  });

  radioForm = new FormGroup({
    labelOne: new FormControl(this.data.label),
    labelTwo: new FormControl(this.data.labelTwo),
  });

  buttonForm = new FormGroup({
    valueEdit: new FormControl(this.data.value),
  });

  get label() {
    return this.commonForm.get('labelEdit')!;
  }
  get name() {
    return this.commonForm.get('nameEdit')!;
  }
  get value() {
    return this.commonForm.get('valueEdit')!;
  }

  onSubmit(event: any, type: string) {
    event.preventDefault();
    switch (this.data.controlType) {
      case 'checkbox':
        let dataToSubmit = {
          ...this.data,
          label: this.checkboxForm.get('labelEdit')?.value,
          name: this.checkboxForm.get('valueEdit')?.value,
        };
        if (this.update) {
          this.formservice.updateSavedFormControls(dataToSubmit);
        } else {
          this.formservice
            .updateDataInFormControl(dataToSubmit.id, dataToSubmit)
            .subscribe(() => {});
        }

        break;
      case 'radio':
        let radioFormData = {
          ...this.data,
          label: this.radioForm.get('labelOne')?.value,
          labelTwo: this.radioForm.get('labelTwo')?.value,
        };
        if (this.update) {
          this.formservice.updateSavedFormControls(radioFormData);
        } else {
          this.formservice
            .updateDataInFormControl(radioFormData.id, radioFormData)
            .subscribe(() => {});
        }
        break;

      case 'button':
        let buttonFormData = {
          ...this.data,
          value: this.buttonForm.get('valueEdit')?.value,
        };
        if (this.update) {
          this.formservice.updateSavedFormControls(buttonFormData);
        } else {
          this.formservice
            .updateDataInFormControl(buttonFormData.id, buttonFormData)
            .subscribe(() => {});
        }
        break;
      case 'textbox':
        this.updateFormField();
        break;
      case 'textarea':
        this.updateFormField();
        break;
      case 'password':
        this.updateFormField();
        break;
      case 'number':
        this.updateFormField();
        break;
    }
    this.dialogRef.close(true);
  }

  updateFormField() {
    let dataToSubmit = {
      ...this.data,
      label: this.label.value,
      name: this.name.value,
      value: this.value.value,
    };
    if (this.update) {
      this.formservice.updateSavedFormControls(dataToSubmit);
    } else {
      this.formservice
        .updateDataInFormControl(dataToSubmit.id, dataToSubmit)
        .subscribe(() => {});
    }
  }
}
