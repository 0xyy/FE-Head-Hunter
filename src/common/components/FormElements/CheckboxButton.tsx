import React, {useState} from "react";
import "./CheckboxButton.css";

interface Props {
    onChange: (name: "expectedTypeWork"| "expectedContractType", value: string) => void;
    checked: (name: "expectedTypeWork"| "expectedContractType",
              value: string) => boolean;
    name: "expectedTypeWork"| "expectedContractType";
    value: string;
    text: string;
}


export function CheckboxButton(props: Props) {
    const {onChange, checked, name, value,text} = props;
    const [isSelect, setIsSelect] = useState(() => checked(name, value));


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
            <div onClick={selectHandler} className={`CheckboxButton__button ${isSelect && "is-select"}`} >{text}
            </div>
        </label>
    );
}

