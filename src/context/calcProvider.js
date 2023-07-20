import React from "react";
import { createContext, useState } from "react";

export const CalcContext = createContext();

const CalcProvider = ({ children }) => {
    const [calc, setCalc] = useState({
        sign: "",
        num: 0,
        sum: 0
    });

    const provider = {
        calc, setCalc
    };

    return (
        <CalcContext.Provider value={provider}>
            {children}
        </CalcContext.Provider>
    )
};

export default CalcProvider;