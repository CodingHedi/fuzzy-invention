/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import * as config from '@/shared/config/config';
import JobDetailComponent from '@/entities/job/job-details.vue';
import JobClass from '@/entities/job/job-details.component';
import JobService from '@/entities/job/job.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('Job Management Detail Component', () => {
    let wrapper: Wrapper<JobClass>;
    let comp: JobClass;
    let jobServiceStub: SinonStubbedInstance<JobService>;

    beforeEach(() => {
      jobServiceStub = sinon.createStubInstance<JobService>(JobService);

      wrapper = shallowMount<JobClass>(JobDetailComponent, { store, localVue, provide: { jobService: () => jobServiceStub } });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundJob = { id: 123 };
        jobServiceStub.find.resolves(foundJob);

        // WHEN
        comp.retrieveJob(123);
        await comp.$nextTick();

        // THEN
        expect(comp.job).toBe(foundJob);
      });
    });
  });
});
