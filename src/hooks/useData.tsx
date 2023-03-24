import { fetchData } from '@api/api';
import { useQuery } from 'react-query';
import { DAY, MONTH, YEAR } from '@common/consts';
import { IData } from '@common/interface';

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
