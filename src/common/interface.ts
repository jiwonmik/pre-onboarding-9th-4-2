export interface IData {
  id: number; // 주문번호
  transaction_time: string; // 거래시간
  status: boolean; // 주문처리상태
  customer_id: number; // 고객번호
  customer_name: string; // 고객이름
  currency: string; // 가격
}

export interface IColumns {
  header: string;
  accessor: string;
  sortable: boolean;
}

export interface TableProps {
  todayData: IData[];
}

export interface TableHeadProps {
  columns: IColumns[];
}

export interface PaginationProps {
  goPrev: () => void;
  goNext: () => void;
  goPageNum: (value: number) => void;
  lastPage: number;
  currentPage: number;
  pages: number[];
}

export interface PaginationType extends PaginationProps {
  startIdx: number;
  lastIdx: number;
}
