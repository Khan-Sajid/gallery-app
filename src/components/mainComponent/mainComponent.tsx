"use client";
import React, { useEffect, useRef, useState } from "react";
import Header from "../header/header";
import { ImageDataType } from "@/types";
import { CardComponent } from "../cardComponent";
import { getImages, searchImages } from "@/http";
import { useIntersectionObserver } from "@/customHooks";

export const MainComponent = (props: { ImagesData: ImageDataType[] }) => {
  const { ImagesData } = props;
  const [allImagesData, setAllImagesData] = useState(ImagesData);
  const [isLoading, setIsLoading] = useState(false);
  const [searchFor, setSearchFor] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const loaderRef = useRef(null);
  const bottomIntersectionEntry = useIntersectionObserver(loaderRef, {});

  function searchForImages(query: string) {
    if (searchFor !== query) {
      setCurrentPage(1);
    }
    setSearchFor(query);
  }

  useEffect(() => {
    if (currentPage > 1) {
      (async () => {
        setIsLoading(true);
        if (searchFor) {
          const searchResponse = await searchImages({
            query: searchFor,
            page: currentPage,
          });
          setAllImagesData((prevState) => [
            ...prevState,
            ...searchResponse?.results,
          ]);
        } else {
          const imageResponse = await getImages({
            page: currentPage,
          });
          setAllImagesData((prevState) => [...prevState, ...imageResponse]);
        }
        setIsLoading(false);
      })();
    }
    return () => {};
  }, [currentPage]);

  useEffect(() => {
    if (searchFor) {
      window.scroll(0, 0);
      (async () => {
        setIsLoading(true);
        const searchResponse = await searchImages({
          query: searchFor,
          page: 1,
        });
        setAllImagesData(searchResponse.results);
        setIsLoading(false);
      })();
      return () => {
        setAllImagesData([]);
        setCurrentPage(1);
      };
    }
  }, [searchFor]);

  useEffect(() => {
    if (bottomIntersectionEntry?.isIntersecting) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  }, [bottomIntersectionEntry?.isIntersecting]);

  return (
    <>
      <Header searchImages={searchForImages} isLoading={isLoading} />
      {isLoading && (
        <h2 style={{ color: "#fff" }}>Searching for {searchFor}...</h2>
      )}
      {searchFor && !isLoading && (
        <h2 style={{ color: "#fff" }}>Showing Results for {searchFor}.</h2>
      )}
      {allImagesData.length === 0 && !isLoading && (
        <h2 style={{ color: "#fff", marginTop: "80px", flex: "1" }}>
          No images found
        </h2>
      )}
      {Array.isArray(allImagesData) &&
        allImagesData?.map((imageData, index) => {
          return (
            <CardComponent
              key={imageData.id + index}
              imageData={imageData}
              index={index}
            />
          );
        })}
      {allImagesData.length > 1 && (
        <div ref={loaderRef} style={{ color: "#fff", marginBottom: "30px" }}>
          loading...
        </div>
      )}
    </>
  );
};
