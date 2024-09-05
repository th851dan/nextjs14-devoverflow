"use client"
import { useRef, useState, useEffect } from 'react';

interface Content {
  content: string
}

const CollapsibleContent = ({ content }: Content) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    const element = contentRef.current;
    if (element) {
      if (element.scrollHeight > element.clientHeight) {
        setIsOverflowing(true);
      } else {
        setIsOverflowing(false);
      }
    }
  }, [content]);


  return (
    <div>
      <div
        ref={contentRef}
        className={`overflow-hidden transition-all duration-300 ease-in-out text-dark500_light700 ${isExpanded ? '' : 'line-clamp-3'
          } my-4`}
        dangerouslySetInnerHTML={{ __html: content }}
      />

      {isOverflowing && (
        <div className="text-right mt-2">
          {isExpanded ? (
            <span
              onClick={toggleExpand}
              className="text-primary-500 cursor-pointer"
            >
              Less
            </span>
          ) : (
            <span
              onClick={toggleExpand}
              className="text-primary-500 cursor-pointer"
            >
              More
            </span>
          )}
        </div>
      )}
    </div>
  );
}


export default CollapsibleContent;