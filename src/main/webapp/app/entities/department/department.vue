<template>
    <div>
        <h2 id="page-heading">
            <span id="department-heading">Departments</span>
            <router-link :to="{name: 'DepartmentCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-department">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span >
                    Create a new Department
                </span>
            </router-link>
        </h2>
        <b-alert :show="dismissCountDown"
            dismissible
            :variant="alertType"
            @dismissed="dismissCountDown=0"
            @dismiss-count-down="countDownChanged">
            {{alertMessage}}
        </b-alert>
        <br/>
        <div class="alert alert-warning" v-if="!isFetching && departments && departments.length === 0">
            <span>No departments found</span>
        </div>
        <div class="table-responsive" v-if="departments && departments.length > 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th><span>ID</span></th>
                    <th><span>Department Name</span></th>
                    <th><span>Location</span></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="department in departments"
                    :key="department.id">
                    <td>
                        <router-link :to="{name: 'DepartmentView', params: {departmentId: department.id}}">{{department.id}}</router-link>
                    </td>
                    <td>{{department.departmentName}}</td>
                    <td>
                        <div v-if="department.location">
                            <router-link :to="{name: 'LocationView', params: {locationId: department.location.id}}">{{department.location.id}}</router-link>
                        </div>
                    </td>
                    <td class="text-right">
                        <div class="btn-group">
                            <router-link :to="{name: 'DepartmentView', params: {departmentId: department.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline">View</span>
                            </router-link>
                            <router-link :to="{name: 'DepartmentEdit', params: {departmentId: department.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(department)"
                                   variant="danger"
                                   class="btn btn-sm"
                                   v-b-modal.removeEntity>
                                <font-awesome-icon icon="times"></font-awesome-icon>
                                <span class="d-none d-md-inline">Delete</span>
                            </b-button>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <b-modal ref="removeEntity" id="removeEntity" >
            <span slot="modal-title"><span id="bonAppHediApp.department.delete.question">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-department-heading">Are you sure you want to delete this Department?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-department" v-on:click="removeDepartment()">Delete</button>
            </div>
        </b-modal>
    </div>
</template>

<script lang="ts" src="./department.component.ts">
</script>
