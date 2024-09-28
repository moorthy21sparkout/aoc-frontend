export interface Initiative {
  id: string;
  name: string;
  start: string;
  end: string;
  identifier: string;
}
export interface PaginatedResponse{
  data: Initiative[];
  total: number;
  page: number;
  perPage:number
}
