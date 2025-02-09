import { useState } from "react";
import { useFetcher } from "@remix-run/react";
import StatsTableBase from "./StatsTable";

export default function GlobalStats() {

    const stats = [{ name: "card1", value: 1 }, { name: "card2", value: 2 }, { name: "card3", value: 3 }, { name: "card4", value: 465 }, { name: "card5", value: 5 }];
    const [data, setData] = useState<any>(stats);
    const fetcher = useFetcher();
    // fetcher.load("/resources/stats/global").then((data) => { setData(data) });

    return (
        <StatsTableBase title="Global Stats" data={data} />
    );

}