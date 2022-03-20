import { useMemo } from "react";

// Code referenced from https://www.freecodecamp.org/news/build-a-custom-pagination-component-in-react/
const Pagination = (props) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  // If there are less than 2 times in pagination range we shall not render the component
  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const lastPage = paginationRange[paginationRange.length - 1];

  const onNext = () => {
    // Do nothing if accessing >= lastPage
    if (currentPage >= lastPage) {
      return;
    }
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    // Do nothing if accessing page <= 0
    if (currentPage >= lastPage) {
      return;
    }
    onPageChange(currentPage - 1);
  };

  return (
    <ul className="pagination">
      {/* Left navigation arrow */}
      <li
        className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
        onClick={onPrevious}
      >
        <span className="page-link">&laquo;</span>
      </li>

      {paginationRange.map((pageNumber, index) => {
        // If the pageItem is a DOT, render the DOTS unicode character
        if (pageNumber === DOTS) {
          return (
            <li className="page-item dots" key={index}>
              <span className="page-link">&#8230;</span>
            </li>
          );
        }

        // Render our Page Pills
        return (
          <li
            className={`page-item ${
              parseInt(pageNumber) === currentPage ? "active" : ""
            }`}
            key={index}
            onClick={() => onPageChange(pageNumber)}
          >
            <span className="page-link">{pageNumber}</span>
          </li>
        );
      })}

      {/*  Right Navigation arrow */}
      <li
        className={`page-item ${currentPage === lastPage ? "disabled" : ""}`}
        onClick={onNext}
      >
        <span className="page-link">&raquo;</span>
      </li>
    </ul>
  );
};

export default Pagination;

const usePagination = ({
  totalCount,
  pageSize,
  siblingCount = 1,
  currentPage,
}) => {
  const paginationRange = useMemo(() => {
    const totalPageCount = Math.ceil(totalCount / pageSize);

    // Pages count is determined as siblingCount + firstPage + lastPage + currentPage + 2*DOTS
    const totalPageNumbers = siblingCount + 5;

    /*
      If the number of pages is less than the page numbers we want to show in our
      paginationComponent, we return the range [1..totalPageCount]
    */
    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(
      currentPage + siblingCount,
      totalPageCount
    );

    /*
      We do not want to show dots if there is only one position left 
      after/before the left/right page count as that would lead to a change if our Pagination
      component size which we do not want
    */
    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 3 + 2 * siblingCount;
      let leftRange = range(1, leftItemCount);

      return [...leftRange, DOTS, totalPageCount];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = 3 + 2 * siblingCount;
      let rightRange = range(
        totalPageCount - rightItemCount + 1,
        totalPageCount
      );
      return [firstPageIndex, DOTS, ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }
  }, [totalCount, pageSize, siblingCount, currentPage]);

  return paginationRange;
};

const DOTS = "...";

const range = (start, end) => {
  let length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};
