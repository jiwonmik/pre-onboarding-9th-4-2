import { useSearchParams } from 'react-router-dom';
import { PaginationType } from '@common/interface';

// total : 전체 데이터 수
// limit: 한 페이지 당 보여질 데이터 개수
// pageNumCnt: 한 블럭 당 페이지 수

export default function usePagination(
  total: number,
  limit: number,
  pageNumCnt: number
): PaginationType {
  const [searchParams, setSearchParams] = useSearchParams();

  // 현재 페이지
  const currentPage = searchParams.get('page') ? Number(searchParams.get('page')) : 1;
  // 전체 페이지 수 (마지막 페이지 번호)
  const lastPage = Math.ceil(total / limit);
  // 현재 블럭 번호
  const nowBlock = Math.ceil((currentPage as number) / pageNumCnt);
  // 블럭당 시작 페이지 번호
  const startpageNumCnt = (nowBlock - 1) * pageNumCnt + 1;
  // 블럭당 마지막 페이지 번호
  let endpageNumCnt = nowBlock * pageNumCnt;
  if (endpageNumCnt > lastPage) endpageNumCnt = lastPage;
  //해당 페이지의 글 시작 번호
  const startIdx = (currentPage - 1) * limit;
  // 현재 페이지의 게시물 마지막 인덱스
  const lastIdx = startIdx + limit - 1;

  const pages = [...Array(endpageNumCnt - startpageNumCnt + 1).keys()].map(
    (value) => (value += startpageNumCnt)
  );

  const goPrev = () => {
    searchParams.set('page', (currentPage - 1).toString());
    setSearchParams(searchParams);
  };

  const goNext = () => {
    searchParams.set('page', (currentPage + 1).toString());
    setSearchParams(searchParams);
  };

  const goPageNum = (value: number) => {
    searchParams.set('page', value.toString());
    setSearchParams(searchParams);
  };

  return {
    goPrev,
    goNext,
    goPageNum,
    lastPage,
    currentPage,
    startIdx,
    lastIdx,
    pages,
  };
}
