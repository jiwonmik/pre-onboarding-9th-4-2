import { fetchData } from '@api/api';
import { useQuery } from 'react-query';
import { IData } from '@common/interface';
import { YEAR, MONTH, DAY } from '@common/consts';

function useSortableTable() {
  const { isLoading, isError, data, error } = useQuery<IData[], Error>('switchone', fetchData, {
    refetchInterval: 5000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  const isToday = (datetime: string) => {
    const [year, month, day] = datetime.split(' ')[0].split('-');
    return YEAR == year && MONTH == month && DAY == day;
  };

  const todayData = data ? data.filter((dataArray) => isToday(dataArray.transaction_time)) : [];

  return { isLoading, isError, todayData, error };
}

export default useSortableTable;
