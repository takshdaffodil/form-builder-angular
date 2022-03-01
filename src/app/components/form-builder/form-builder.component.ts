import { copyArrayItem, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormService } from 'src/app/shared/services/form.service';
import { DeleteFieldComponent } from '../delete-field/delete-field.component';
import { FormEditorComponent } from '../form-editor/form-editor.component';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.css'],
})
export class FormBuilderComponent implements OnInit {
  availableControls: any;
  formControls: any[] = [];
  constructor(
    public formservice: FormService,
    public dialog: MatDialog,
    public router: Router
  ) {}

  ngOnInit(): void {
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
      console.log(res);
    });
  }

  openEditDialog(control: any) {
    const dialogRef = this.dialog.open(FormEditorComponent, { data: control });
    dialogRef.afterClosed().subscribe(() => {
      this.fetchFormControl();
    });
  }

  openDeleteDialog(control: any) {
    const dialogRef = this.dialog.open(DeleteFieldComponent, { data: control });
    dialogRef.afterClosed().subscribe(() => {
      this.fetchFormControl();
    });
  }

  saveForm() {
    const formToSave = this.formservice.modifyFormBeforeSaving(
      this.formControls
    );
    this.formservice.saveCompleteForm(formToSave).subscribe(() => {
      console.log('Saved');
    });
  }
}
