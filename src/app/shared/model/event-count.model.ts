import { EventType } from './enumeration/event-type';

export interface EventCountModel {
    count: number;
    items: { count: number, type: EventType }[];
}
