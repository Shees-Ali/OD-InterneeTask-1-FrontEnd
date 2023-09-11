import { Component, Injector, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BasePage } from 'src/app/base/base';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss'],
})
export class TaskDetailsComponent extends BasePage implements OnInit {
  @Input() task_id: any;
  task: any;
  isInProcess: boolean = false;
  showSummary: boolean = false;
  summarizedDescription: string = '';
  constructor(injector: Injector, public activeModal: NgbActiveModal) {
    super(injector);
  }

  async ngOnInit(): Promise<void> {
    await this.getTaskDetails();
  }

  // Function that calls the API for getting task details
  async getTaskDetails() {
    this.isInProcess = true;
    const response = await this.network.getTaskDetail(this.task_id);
    this.task = response.data;
    console.log(response);
    this.isInProcess = false;
  }

  // Toggles summary of description
  async toggleSummary() {
    this.showSummary = !this.showSummary;
    if (this.showSummary) {
      if (!this.summarizedDescription || this.summarizedDescription == '') {
        const res = await this.network.summarize(this.task.taskDescription);
        if (res.summaryResponse.hasValue == true) {
          const summary = res.summaryResponse.value[0];
          if (!summary.hasError) {
            console.log(summary);
            let highestRank = -1;
            summary[0].sentences.forEach((element: any) => {
              console.log(element);
              if (element.rankScore > highestRank) {
                highestRank = element.rankScore;
                this.summarizedDescription = element.text;
              }
            });
          }
        }
      }
    }
  }

  // Function for closing the Modal.
  async dismiss() {
    this.activeModal.dismiss();
  }
}
