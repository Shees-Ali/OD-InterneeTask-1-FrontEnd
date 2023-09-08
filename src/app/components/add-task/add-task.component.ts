import { Component, Injector, Input, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BasePage } from 'src/app/base/base';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent extends BasePage implements OnInit {
  // Uses FormGroup to manage the input of Data and simple validations.
  addTaskForm: FormGroup<any>;
  // Takes Input from the NgbModal reference if Task is in Edit.
  @Input() task: any;
  // Task ID set in ngOnInit for use when updating.
  taskID: any;
  // Disable save button when this is true
  isInProcess: boolean = false;
  constructor(injector: Injector, public activeModal: NgbActiveModal) {
    super(injector);
    this.addTaskForm = this.formBuilder.group({
      taskName: ['', Validators.required],
      taskDescription: ['', Validators.required],
      taskType: ['', Validators.required],
      taskStatus: ['', Validators.required],
      taskTags: [''],
      taskDate: ['TBD', Validators.required],
    });
  }

  ngOnInit() {
    if (this.task) {
      this.taskID = this.task.id;
      delete this.task.id;
      delete this.task.createdAt;
      this.addTaskForm.setValue(this.task);
    }
  }

  // Function called when focus is shifted from description feild
  async onDescriptionUpdate($event) {
    console.log($event.target.value);
    const value = $event.target.value;
    this.getTagsforDescription(value);
  }

  // Function for getting the tags for description and populating them
  async getTagsforDescription(description: string) {
    this.isInProcess = true;
    const res = await this.network.getTags(description);
    if (res.enitityRecognitionResult?.hasValue) {
      const tags = res.enitityRecognitionResult?.value;
      console.log(tags);
      if (tags.length > 0) {
        tags.forEach((element: any) => {
          let value = this.addTaskForm.controls['taskTags'].value;
          value += element.text + ', ';
          this.addTaskForm.controls['taskTags'].setValue(value);
        });
      }
    }
    this.isInProcess = false;
  }

  // Function that calls the API for adding or editing a task and displays appropriate Messages.
  async save() {
    if (!this.addTaskForm.valid) {
      this.utility.presentFailureAlert('Please Fill All Fields !', true);
      return;
    }
    this.isInProcess = true;
    if (this.taskID) {
      const formValue = this.addTaskForm.value;
      const res = await this.network.updateTask(this.taskID, formValue);
      this.isInProcess = false;
      this.activeModal.close({
        task_id: this.taskID,
      });
      this.utility.presentSuccessAlert('Successfully Updated Task !');
    } else {
      const formValue = this.addTaskForm.value;
      const res = await this.network.addTask(formValue);
      this.isInProcess = false;
      if (res && res.data) {
        this.activeModal.close({
          task_id: res.data,
        });
        this.utility.presentSuccessAlert('Successfully Added Task !');
      }
    }
  }

  // Function for closing the Modal, shows a confirmation if data is filled, i.e., form is touched only in add mode.
  async dismiss(reason: string) {
    if (this.addTaskForm.touched && !this.taskID) {
      const res = await this.utility.presentConfirm(
        'If you quit, data that you have entered will be lost',
        'Yes, Quit'
      );
      if (!res) {
        return;
      }
    }
    this.activeModal.dismiss(reason);
  }
}
