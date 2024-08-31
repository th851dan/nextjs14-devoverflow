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
        className={`${isExpanded ? '' : 'line-clamp-3'} my-4`}
        dangerouslySetInnerHTML={{ __html: content }}
      />

      {isOverflowing && (
        <div className="mt-2 text-right">
          <span
            onClick={toggleExpand}
            className="cursor-pointer text-blue-500"
          >
            {isExpanded ? 'Less' : 'More'}
          </span>
        </div>
      )}
    </div>
  );
}


export default CollapsibleContent;