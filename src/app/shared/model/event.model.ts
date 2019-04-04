import { EventType } from "@app/shared/model/enumeration/event-type.model";
import { EventStatus } from "@app/shared/model/enumeration/event-status.model";
import { UserModel } from './user.model';

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
