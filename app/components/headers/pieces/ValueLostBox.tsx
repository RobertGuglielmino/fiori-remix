import React, { useEffect, useRef } from 'react';

interface ValueLostBoxProps {
  value: number;
  addValue: number;
}

const easeIn = (t: number) => t * t;

const ValueLostBox: React.FC<ValueLostBoxProps> = ({ value, addValue }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const startTimeRef = useRef<number | null>(null);
  const previousValueRef = useRef<number>(value);
  const endValue = value + addValue;

  const duration = 0.3;

  useEffect(() => {
    const previousValue = previousValueRef.current;
    if (previousValue === endValue) return;

    let current = previousValue;

    const step = (timestamp: number) => {
      // console.log("===============");
      // console.log("ref :", ref.current);
      // console.log("startTimeRef :", startTimeRef.current);
      // console.log("previousValueRef :", previousValueRef.current);
      // console.log("timestamp :", timestamp);
      if (!startTimeRef.current) startTimeRef.current = timestamp;

      const progress = Math.min((timestamp - startTimeRef.current) / (duration * 1000), 1);

      current = previousValue + ((endValue - previousValue) * easeIn(progress));
      if (ref.current) ref.current.textContent = `$${current.toFixed(2)}`;

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        previousValueRef.current = endValue;
      }
    };

    requestAnimationFrame(step);

    return () => {
      startTimeRef.current = null;
    };
  }, [value, addValue, duration, endValue]);

  return (
    <div className='flex flex-col items-center'>
      <span ref={ref} className="value-lost-box">${previousValueRef.current.toFixed(2)}</span>
    </div>
  );
};

export default ValueLostBox;