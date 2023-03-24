import { Box, Heading, Table, TableContainer, VStack } from '@chakra-ui/react';
import { useMemo } from 'react';
import { YEAR, MONTH, DAY } from '@common/consts';
import { IColumns, TableProps } from '@common/interface';
import AdminTableBody from './AdminTableBody';
import AdminTableHead from './AdminTableHead';
import Paginaton from '@components/Pagination';
import usePagination from '@hooks/usePagination';
import useOrderData from '@hooks/useOrderData';

function AdminTable({ todayData }: TableProps) {
  const { orderData } = useOrderData(todayData);

  const { goPrev, goNext, goPageNum, lastPage, currentPage, startIdx, lastIdx, pages } =
    usePagination(orderData.length, 50, 5);

  const columns = useMemo<IColumns[]>(
    () => [
      {
        header: '주문 번호',
        accessor: 'id',
        sortable: true,
      },
      {
        header: '거래일 & 거래 시간',
        accessor: 'transaction_time',
        sortable: true,
      },
      {
        header: '주문처리상태',
        accessor: 'status',
        sortable: false,
      },
      {
        header: '고객번호',
        accessor: 'customer_id',
        sortable: false,
      },
      {
        header: '고객이름',
        accessor: 'customer_name',
        sortable: false,
      },
      {
        header: '가격',
        accessor: 'currency',
        sortable: false,
      },
    ],
    []
  );

  return (
    <>
      <VStack
        bgColor={'white'}
        borderRadius="lg"
        p="5"
        justifyContent={'left'}
        backgroundColor="gray.100"
      >
        <Heading size={'md'} mb="5">
          오늘의 거래건 ({[YEAR, MONTH, DAY].join('-')})
        </Heading>
        <Box overflowY="auto" maxHeight="600px">
          <TableContainer minWidth={'900px'}>
            <Table aria-label="admin-table" variant={'striped'} colorScheme="blackAlpha">
              <AdminTableHead columns={columns} />
              <AdminTableBody todayData={orderData} />
            </Table>
          </TableContainer>
        </Box>
      </VStack>
      <Paginaton
        goPrev={goPrev}
        goNext={goNext}
        goPageNum={goPageNum}
        lastPage={lastPage}
        currentPage={currentPage}
        startIdx={startIdx}
        lastIdx={lastIdx}
        pages={pages}
      />
    </>
  );
}

export default AdminTable;
