import "./pagination.css";
import React, { useState, useEffect } from "react";
import { FiChevronsLeft } from "react-icons/fi";
import { FiChevronLeft } from "react-icons/fi";
import { FiChevronRight } from "react-icons/fi";
import { FiChevronsRight } from "react-icons/fi";

function Pagination({ limit, onPageChange, currentPage, total }) {
	const pagesCount = Math.ceil(total / limit);
	const pagesCut = getPagesCut({ pagesCount, pagesCutCount: 4, currentPage });
	const pages = range(pagesCut.start, pagesCut.end);
	const isFirstPage = currentPage === 1;
	const isLastPage = currentPage === pagesCount;

	useEffect(() => {
		const query = new URLSearchParams(window.location.search);
		query.set("page", currentPage);
		window.history.pushState(null, "", `?${query.toString()}`);
	}, [currentPage]);

	function range(start, end) {
		return [...Array(end - start + 1).keys()].map((element) => element + start);
	}

	function getPagesCut({ pagesCount, pagesCutCount, currentPage }) {
		const ceiling = Math.ceil(pagesCutCount / 2);
		const floor = Math.floor(pagesCutCount / 2);

		if (pagesCount < pagesCutCount) {
			return { start: 1, end: pagesCount };
		} else if (currentPage <= ceiling) {
			return { start: 1, end: pagesCutCount };
		} else if (currentPage + floor >= pagesCount) {
			return { start: pagesCount - pagesCutCount + 1, end: pagesCount };
		} else {
			return { start: currentPage - ceiling, end: currentPage + floor };
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
		<div className="all">
			<button
				className={currentPage === 1 ? "activeStepPage" : "stepPage"}
				disabled={isFirstPage}
				onClick={handleFirstPage}
			>
				<FiChevronsLeft />
			</button>
			<button
				className={currentPage === 1 ? "activeStepPage" : "stepPage"}
				disabled={isFirstPage}
				onClick={handlePrevPage}
			>
				<FiChevronLeft />
			</button>
			{pages.map((p) => (
				<button
					key={p}
					className={p === currentPage ? "current" : "notCurrent"}
					onClick={() => onPageChange(p)}
				>
					{p}
				</button>
			))}
			<button
				className={isLastPage ? "activeStepPage" : "stepPage"}
				disabled={isLastPage}
				onClick={handleNextPage}
			>
				<FiChevronRight />
			</button>
			<button
				className={isLastPage ? "activeStepPage" : "stepPage"}
				disabled={isLastPage}
				onClick={handleLastPage}
			>
				<FiChevronsRight />
			</button>
		</div>
	);
}

export default Pagination;
