import { useRef, useState } from "react";

interface Props<Type> {
    data: Type;
    setData: (value: Type) => void;
    edit: boolean;
}

// meant to be used under parent component since this component does not have state
const EditableCodeBlock = <Type extends unknown>({ data, setData, edit }: Props<Type> ) => {
    const [editing, setEditing] = useState<boolean>(false);
    const textarea = useRef<HTMLTextAreaElement>(null);

    const handleSubmit = () => {
        try {
            if (editing) {
                setData(JSON.parse(textarea.current?.value || ""));
            }
            setEditing(!editing);
        } catch(err) {
            alert("Invalid JSON");
        }

        
        //console.log(event.target.value);
    }
  return (
    <div>
        {
            editing ?
            <textarea ref={textarea} className="w-full h-[50rem] codeblock-edit">
                { JSON.stringify(data,undefined, 2) }
            </textarea>
            :
            <pre className="codeblock">
                { JSON.stringify(data,undefined, 2) }
            </pre>
        }
        
        {
            edit &&
            <button className="w-full bg-slate-500 hover:bg-secondary" onClick={() => {
                handleSubmit();
            }}>
                { editing ? "Save" : "Edit" }
            </button>
        }
        
    </div>
  )
}

export default EditableCodeBlock