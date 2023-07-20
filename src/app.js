import React from "react";
import ReactDOM from "react-dom";
import Wrapper from "./component/wrapper";
import Screen from "./component/screen";
import ButtonBox from "./component/buttonBox";
import Button from "./component/button";
import CalcProvider from "./context/calcProvider";

const values = [
    ["AC", "Del", "/"],
    [7, 8, 9, "x"],
    [4, 5, 6, "-"],
    [1, 2, 3, "+"],
    [0, ".", "="]
];

const App = () => {
    return (
        <CalcProvider>
            <Wrapper>
                <Screen />
                <ButtonBox>
                    {values.flat().map((btn, i) => {
                        return (
                            <Button
                            value={btn}
                            key={i} />
                        )
                    })}
                </ButtonBox>
            </Wrapper>
        </CalcProvider>
    )
};

ReactDOM.render(<App />, document.getElementById('root'));