"use client";

import { useCallback, useEffect, useState, useRef } from "react";
import Image from "next/image";

type CardProps = {
  index: number;
  isSelected: boolean;
  setSelectedCard: (index: number) => void;
  getCardClasses: (index: number) => string;
  image: {
    src: string
  };
};

function Card({
  index,
  isSelected,
  setSelectedCard,
  getCardClasses,
  image
}: CardProps) {
  return (
    <>
      <input
        id={`card-${index}`}
        type="radio"
        name="slider"
        className="sr-only"
        checked={isSelected}
        onChange={() => setSelectedCard(index)}
      />
      <div className={`absolute top-[50%] -translate-y-[50%] z-20 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${getCardClasses(index)}`}>
        <label className="absolute inset-0" htmlFor={`card-${index}`} />
        <div className={`p-1 bg-slate-100 rounded-sm ${isSelected ? "border shadow-2xl" : "shadow-lg"}`}>
          <Image
            className="rounded-sm"
            src={image.src}
            alt="test"
            width="600"
            height="600"
          />
        </div>
      </div>
    </>
  );
}

type ImgStackProps = {
  cards: { src: string }[]
}

export default function ImgStack({ cards }: ImgStackProps) {
  const imgStackRef = useRef<HTMLDivElement>(null);
  const [selectedCard, setSelectedCard] = useState(3);

  const getCardClasses = useCallback(
    (index: number) => {

      // If this is the last card and the selected card is the first card
      if (selectedCard === 1 && index === cards.length - 1) {
        return "-translate-x-8 z-20";
      }

      if (index === selectedCard - 1) {
        return "-translate-x-8 z-20";
      }

      if (index === selectedCard) {
        return "z-50";
      }

      if (index === selectedCard + 1) {
        return "translate-x-8 z-40";
      }

      if (index === selectedCard + 2) {
        return "translate-x-10 z-30";
      }

      return "opacity-0";
    },
    [cards.length, selectedCard]
  );

  return (
    <section ref={imgStackRef} className="p-12">
      <div className="max-w-lg mx-auto relative aspect-square">
        {cards.map((image, index) => (
          <Card
            key={index}
            index={index}
            image={image}
            isSelected={selectedCard === index}
            setSelectedCard={setSelectedCard}
            getCardClasses={getCardClasses}
          />
        ))}
      </div>
    </section>
  );
}
