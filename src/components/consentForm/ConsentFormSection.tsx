import React from "react";

export default function ConsentFormSection({ title, children }: { title: string, children: React.ReactNode; }) {
    return (
        <div className="w-full">
            <h1 className="text-subtitle">{title}</h1>
            <div className="text-main-body w-full">{children}</div>
        </div>
    );
}