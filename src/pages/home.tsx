import "../styles/pages/style.css";
import Card from "../components/card";
import { Quote } from "../common/types";
import { useQuotableStore } from "../stores/store";
import { useEffect } from "react";
import { observer } from "mobx-react";
import { QUOTABLE_API_SERVICE } from "../services/quotable-api";

const Home = observer(() => {
  const { quote, setQuote } = useQuotableStore();

  const getQouteRequest = async () => {
    const quotes = await QUOTABLE_API_SERVICE.getRandomQuotes({ limit: 18 });
    setQuote(quotes);
  };

  useEffect(() => {
    if (quote.length === 0) {
      getQouteRequest();
    }
  }, []);

  const removeDuplicateTags = (quotes: Quote[]): Quote[] => {
    const uniqueTagsSet = new Set<string>();
    const uniqueQuotes: Quote[] = [];

    quotes.forEach((quote) => {
      const uniqueTag = quote.tags.find((tag) => !uniqueTagsSet.has(tag));
      if (uniqueTag) {
        uniqueQuotes.push({ ...quote, tags: [uniqueTag] });
        uniqueTagsSet.add(uniqueTag);
      }
    });

    return uniqueQuotes;
  };

  return (
    <>
      <main className="header">
        <div className="header__quote_of_the_day">
          <h1 className="header__title">
            <strong>Random Best Quotes</strong>
            <br />
          </h1>
        </div>
      </main>
      <section className="quote-section">
        <div className="card-container">
          {removeDuplicateTags(quote).map((quote, index) => (
            <div key={index}>
              <Card {...quote} />
            </div>
          ))}
        </div>
      </section>
    </>
  );
});

export default Home;
