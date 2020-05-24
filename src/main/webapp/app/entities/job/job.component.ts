import { mixins } from 'vue-class-component';

import { Component, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IJob } from '@/shared/model/job.model';
import AlertMixin from '@/shared/alert/alert.mixin';

import JobService from './job.service';

@Component
export default class Job extends mixins(Vue2Filters.mixin, AlertMixin) {
  @Inject('jobService') private jobService: () => JobService;
  private removeId: number = null;
  public itemsPerPage = 20;
  public queryCount: number = null;
  public page = 1;
  public previousPage = 1;
  public propOrder = 'id';
  public reverse = false;
  public totalItems = 0;

  public jobs: IJob[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllJobs();
  }

  public clear(): void {
    this.page = 1;
    this.retrieveAllJobs();
  }

  public retrieveAllJobs(): void {
    this.isFetching = true;

    const paginationQuery = {
      page: this.page - 1,
      size: this.itemsPerPage,
      sort: this.sort(),
    };
    this.jobService()
      .retrieve(paginationQuery)
      .then(
        res => {
          this.jobs = res.data;
          this.totalItems = Number(res.headers['x-total-count']);
          this.queryCount = this.totalItems;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
        }
      );
  }

  public prepareRemove(instance: IJob): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeJob(): void {
    this.jobService()
      .delete(this.removeId)
      .then(() => {
        const message = 'A Job is deleted with identifier ' + this.removeId;
        this.alertService().showAlert(message, 'danger');
        this.getAlertFromStore();
        this.removeId = null;
        this.retrieveAllJobs();
        this.closeDialog();
      });
  }

  public sort(): Array<any> {
    const result = [this.propOrder + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.propOrder !== 'id') {
      result.push('id');
    }
    return result;
  }

  public loadPage(page: number): void {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.transition();
    }
  }

  public transition(): void {
    this.retrieveAllJobs();
  }

  public changeOrder(propOrder): void {
    this.propOrder = propOrder;
    this.reverse = !this.reverse;
    this.transition();
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}
