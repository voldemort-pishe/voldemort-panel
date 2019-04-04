import { InvoiceItemModel } from "@app/shared/model/invoice-item.model";
import { PaymentType } from "@app/shared/model/enumeration/payment-type.model";
import { InvoiceStatusList } from "@app/shared/model/enumeration/invoice-status.model";

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
  status: InvoiceStatusList;
  invoiceItem: InvoiceItemModel[];
  userId: number;
}
