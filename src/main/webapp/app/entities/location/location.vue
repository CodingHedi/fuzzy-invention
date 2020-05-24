<template>
    <div>
        <h2 id="page-heading">
            <span id="location-heading">Locations</span>
            <router-link :to="{name: 'LocationCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-location">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span >
                    Create a new Location
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
        <div class="alert alert-warning" v-if="!isFetching && locations && locations.length === 0">
            <span>No locations found</span>
        </div>
        <div class="table-responsive" v-if="locations && locations.length > 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th><span>ID</span></th>
                    <th><span>Street Address</span></th>
                    <th><span>Postal Code</span></th>
                    <th><span>City</span></th>
                    <th><span>State Province</span></th>
                    <th><span>Country</span></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="location in locations"
                    :key="location.id">
                    <td>
                        <router-link :to="{name: 'LocationView', params: {locationId: location.id}}">{{location.id}}</router-link>
                    </td>
                    <td>{{location.streetAddress}}</td>
                    <td>{{location.postalCode}}</td>
                    <td>{{location.city}}</td>
                    <td>{{location.stateProvince}}</td>
                    <td>
                        <div v-if="location.country">
                            <router-link :to="{name: 'CountryView', params: {countryId: location.country.id}}">{{location.country.id}}</router-link>
                        </div>
                    </td>
                    <td class="text-right">
                        <div class="btn-group">
                            <router-link :to="{name: 'LocationView', params: {locationId: location.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline">View</span>
                            </router-link>
                            <router-link :to="{name: 'LocationEdit', params: {locationId: location.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(location)"
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
            <span slot="modal-title"><span id="bonAppHediApp.location.delete.question">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-location-heading">Are you sure you want to delete this Location?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-location" v-on:click="removeLocation()">Delete</button>
            </div>
        </b-modal>
    </div>
</template>

<script lang="ts" src="./location.component.ts">
</script>
