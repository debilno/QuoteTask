import React, { useState, useEffect } from "react";
import "../styles/components/link-button.css";

interface LikeButtonProps {
  quoteId: string;
  onLike?: (quoteId: string) => void;
}

export default function LikeButton({
  quoteId,
  onLike,
}: LikeButtonProps) {
  const isLikedItem = `isLiked-${quoteId}`;
  const [isLiked, setIsLiked] = useState<boolean>(() => {
    return localStorage.getItem(isLikedItem) === "true";
  });

  useEffect(() => {
    localStorage.setItem(isLikedItem, String(isLiked));
  }, [isLiked, isLikedItem]);

  function handleLike() {
    setIsLiked(!isLiked);
    onLike?.(quoteId);
  }

  return (
    <button className={`${isLiked ? "liked" : "unliked"}`} onClick={handleLike}>
      {isLiked ? (
        <span className="material-icons">favorite</span>
      ) : (
        <span className="material-icons">favorite_border</span>
      )}
    </button>
  );
}
