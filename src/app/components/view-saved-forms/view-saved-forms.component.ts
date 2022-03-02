import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FormService } from 'src/app/shared/services/form.service';
import { UpdateFormComponent } from '../update-form/update-form.component';
// import { UpdateFormComponent } from '../update-form/update-form.component';

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
  }

  fetchFormsData() {
    this.formservice.getAllSavedForms().subscribe((res) => {
      this.dataSource = res;
    });
  }

  editForm(data: any) {
    data['update'] = true;
    const dialogRef = this.dialog.open(UpdateFormComponent, {
      data: data,
      width: '100vw',
      height: '100vh',
      maxWidth: '100vw',
    });
    dialogRef.afterClosed().subscribe(() => {
      this.snackbar.open('Form update!', 'OK!', { duration: 1500 });
      this.fetchFormsData();
    });
  }

  previewForm(data: any) {
    this.formservice.formToPreview = data.actualForm;
    this.router.navigate(['preview-form']);
  }

  deleteForm(data: any) {
    this.formservice.deleteSavedForm(data.id).subscribe(() => {
      console.log('form deleted');
      this.fetchFormsData();
      this.snackbar.open('Form deleted!', 'OK!', {
        duration: 2000,
      });
    });
  }
}
