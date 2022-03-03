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
  ) {}

  saveForm = new FormGroup({
    name: new FormControl('', [Validators.minLength(3)]),
  });

  saveFormToDb(event: any) {
    event.preventDefault();
    const formToSave = this.formservice.modifyFormBeforeSaving(
      this.saveForm.value,
      this.data
    );
    this.formservice.saveCompleteForm(formToSave).subscribe(() => {
      console.log('Saved');
      this.emptyFormAfterSave();
      this.dialogRef.close();
    });
  }

  emptyFormAfterSave() {
    let formControlToDelete = this.data;
    formControlToDelete.map((field: any) => {
      this.formservice.emptyFormControl(field.id).subscribe((res) => {
        console.log(res);
      });
    });
  }
}
