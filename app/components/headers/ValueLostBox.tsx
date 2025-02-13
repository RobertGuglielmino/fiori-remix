import centsToDollars from '../../utils/centsToDollars';
import { useFIORI } from '../../FIORIContext';

const easeIn = (t: number) => t * t;

function ValueLostBox() {
  const state = useFIORI();

  // const ref = useRef<HTMLSpanElement>(null);
  // const startTimeRef = useRef<number | null>(null);
  // // const previousValueRef = useRef<number>(value);
  // // const endValue = value + addValue;

  // const duration = 0.3;

  // useEffect(() => {
  //   const previousValue = previousValueRef.current;
  //   if (previousValue === endValue) return;

  //   let current = previousValue;

  //   const step = (timestamp: number) => {
  //     // console.log("===============");
  //     // console.log("ref :", ref.current);
  //     // console.log("startTimeRef :", startTimeRef.current);
  //     // console.log("previousValueRef :", previousValueRef.current);
  //     // console.log("timestamp :", timestamp);
  //     if (!startTimeRef.current) startTimeRef.current = timestamp;

  //     const progress = Math.min((timestamp - startTimeRef.current) / (duration * 1000), 1);

  //     current = previousValue + ((endValue - previousValue) * easeIn(progress));
  //     if (ref.current) ref.current.textContent = `$${current.toFixed(2)}`;

  //     if (progress < 1) {
  //       requestAnimationFrame(step);
  //     } else {
  //       previousValueRef.current = endValue;
  //     }
  //   };

  //   requestAnimationFrame(step);

  //   return () => {
  //     startTimeRef.current = null;
  //   };
  // }, [ addValue, duration]);

  let flipOpacity = (state!.action === "RIP") || (state!.action === undefined);

  return (
    <div className='flex-basis-1'>
      <div className={`opacity-${flipOpacity ? "25" : "100"} flex flex-col items-center justify-center rounded-lg p-4 transition duration-150`}>
        {/* <span ref={ref} className="value-lost-box">${previousValueRef.current.toFixed(2)}</span> */}
        <span className="font-kanit text-2xl value-lost-box">{centsToDollars(state!.amountLost)}</span>
        <span className="font-kanit text-2xl label">Lost</span>
      </div>
    </div>
  );
};

export default ValueLostBox;