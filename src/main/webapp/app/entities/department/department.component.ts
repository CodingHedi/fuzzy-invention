import { mixins } from 'vue-class-component';

import { Component, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IDepartment } from '@/shared/model/department.model';
import AlertMixin from '@/shared/alert/alert.mixin';

import DepartmentService from './department.service';

@Component
export default class Department extends mixins(Vue2Filters.mixin, AlertMixin) {
  @Inject('departmentService') private departmentService: () => DepartmentService;
  private removeId: number = null;

  public departments: IDepartment[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllDepartments();
  }

  public clear(): void {
    this.retrieveAllDepartments();
  }

  public retrieveAllDepartments(): void {
    this.isFetching = true;

    this.departmentService()
      .retrieve()
      .then(
        res => {
          this.departments = res.data;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
        }
      );
  }

  public prepareRemove(instance: IDepartment): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeDepartment(): void {
    this.departmentService()
      .delete(this.removeId)
      .then(() => {
        const message = 'A Department is deleted with identifier ' + this.removeId;
        this.alertService().showAlert(message, 'danger');
        this.getAlertFromStore();
        this.removeId = null;
        this.retrieveAllDepartments();
        this.closeDialog();
      });
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}
