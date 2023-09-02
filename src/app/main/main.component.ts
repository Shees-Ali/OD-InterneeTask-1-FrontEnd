import { Component, Injector, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BasePage } from '../base/base';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { AddTaskComponent } from '../components/add-task/add-task.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent extends BasePage implements OnInit {
  // FontAwesome icons for sorting indicators
  faCaretDown = faCaretDown;
  faCaretUp = faCaretUp;

  tasks: any[] = [];
  search: string = '';
  sortBy: string = 'taskName'; // Change this to your desired default sorting field
  order: string = 'ascending';
  pageNumber: number = 1;
  pageSize: number = 5;
  disableForward: boolean = false;

  constructor(injector: Injector, private modalService: NgbModal) {
    super(injector);
  }

  ngOnInit(): void {
    this.getAllTasks();
  }

  // Function for getting all tasks
  async getAllTasks() {
    const params = {
      search: this.search,
      sortBy: this.sortBy,
      order: this.order,
      page: this.pageNumber,
      pageSize: this.pageSize,
    };
    const tasks = await this.network.getTasksList(params);
    if (tasks.length < this.pageSize) {
      this.disableForward = true;
    } else {
      this.disableForward = false;
    }
    if (tasks.length === 0) {
      return;
    }
    this.tasks = tasks.data;
    console.log(this.tasks);
  }

  // Function for updating Filters for Task List
  updateFilters(sortBy: string, order: string) {
    this.sortBy = sortBy;
    this.order = order;
    this.getAllTasks();
  }

  // Function for updating Page size for pagination
  changePageSize($event: any) {
    const value = $event.target.value;
    this.pageSize = value;
    this.getAllTasks();
  }

  // Opens add task modal
  addTask() {
    const modalRef = this.modalService.open(AddTaskComponent, {
      centered: true,
      backdrop: 'static',
    });
    modalRef.result
      .then((res) => {
        if (res.task_id) {
          this.getAllTasks();
        }
      })
      .catch((err) => {});
  }

  // Opens edit task modal
  editTask(task: any) {
    const modalRef = this.modalService.open(AddTaskComponent, {
      centered: true,
      backdrop: 'static',
    });
    modalRef.componentInstance.task = task;
    modalRef.result
      .then((res) => {
        if (res.task_id) {
          this.getAllTasks();
        }
      })
      .catch((err) => {});
  }

  // Deletes Task and asks for confirmation
  deleteTask(task_id: any) {
    this.utility.presentConfirm().then(async (res: any) => {
      if (res.isConfirmed) {
        await this.network.deleteTask(task_id);
        this.utility.presentSuccessAlert('Successfully Deleted Task.');
        this.getAllTasks();
      }
    });
  }

  // Paginates in the forward or backward direction
  paginate(direction: string) {
    if (direction == 'forward') {
      this.pageNumber++;
    } else if (direction == 'backward') {
      this.pageNumber--;
    }
    this.getAllTasks();
  }
}
