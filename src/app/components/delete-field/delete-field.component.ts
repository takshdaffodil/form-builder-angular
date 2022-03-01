import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormService } from 'src/app/shared/services/form.service';

@Component({
  selector: 'app-delete-field',
  templateUrl: './delete-field.component.html',
  styleUrls: ['./delete-field.component.css'],
})
export class DeleteFieldComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public formservice: FormService,
    public dialogRef: MatDialogRef<DeleteFieldComponent>
  ) {}

  ngOnInit(): void {}

  deleteField(event: any) {
    event.preventDefault();
    this.formservice.deleteFormControlField(this.data.id).subscribe(() => {
      console.log('field deleted');
    });
    this.dialogRef.close();
  }
}
