"use client"

import React from "react";
import { Protected } from "@/components/Protected";

const Salaries = () => {
    return (
        <div>
            This is protected
        </div>
    );
};

export default Protected(Salaries);
