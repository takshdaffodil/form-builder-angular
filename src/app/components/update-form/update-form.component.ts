import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormService } from 'src/app/shared/services/form.service';
import { FormEditorComponent } from '../form-editor/form-editor.component';

@Component({
  selector: 'app-update-form',
  templateUrl: './update-form.component.html',
  styleUrls: ['./update-form.component.css'],
})
export class UpdateFormComponent implements OnInit {
  formControls: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    public updateDialogRef: MatDialogRef<UpdateFormComponent>,
    public formservice: FormService,
    public snackbar: MatSnackBar
  ) {}

  ngOnInit() {
    this.formControls = this.data.actualForm;
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
    dialogRef.afterClosed().subscribe((fieldUpdated: boolean) => {
      this.formservice.getaSavedForm(this.data.id).subscribe((res: any) => {
        this.formControls = res.actualForm;
        if (fieldUpdated) {
          this.snackbar.open('Field updated!', 'OK!', { duration: 3000 });
        }
      });
    });
    // this.updateDialogRef.close();
  }
}
