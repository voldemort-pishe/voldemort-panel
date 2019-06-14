import { InvoiceItemModel } from "@app/shared/model/invoice-item.model";
import { PaymentType } from './enumeration/payment-type';
import { InvoiceStatus } from './enumeration/invoice-status';
import { CompanyModel } from './company.model';

export interface InvoiceModel {
  id: number;
  createdDate: string;
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

export interface InvoiceContentModel {
  data: InvoiceModel;
  include: {
    company: CompanyModel;
  };
}
