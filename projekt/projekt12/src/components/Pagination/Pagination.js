import "./pagination.css";
import React, { useState, useEffect } from "react";

function Pagination({ limit, onPageChange, currentPage, total }) {
	const pagesCount = Math.ceil(total / limit);
	const pagesCut = getPagesCut({ pagesCount, pagesCutCount: 5, currentPage });
	const pages = range(pagesCut.start, pagesCut.end);
	const isFirstPage = currentPage === 1;
	const isLastPage = currentPage === pagesCount;

	useEffect(() => {
		const query = new URLSearchParams(window.location.search);
		query.set("page", currentPage);
		window.history.pushState(null, "", `?${query.toString()}`);
	}, [currentPage]);

	function range(start, end) {
		return [...Array(end - start).keys()].map((element) => element + start);
	}

	function getPagesCut({ pagesCount, pagesCutCount, currentPage }) {
		const ceiling = Math.ceil(pagesCutCount / 2);
		const floor = Math.floor(pagesCutCount / 2);

		if (pagesCount < pagesCutCount) {
			return { start: 1, end: pagesCount + 1 };
		} else if (currentPage >= 1 && currentPage <= ceiling) {
			return { start: 1, end: pagesCutCount + 1 };
		} else if (currentPage + floor >= pagesCount) {
			return { start: pagesCount - pagesCutCount + 1, end: pagesCount + 1 };
		} else {
			return { start: currentPage - ceiling + 1, end: currentPage + floor + 1 };
		}
	}

	const handleNextPage = () => {
		onPageChange(currentPage + 1);
	};

	const handlePrevPage = () => {
		onPageChange(currentPage - 1);
	};

	const handleFirstPage = () => {
		onPageChange(1);
	};

	const handleLastPage = () => {
		onPageChange(pagesCount);
	};

	return (
		
		<>
			<div>
				<>
					<button disabled={isFirstPage} onClick={handleFirstPage}>
						First
					</button>
					<button disabled={isFirstPage} onClick={handlePrevPage}>
						Prev
					</button>
					{pages.map((p) => (
						<button
							className={p === currentPage ? "current" : ""}
							onClick={() => onPageChange(p)}
						>
							{p}
						</button>
					))}
					<button disabled={isLastPage} onClick={handleNextPage}>
						Next
					</button>
					<button disabled={isLastPage} onClick={handleLastPage}>
						Last
					</button>
				</>
			</div>
		</>
	);
}
export default Pagination;
