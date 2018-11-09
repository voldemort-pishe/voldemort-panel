import {EventType} from "@app/shared/model/enumeration/event-type.model";
import {EventStatus} from "@app/shared/model/enumeration/event-status.model";

export class Event {
  id: number;
  title: string;
  description: string;
  type: EventType;
  extra: string;
  status: EventStatus;
  ownerId: number;
  createdDate: Date;
}
