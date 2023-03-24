import { PaginationType } from '@common/interface';
import { Nav, PageButton } from './styled';

function Paginaton({ goPrev, goNext, goPageNum, lastPage, currentPage, pages }: PaginationType) {
  return (
    <Nav>
      <PageButton role="button" onClick={goPrev} disabled={currentPage === 1}>
        &lt;
      </PageButton>
      {pages.map((page) => (
        <PageButton
          role="button"
          key={page}
          onClick={() => goPageNum(page)}
          aria-current={page === currentPage ? 'true' : undefined}
        >
          {page}
        </PageButton>
      ))}
      <PageButton role={'button'} onClick={goNext} disabled={currentPage === lastPage}>
        &gt;
      </PageButton>
    </Nav>
  );
}
export default Paginaton;
