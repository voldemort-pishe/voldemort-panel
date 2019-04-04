export interface InvoiceItemModel {
  id: number;
  title: string;
  count: number;
  price: number;
  total: number;
  invoiceId: number;
}
