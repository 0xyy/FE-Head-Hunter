import React, {useEffect, useState} from "react";
import "./CheckboxButton.css";

interface Props {
    onChange: (name: "expectedTypeWork"| "expectedContractType", value: string) => void;
    checked: (name: "expectedTypeWork"| "expectedContractType",
              value: string) => boolean;
    name: "expectedTypeWork"| "expectedContractType";
    value: string;
}


export function CheckboxButton(props: Props) {
    const {onChange, checked, name, value} = props;
    const [isSelect, setIsSelect] = useState(() => checked(name, value));

    useEffect(()=> {
        setIsSelect(checked(name, value))
    },[onChange, checked])
    function selectHandler() {
        setIsSelect(prev => !prev);
    }

    return (
        <label className={`CheckboxButton`}>
            <input
                type="checkbox"
                id={name}
                name={name}
                onChange={() => onChange(name, value)}
                value={value}
            />
            <div onClick={selectHandler} className={`CheckboxButton__button ${isSelect && "is-select"}`} >{value}
            </div>
        </label>
    );
}

