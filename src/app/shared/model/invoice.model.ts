import { InvoiceItemModel } from "@app/shared/model/invoice-item.model";
import { PaymentType } from './enumeration/payment-type';
import { InvoiceStatus } from './enumeration/invoice-status';

export interface InvoiceModel {
  id: number;
  paymentType: PaymentType;
  paymentDate: string;
  amount: number;
  tax: number;
  discount: number;
  total: number;
  trackingCode: string;
  referenceId: string;
  status: InvoiceStatus;
  invoiceItem: InvoiceItemModel[];
  userId: number;
}
