import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
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
    public dialogRef: MatDialogRef<SaveFormDialogComponent>,
    public router: Router
  ) {
    console.log(data);
  }

  saveForm = new FormGroup({
    name: new FormControl(this.data.update ? this.data.name : '', [
      Validators.minLength(3),
      Validators.required,
    ]),
  });

  get name() {
    return this.saveForm.get('name')?.value;
  }

  saveFormToDb(event: any) {
    if (this.saveForm.valid) {
      event.preventDefault();
      if (this.data.update) {
        this.data.name = this.name;
        this.formservice.editAndSavFormOnEdit(this.data).subscribe(() => {
          this.dialogRef.close({ message: 'Form updated!', edit: true });
          this.router.navigate(['view-forms']);
        });
        console.log('edited');
      } else {
        const formToSave = this.formservice.modifyFormBeforeSaving(
          this.saveForm.value,
          this.data
        );
        this.formservice.saveCompleteForm(formToSave).subscribe(() => {
          console.log('Saved');
          this.dialogRef.close({ message: 'Form saved!', save: true });
          this.router.navigate(['view-forms']);
        });
      }
    }
  }
}
