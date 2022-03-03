import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FormService } from 'src/app/shared/services/form.service';
import { DeleteFieldComponent } from '../delete-field/delete-field.component';

@Component({
  selector: 'app-view-saved-forms',
  templateUrl: './view-saved-forms.component.html',
  styleUrls: ['./view-saved-forms.component.css'],
})
export class ViewSavedFormsComponent implements OnInit {
  constructor(
    public formservice: FormService,
    public router: Router,
    public snackbar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  displayedColumns = ['name', 'uuid', 'date', 'edit', 'preview', 'delete'];
  dataSource: any;

  ngOnInit(): void {
    this.fetchFormsData();
    this.formservice.emptyFormOnEdit();
    this.formservice.completelyEmptyFormControl();
  }

  fetchFormsData() {
    this.formservice.getAllSavedForms().subscribe((res) => {
      this.dataSource = res;
    });
  }

  editForm(data: any) {
    data['update'] = true;

    this.formservice.addToFormOnEdit(data).subscribe(() => {
      data.actualForm.forEach((item: any) => {
        this.formservice.addToFormControl(item).subscribe(() => {});
      });
      setTimeout(() => {
        this.router.navigate(['form-builder']);
      }, 1000);
    });
  }

  previewForm(data: any) {
    this.formservice.formToPreview = data.actualForm;
    this.router.navigate(['preview-form']);
  }

  deleteForm(data: any) {
    data['update'] = true;
    const dialogRef = this.dialog.open(DeleteFieldComponent, { data: data });
    dialogRef.afterClosed().subscribe((res: any) => {
      if (res) {
        this.fetchFormsData();
        this.snackbar.open('Form deleted!', 'OK!', { duration: 3000 });
      }
    });
  }
}
