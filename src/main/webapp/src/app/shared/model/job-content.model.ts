import { Job } from './job.model';
import { Include } from './candidate-schedule/candidate-schedule-vm.model';

export interface JobContentModel {
    data: Job;
    include: Include;
}
