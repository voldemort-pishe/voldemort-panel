import { EventType } from "@app/shared/model/enumeration/event-type.model";
import { EventStatus } from "@app/shared/model/enumeration/event-status.model";
import { UserModel } from './user.model';

export class EventModel {
  id: number;
  title: string;
  description: string;
  type: EventType;
  extra: string;
  status: EventStatus;
  ownerId: number;
  createdDate: string;
  flag: boolean;
}

export class EventContentModel {
  data: EventModel;
  include: {
    user: UserModel;
  };
}
