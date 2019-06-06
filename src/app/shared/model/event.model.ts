import { UserModel } from './user.model';
import { EventType } from './enumeration/event-type';
import { EventStatus } from './enumeration/event-status';

export interface EventModel {
  id: number;
  title: string;
  description: string;
  type: EventType;
  extra: string; // candidate id
  status: EventStatus;
  ownerId: number;
  createdDate: string;
  flag: boolean;
}

export interface EventContentModel {
  data: EventModel;
  include: {
    user: UserModel;
  };
}
