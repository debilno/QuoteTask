import React from 'react';
import "../styles/components/quote.css";

interface QuoteProps {
  content: string;
  author: {
    name: string;
    tags: string[];
  };
}

const Quote = ({ content, author }: QuoteProps) => {
  const { name, tags } = author;

  return (
    <blockquote className = "Quote">
      <div className = "Quote-content">"{content}"</div>
      <div className = "Quote-author">
        <cite>
          {name}
          <div className = "tag">{tags.join(', ')}</div>
        </cite>
      </div>
    </blockquote>
  );
};

export default Quote;
