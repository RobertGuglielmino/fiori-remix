import centsToDollars from "../../utils/centsToDollars";

interface StatsTableBaseProps {
    title: string;
    data: any;
}

export default function StatsTableBase({ title, data }: StatsTableBaseProps) {
    return (
        <>
            <h1 className="text-center font-quicksand m-4 text-4xl">
                {title}
            </h1>
            <div className="center grid grid-cols-4 divide-solid border-black border-2 rounded m-4">
                <div className="bg-sky-200 text-center font-quicksand col-span-1">Ranking</div>
                <div className="bg-sky-200 border-x-2 border-gray-400 text-center font-quicksand col-span-2 w-50"><b>Card Name</b></div>
                <div className="bg-sky-200 text-center font-quicksand col-span-1">Total Amount Lost</div>
                {data.map((stat, index) => {
                    const rowStyle = index % 2 === 0 ? "bg-white" : "bg-sky-100";
                    return (
                        <>
                            <div className={`${rowStyle} text-center font-quicksand col-span-1`}>{index}</div>
                            <div className={`${rowStyle} border-x-2 border-gray-400 text-center font-quicksand col-span-2 w-50`}><b>{stat.name}</b></div>
                            <div className={`${rowStyle} text-center font-quicksand col-span-1`}>{centsToDollars(stat.value)}</div>
                        </>
                    )
                })}
            </div>
        </>
    );
}