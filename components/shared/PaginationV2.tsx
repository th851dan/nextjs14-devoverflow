"use client";

import React from "react";

import { Button } from "../ui/button";

interface Props {
  title: string;
  pageNumber: number;
  isNext: boolean;
  onPageChange: (newPageNumber: number) => void;
  children?: React.ReactNode;
  optionalClassName?: string;
}

const PaginationV2 = ({ title, pageNumber, isNext, onPageChange, children, optionalClassName }: Props) => {

  const handleNavigation = (direction: string) => {
    const nextPageNumber =
      direction === "prev" ? pageNumber - 1 : pageNumber + 1;

    onPageChange(nextPageNumber)

  };

  if (!isNext && pageNumber === 0) return null; // hide pagination if there is only one page

  return (

    <div className={optionalClassName}>
      <h3 className="h3-bold text-dark200_light900">{title}</h3>
      <div className="mt-7 flex flex-col gap-4">
        {children}
        <div className="mt-1">
          <div className="flex w-full items-center justify-center gap-2">
            <Button
              disabled={pageNumber === 1}
              onClick={() => handleNavigation("prev")}
              className="light-border-2 btn flex min-h-[36px] items-center justify-center gap-2 border"
            >
              <p className="body-medium text-dark200_light800">Prev</p>
            </Button>
            <div className="flex items-center justify-center rounded-md bg-primary-500 px-3.5 py-2">
              <p className="body-semibold text-light-900">{pageNumber}</p>
            </div>{" "}
            <Button
              disabled={!isNext}
              onClick={() => handleNavigation("next")}
              className="light-border-2 btn flex min-h-[36px] items-center justify-center gap-2 border"
            >
              <p className="body-medium text-dark200_light800">Next</p>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaginationV2;
