"use client"

import React from "react";

import { Protected } from "@/components/Protected";

const Salaries = () => {
    return (
        <div>
            Display salaries here
        </div>
    );
};

export default Protected(Salaries);
