import {Moment} from "moment";
import {InvoiceItem} from "@app/shared/model/invoice-item.model";

enum PaymentType {
  PASARGARD = "پاسارگارد",
  SAMAN = "سامان",
  ZARINPAL = "زرین پال",
}

enum InvoiceStatus {
  SUCCESS,
  FAILED,
  INITIALIZED
}

export class Invoice {
  paymentType: PaymentType;
  paymentDate: Moment;
  amount: number;
  tax: number;
  discount: number;
  total: number;
  trackingCode: string;
  referenceId: string;
  status: InvoiceStatus;
  invoiceItem: InvoiceItem[];
  userId: number;
}
