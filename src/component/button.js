import React, { useContext } from "react";
import { CalcContext } from "../context/calcProvider";

const getStyleName = (btn) => {
    const classes = {
        "=": "equals",
        "/": "operation",
        "x": "operation",
        "-": "operation",
        "+": "operation",
        "AC": "clear"
    }
    return classes[btn];
}

const Button = ({ value }) => {
    const { calc, setCalc} = useContext(CalcContext);

    const numClick = () => {
        const numString = value.toString();
        let numValue;

        if (numString === "0" && calc.num === 0) {
            numValue = "0";
        } else {
            numValue = Number(calc.num + numString);
        }

        setCalc({...calc, num: numValue});
    }

    const reset = () => {
        setCalc({
            sign: "",
            num: 0,
            sum: 0
        });
    };

    const deleteClick = () => {
        setCalc({
            ...calc, 
            num: calc.num ? calc.num.toString().slice(0, -1) : calc.sum,
            sum: calc.sum.toString().length > 1 ? calc.sum.toString().slice(0, -1) : 0
        });
    };

    const operation = () => {
        setCalc({
            sign: value,
            sum: !calc.sum && calc.num ? calc.num : calc.sum,
            num: 0
        });
    };

    const equal = () => {
        if (calc.sum && calc.num) {
            const optResult = (a, b, sign) => {
                const results = {
                    "/": (a, b) => a / b,
                    "x": (a, b) => a * b,
                    "-": (a, b) => a - b,
                    "+": (a, b) => a + b
                };

                return results[sign](a, b);
            }

            setCalc({
                sign: "",
                num: 0,
                sum: optResult(calc.sum, calc.num, calc.sign)
            });
        }
    };

    const commaClick = () => {
        setCalc({
            ...calc, num: !calc.num.toString().includes(".") ? calc.num + value : calc.num
        });
    };

    const handleButtonClick = () => {
        const clicks = {
            "AC": reset,
            "Del": deleteClick,
            "/": operation,
            "x": operation,
            "-": operation,
            "+": operation,
            "=": equal,
            ".": commaClick
        }

        if (clicks[value]) {
            return clicks[value]();
        } else {
            return numClick();
        }
    };
    
    return (
        <button onClick={handleButtonClick} className={`${getStyleName(value)} button`}>{value}</button>
    )
};

export default Button;