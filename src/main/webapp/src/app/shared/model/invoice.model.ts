import {Moment} from "moment";
import {InvoiceItem} from "@app/shared/model/invoice-item.model";
import {PaymentType} from "@app/shared/model/enumeration/payment-type.model";
import {InvoiceStatusList} from "@app/shared/model/enumeration/invoice-status.model";


export class Invoice {
  id: number;
  paymentType: PaymentType;
  paymentDate: Moment;
  amount: number;
  tax: number;
  discount: number;
  total: number;
  trackingCode: string;
  referenceId: string;
  status: InvoiceStatusList;
  invoiceItem: InvoiceItem[];
  userId: number;
}
