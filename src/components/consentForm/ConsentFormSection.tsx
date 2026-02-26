import React from "react";

export default function ConsentFormSection({ title, children }: { title: string, children: React.ReactNode; }) {
    return (
        <div className="w-full">
            <h1 className="text-base font-bold">{title}</h1>
            <div className="text-[15px] w-full">{children}</div>
        </div>
    );
}