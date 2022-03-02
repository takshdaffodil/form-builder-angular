import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { FormEditorComponent } from '../form-editor/form-editor.component';

@Component({
  selector: 'app-update-form',
  templateUrl: './update-form.component.html',
  styleUrls: ['./update-form.component.css'],
})
export class UpdateFormComponent {
  formControls: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    public updateDialogRef: MatDialogRef<UpdateFormComponent>
  ) {
    this.formControls = data.actualForm;
  }

  openEditDialog(control: any) {
    const dataToSend = {
      update: true,
      idToUpdate: this.data.id,
      ...control,
    };
    const dialogRef = this.dialog.open(FormEditorComponent, {
      data: dataToSend,
    });
    dialogRef.afterClosed().subscribe(() => {});
    // this.updateDialogRef.close();
  }
}
