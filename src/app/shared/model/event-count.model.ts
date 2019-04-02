import { EventType } from './enumeration/event-type.model';

export interface EventCountModel {
    count: number;
    items: {
        count: number;
        type: EventType;
    }[];
}
