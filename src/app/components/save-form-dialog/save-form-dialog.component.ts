import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormService } from 'src/app/shared/services/form.service';

@Component({
  selector: 'app-save-form-dialog',
  templateUrl: './save-form-dialog.component.html',
  styleUrls: ['./save-form-dialog.component.css'],
})
export class SaveFormDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public formservice: FormService,
    public dialogRef: MatDialogRef<SaveFormDialogComponent>
  ) {
    console.log(data);
  }

  saveForm = new FormGroup({
    name: new FormControl(this.data.update ? this.data.name : '', [
      Validators.minLength(3),
    ]),
  });

  get name() {
    return this.saveForm.get('name')?.value;
  }

  saveFormToDb(event: any) {
    event.preventDefault();
    if (this.data.update) {
      this.data.name = this.name;
      this.formservice.editAndSavFormOnEdit(this.data).subscribe(() => {
        this.emptyFormAfterSave();
        this.formservice.emptyFormOnEdit();
        this.dialogRef.close('Form updated!');
      });
      console.log('edited');
    } else {
      const formToSave = this.formservice.modifyFormBeforeSaving(
        this.saveForm.value,
        this.data
      );
      this.formservice.saveCompleteForm(formToSave).subscribe(() => {
        console.log('Saved');
        this.emptyFormAfterSave();
        this.dialogRef.close('Form saved!');
      });
    }
  }

  emptyFormAfterSave() {
    let formControlToDelete;
    if (this.data.update) {
      console.log('dj', this.data);
      formControlToDelete = this.data.actualForm;
    } else {
      formControlToDelete = this.data;
    }
    console.log('her', formControlToDelete);
    // delete this.data.update;
    formControlToDelete.map((field: any) => {
      this.formservice.emptyFormControl(field.id).subscribe((res) => {
        console.log(res);
      });
    });
  }
}
