import React, {useState} from "react";
import "./CheckboxStar.css";

interface Props {
    onChange: (name: "courseCompletion" | "courseEngagment" | "projectDegree"| "teamProjectDegree", value: string) => void;
    checked: (name: "courseCompletion" | "courseEngagment" | "projectDegree"| "teamProjectDegree",
              value: string) => boolean;
    name: "courseCompletion" | "courseEngagment"| "projectDegree"| "teamProjectDegree";
    value: string;
}

export function CheckboxStar(props: Props) {
    const {onChange, checked, name, value} = props;
    const [isSelect, setIsSelect] = useState(() => checked(name, value));


    function selectHandler() {
        setIsSelect(prev => !prev);
    }

    return (
        <label className={`CheckboxStar ${isSelect && "is-select"}`}>
            <input
                type="checkbox"
                id={name}
                name={name}
                onChange={() => onChange(name, value)}
                value={value}
            />
            <div onClick={selectHandler}>
                {value} <span>★</span>
            </div>
        </label>
    );
}