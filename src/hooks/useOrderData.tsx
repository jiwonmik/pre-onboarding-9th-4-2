import { useSearchParams } from 'react-router-dom';
import { QueryStringKey } from '@common/order';
import { IData } from '@common/interface';
import usePagination from './usePagination';

function useOrderData(todayData: IData[]) {
  const [searchParams] = useSearchParams();
  const sortField = searchParams.get(QueryStringKey.SORT);
  const order = searchParams.get(QueryStringKey.ORDER);
  const status = searchParams.get(QueryStringKey.STATUS);
  const name = searchParams.get(QueryStringKey.NAME);

  const { startIdx, lastIdx } = usePagination(todayData.length, 50, 5);

  let orderData: IData[] = todayData;

  if (sortField) {
    orderData = [...todayData].sort((a, b) => {
      return (
        a[sortField as keyof IData]
          .toString()
          .localeCompare(b[sortField as keyof IData].toString(), 'en', {
            numeric: true,
          }) * (order === 'asc' || order == 'default' ? 1 : -1)
      );
    });
  }

  if (status) {
    switch (status) {
      case 'true':
        orderData = [...orderData.filter((data) => data.status)];
        break;
      case 'false':
        orderData = [...orderData.filter((data) => !data.status)];
        break;
      case 'all':
        orderData = [...orderData];
    }
  }

  if (name) {
    orderData = [
      ...orderData.filter((data) => data.customer_name.toLocaleLowerCase().includes(name)),
    ];
  }
  return { orderData };
}
export default useOrderData;
