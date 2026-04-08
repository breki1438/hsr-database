'use client'

import React from "react";
import { BaseStats } from "@/generated/prisma/client";

interface BasicStatsProps {
    basicStats: BaseStats | null;
}

export default function BasicStats({ basicStats }: BasicStatsProps) {
    const [pitStop, setPitStop] = React.useState<number>(13);
    const levelPitStop = [1, 20, 20, 30, 30, 40, 40, 50, 50, 60, 60, 70, 70, 80, 80];

    const handlePitStop = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = Number(e.target.value);
        setPitStop(val);
    }

    return (
        <div className={"flex flex-col gap-2"}>
            <div className={"flex flex-col font-semibold"}>
                <span className={"text-[32px] font-bold italic"}>STATS</span>
                <span className={"w-full bg-white h-0.5"}></span>
                <div className={"flex items-center gap-4 justify-between"}>
                    <span className={"min-w-1/5"}>Level {levelPitStop[pitStop]}/{levelPitStop[pitStop + 1]}</span>
                    <input className={"w-full"} type={"range"} min={0} max={13} value={pitStop} onChange={handlePitStop}/>
                </div>

            </div>
            <div className={"bg-[#222222]/50 border border-[#0F0F0F] p-2 shadow-lg/25"}>
                <table className={"min-w-md"}>
                    <tbody>
                    <tr>
                        <td>Base HP</td>
                        <td>{basicStats?.hpLevels[pitStop]}</td>
                        <td>Crit Rate</td>
                        <td>{basicStats?.critRate}%</td>
                    </tr>
                    <tr>
                        <td>Base DEF</td>
                        <td>{basicStats?.defLevels[pitStop]}</td>
                        <td>Crit DMG</td>
                        <td>{basicStats?.critDamage}%</td>
                    </tr>
                    <tr>
                        <td>Base ATK</td>
                        <td>{basicStats?.atkLevels[pitStop]}</td>
                        <td>Taunt</td>
                        <td>{basicStats?.taunt}</td>
                    </tr>
                    <tr>
                        <td>SPD</td>
                        <td>{basicStats?.spd}</td>
                        <td>Energy Cost</td>
                        <td>{basicStats?.maxEnergy}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}