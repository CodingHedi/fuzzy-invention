<template>
    <div>
        <h2 id="page-heading">
            <span id="country-heading">Countries</span>
            <router-link :to="{name: 'CountryCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-country">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span >
                    Create a new Country
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
        <div class="alert alert-warning" v-if="!isFetching && countries && countries.length === 0">
            <span>No countries found</span>
        </div>
        <div class="table-responsive" v-if="countries && countries.length > 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th><span>ID</span></th>
                    <th><span>Country Name</span></th>
                    <th><span>Region</span></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="country in countries"
                    :key="country.id">
                    <td>
                        <router-link :to="{name: 'CountryView', params: {countryId: country.id}}">{{country.id}}</router-link>
                    </td>
                    <td>{{country.countryName}}</td>
                    <td>
                        <div v-if="country.region">
                            <router-link :to="{name: 'RegionView', params: {regionId: country.region.id}}">{{country.region.id}}</router-link>
                        </div>
                    </td>
                    <td class="text-right">
                        <div class="btn-group">
                            <router-link :to="{name: 'CountryView', params: {countryId: country.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline">View</span>
                            </router-link>
                            <router-link :to="{name: 'CountryEdit', params: {countryId: country.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(country)"
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
            <span slot="modal-title"><span id="bonAppHediApp.country.delete.question">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-country-heading">Are you sure you want to delete this Country?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-country" v-on:click="removeCountry()">Delete</button>
            </div>
        </b-modal>
    </div>
</template>

<script lang="ts" src="./country.component.ts">
</script>
