import { copyArrayItem, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FormService } from 'src/app/shared/services/form.service';
import { DeleteFieldComponent } from '../delete-field/delete-field.component';
import { FormEditorComponent } from '../form-editor/form-editor.component';
import { SaveFormDialogComponent } from '../save-form-dialog/save-form-dialog.component';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.css'],
})
export class FormBuilderComponent implements OnInit {
  availableControls: any;
  formControls: any[] = [];
  formOnEdit: any;
  update: boolean = false;

  constructor(
    public formservice: FormService,
    public dialog: MatDialog,
    public router: Router,
    public snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.formservice.getAvailableControls().subscribe((res: any) => {
      this.availableControls = res;
    });

    this.fetchFormControl();
    this.fetchFormOnEdit();
  }

  fetchFormOnEdit() {
    this.formservice.getFormOnEdit().subscribe((res: any) => {
      if (res.length) {
        this.formOnEdit = res;
        this.update = res[0].update;
      }
    });
  }

  drop(event: any) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      this.formservice
        .updateDataInFormControl(
          event.container.data[event.currentIndex].id,
          event.container.data[event.previousIndex]
        )
        .subscribe(() => {
          this.formservice
            .updateDataInFormControl(
              event.container.data[event.previousIndex].id,
              event.container.data[event.currentIndex]
            )
            .subscribe(() => {
              this.fetchFormControl();
            });
        });
    } else {
      copyArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      this.updateFormControl(event.previousContainer.data[event.previousIndex]);
    }
  }

  fetchFormControl() {
    this.formservice.getFormControls().subscribe((res: any) => {
      this.formservice.allFormControls = res;
      this.formControls = res;
    });
  }

  updateFormControl(control: any) {
    this.formservice.addToFormControl(control).subscribe((res) => {
      this.fetchFormControl();
    });
  }

  openEditDialog(control: any) {
    const dialogRef = this.dialog.open(FormEditorComponent, { data: control });
    dialogRef.afterClosed().subscribe((res) => {
      this.fetchFormControl();
      if (res) {
        this.snackbar.open('Field updated!', 'OK!', {
          duration: 2000,
        });
      }
    });
  }

  openDeleteDialog(control: any) {
    const dialogRef = this.dialog.open(DeleteFieldComponent, { data: control });
    dialogRef.afterClosed().subscribe((res: any) => {
      this.fetchFormControl();
      if (res) {
        this.snackbar.open('Field deleted!', 'OK!', {
          duration: 2000,
        });
      }
    });
  }

  previewForm() {
    this.formservice.formToPreview = this.formControls;
    this.router.navigate(['preview-form']);
  }

  saveForm() {
    let data;
    if (this.update) {
      data = {
        ...this.formOnEdit[0],
        actualForm: this.formControls,
        update: true,
      };
    } else {
      data = this.formControls;
    }
    const dialogRef = this.dialog.open(SaveFormDialogComponent, {
      data: data,
    });
    dialogRef.afterClosed().subscribe((res: any) => {
      this.fetchFormControl();
      if (res) {
        this.snackbar.open(res, 'OK!', {
          duration: 3000,
        });
      }
    });
  }

  saveAndPreviewButtonDisabled() {
    return this.formControls.length <= 0;
  }
}
