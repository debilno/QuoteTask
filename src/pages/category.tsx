import React, { useEffect, useState } from "react";
import { ListGroup } from "react-bootstrap";
import "../styles/pages/style.css";
import LikeButton from "../components/like-button";
import { Quote } from "../common/types";
import { observer } from "mobx-react";
import { useQuotableStore } from "../stores/store";
import { QUOTES_PER_PAGE } from "../config";
import { QUOTABLE_API_SERVICE } from "../services/quotable-api";

const Category = observer(() => {
  
  const splitedHref = window.location.href.split("/");
  const tag = decodeURI(splitedHref[splitedHref.length - 1]);

  const { quotesByTagCursor, setCursor, getQuotesByTag, setQuotesByTag } = useQuotableStore();
  const [page, setPage] = useState(1);

  const totalPages = quotesByTagCursor ? Math.ceil(quotesByTagCursor.length / QUOTES_PER_PAGE): 1;

  const startPage = QUOTES_PER_PAGE * (page - 1);
  const endPage = startPage + QUOTES_PER_PAGE;

  const getAllQuotes = async () => {

    const firstResponse = await QUOTABLE_API_SERVICE.getQuotes({
      tags: tag,
      page: 1,
    });

    if (!firstResponse) {
      return;
    }

    setQuotesByTag(tag, firstResponse.results);
    setCursor(tag);

    const allQuotes: Quote[] = [...firstResponse.results];
    let currentPage = firstResponse.page;
    let totalPages = firstResponse.totalPages;

    while (currentPage < totalPages) {
      currentPage++;

      const response = await QUOTABLE_API_SERVICE.getQuotes({
        tags: tag,
        page: currentPage,
      });

      if (!response) {
        break;
      }

      allQuotes.push(...response.results);

      await new Promise<void>((resolve) => {
        setTimeout(() => resolve());
      });
    }

    if (totalPages > 1) {
      setQuotesByTag(tag, allQuotes);
      setCursor(tag);
    }
  };

  useEffect(() => {
    const qoutes = getQuotesByTag(tag);

    if (!qoutes) {
      getAllQuotes();
      return;
    }

    setCursor(tag);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (quotesByTagCursor === null) {
    return null;
  }

  return (
    <main className="page">
      <h2 className="title-1">Category — {decodeURI(tag)}</h2>

      <div className="btn-container">
        <button
          className="btn-back"
          onClick={() => page - 1 > 0 && setPage(page - 1)}
        >
          PREV
        </button>
        <button
          className="btn-next"
          onClick={() => page + 1 <= totalPages && setPage(page + 1)}
        >
          NEXT
        </button>
        <div className="pageCount">
          {" "}
          page {page}/{totalPages}
        </div>
      </div>

      <ListGroup>
        {quotesByTagCursor.slice(startPage, endPage).map((quote) => (
          <ListGroup.Item
            key={quote._id}
            className="d-flex flex-column flex-md-row justify-content-between listGroup align-items-start wrapper"
          >
            <div className="col-12 col-md-8 ">
              <div className="ms-2 me-auto listGroup ">
                <div className="fw-bold">{quote.content}</div>
                <div>— {quote.author}</div>
              </div>
            </div>

            <div className="quote-rating">
              <LikeButton quoteId={quote._id} />
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </main>
  );
});

export default Category;
