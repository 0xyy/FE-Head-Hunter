import React, {useEffect, useState} from "react";
import "./CheckboxStar.css";

interface Props {
    onChange: (name: "courseCompletion" | "courseEngagment" | "projectDegree"| "teamProjectDegree", value: number) => void;
    checked: (name: "courseCompletion" | "courseEngagment" | "projectDegree"| "teamProjectDegree",
              value: number) => boolean;
    name: "courseCompletion" | "courseEngagment"| "projectDegree"| "teamProjectDegree";
    value: number;
}

export function CheckboxStar(props: Props) {
    const {onChange, checked, name, value} = props;
    const [isSelect, setIsSelect] = useState(() => checked(name, value));

    useEffect(()=> {
        setIsSelect(checked(name, value))
    }, [checked, name, value])


    return (
        <label className={`CheckboxStar ${isSelect && "is-select"}`}>
            <input
                type="checkbox"
                id={name}
                name={name}
                onChange={() => onChange(name, value)}
                value={value}
            />
            <div>
                {value} <span>★</span>
            </div>
        </label>
    );
}