import { copyArrayItem, moveItemInArray } from '@angular/cdk/drag-drop';
import { formatPercent } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
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
    public snackbar: MatSnackBar,
    public activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.formControls = [];
    this.formservice.getAvailableControls().subscribe((res: any) => {
      this.availableControls = res;
    });

    this.fetchFormControl();
  }

  drop(event: any) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      console.log(this.formControls);
    } else {
      copyArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      this.formControls[event.currentIndex]['id'] =
        this.formservice.uuidForForm();
    }
  }

  fetchFormControl() {
    this.formservice.formToPreview.subscribe((res: any[]) => {
      if (res) {
        this.formControls = res;
      }
    });
    this.activatedRoute.queryParams.subscribe((res: any) => {
      if (res && res.id) {
        this.formservice.getaSavedForm(res.id).subscribe((controls: any) => {
          this.formControls = controls.actualForm;
          this.formOnEdit = controls;
          this.update = true;
        });
      }
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
      if (res && res.edit) {
        const controlToEditIndex = this.formControls.findIndex(
          (controls) => controls.id === res.id
        );
        this.formControls.splice(controlToEditIndex, 1, res.editedData);
        this.snackbar.open('Field updated!', 'OK!', {
          duration: 2000,
        });
      }
    });
  }

  openDeleteDialog(control: any) {
    const dialogRef = this.dialog.open(DeleteFieldComponent, { data: control });
    dialogRef.afterClosed().subscribe((res: any) => {
      if (res.delete) {
        const controlToDeleteIndex = this.formControls.findIndex(
          (controls) => controls.id === res.id
        );
        this.formControls.splice(controlToDeleteIndex, 1);
        this.snackbar.open('Field deleted!', 'OK!', {
          duration: 2000,
        });
      }
    });
  }

  previewForm() {
    this.formservice.formToPreview.next({
      actualForm: this.formControls,
      id: null,
    });
    this.router.navigate(['preview-form']);
  }

  clearForm() {
    this.formControls = [];
  }

  saveForm() {
    let data;
    if (this.update) {
      data = {
        ...this.formOnEdit,
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
      if (res && (res.edit || res.save)) {
        this.formControls = [];
        this.snackbar.open(res.message, 'OK!', {
          duration: 3000,
        });
      }
    });
  }

  saveAndPreviewButtonDisabled() {
    return this.formControls.length <= 0;
  }

  routeToFormTable() {
    this.clearForm();
    this.formservice.formToPreview.next([]);
    this.router.navigate(['view-forms']);
  }
}
