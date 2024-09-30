export interface Initiative {
  _id: string;
  initiative: string;
  start_period: string;
  end_period: string;
  identifier: string;
}
export interface PaginatedResponse{
  data: Initiative[];
  total: number;
  page: number;
  perPage:number
}
