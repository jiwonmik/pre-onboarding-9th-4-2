import { Flex, Skeleton, Stack } from '@chakra-ui/react';
import { LIMIT } from '@common/consts';
import useData from '@hooks/useData';
import Filter from '@components/Admin/AdminFilter';
import AdminTable from '@components/Admin/AdminTable';

function Admin() {
  const { isLoading, isError, error, todayData } = useData();

  if (isLoading) {
    return (
      <Flex aria-label="loading" justifyContent={'center'}>
        <Flex flexDir={'column'} w="800px">
          <Stack>
            {Array(LIMIT)
              .fill(0)
              .map((_, index) => (
                <Skeleton key={index} height="20px" />
              ))}
          </Stack>
        </Flex>
      </Flex>
    );
  }

  if (isError) {
    return <h2>{error?.message}</h2>;
  }

  return (
    <>
      <Flex aria-label="admin-page" justifyContent={'center'} height="900px">
        <Flex flexDir={'column'}>
          <Filter />
          <AdminTable todayData={todayData} />
        </Flex>
      </Flex>
    </>
  );
}

export default Admin;
