import {  FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { useState } from 'react'
// import { useRef } from 'react'

/*
InfoListing is for showing a form with data in it, and allowing the user to edit it.
*/

const textboxStyling = {

  "& label": {
    color: "#99bfcc"
  },
  "&:hover label": {
    fontWeight: 700
  },
  "& label.Mui-focused": {
    color: "primary.light"
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "white"
  },
  "& .MuiFilledInput-root": {
    backgroundColor: "#473b3f",
    "& fieldset": {
      borderColor: "white",
    },
    
    color: "white",
    // "&:hover fieldset": {
    //   borderColor: "dark-gray",
    //   borderWidth: 2
    // },
    "&.Mui-focused fieldset": {
      borderColor: "primary.main"
    }
  },
  "& .Mui-disabled": {
    backgroundColor: "#4e4e55",
    color: "white",
    // "&": {
    //   color: "white"
    // },
   

  },

}

const selectStyling = {
    "&": {
        backgroundColor: "#473b3f",
    }

}

interface FieldObj {
  name: string;
  label: string;
  type: string;
  required?: boolean;
  array?: boolean;
  options?: Array<string>;
  disabled?: boolean;
  step?: number;
}

/**
 * Use to create a form to create anything. 
 * Set the formFields like so:
 * const fields = [
    {
        name: "assetType",
        label: "Asset Type",
        type: "select", (can be "select", "text", or "ojbect")
        options: ["electricity", "gas", "water", "HVAC", "thermostat", "other"],
        required: true
    },
    {
        name: "HVACSettings",
        label: "HVAC Settings",
        type: "object",
        options: [
            {
                name: "compressorCount",
                label: "Compressor Count",
                type: "number"
            },
        ]
    }
  ]
 * use the setData function to set the data of the parent component
 */
const CreationForm = <Type extends unknown>({ formFields, setData }: { formFields: Array<FieldObj>, setData: (value: Type) => void}) => {

  //const form = useRef<HTMLFormElement>(null);\
    //const [selectFields, setSelectFields] = useState<any>({}); // for select fields
    const [formChanges, setFormChanges] = useState<any>({}); // for text fields

    const handleStateChange = (fieldName: string, value: string, objectField: string='') => {
        //console.log(fieldName, value, objectField)
        if (objectField != '') {
            // @ts-ignore
            if (!formChanges[fieldName]) { 
                // @ts-ignore
                setFormChanges((prev) => ({
                    ...prev,
                    [fieldName]: {
                        [objectField]: value
                    }
                })); 
            } else {
                // @ts-ignore
                setFormChanges((prev) => ({
                    ...prev,
                    [fieldName]: {
                        ...prev[fieldName],
                        [objectField]: value
                    }
                }));
            }
            // @ts-ignore
            //formChanges[fieldName][objectField] = value;
            //console.log(formChanges);
        } 
        else {
            // @ts-ignore
            setFormChanges((prev) => ({
                ...prev,
                [fieldName]: value
            }));
            //console.log(formChanges);
        }

    }

    // const handleStateChange = (fieldName: string, value: string, objectField: string='') => {
    //     //console.log(fieldName, value, objectField)
    //     if (objectField != '') {
    //         // @ts-ignore
    //         if (!formChanges[fieldName]) { 
    //             this.setState({[fieldName]: {} }) 
    //         };
    //         // @ts-ignore
    //         formChanges[fieldName][objectField] = value;
    //         console.log(formChanges);
    //     } else {
    //         // @ts-ignore
    //         formChanges[fieldName] = value;
    //         console.log(formChanges);
    //     }

    // }

    

    // const formChanges = {
    // };


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // const formData = {
        //     ...formChanges,
        //     ...selectFields
        // }
        console.log(formChanges);
        setData(formChanges);
    }

  return (
    <div className="flex-1">
      {/* <h1 className="text-4xl pb-10">{ data.name || "View Building" }</h1> */}

      
      <div className="flex-1 flex lg:flex-row flex-col justify-between">
        <form className="flex flex-1 flex-col mb-10" onSubmit={handleSubmit}>
          <div>
            {
              formFields.map((field, index) => {
                // @ts-ignore
                if (field.array) {
                  return (
                    <div className="my-2" key={index}>
                      <TextField 
                        key={index}
                        // @ts-ignore
                        onChange={(e) => {
                          // @ts-ignore
                          handleStateChange(`${field.name}`, e.target.value.split(" ").join("").split(","))
                        }}
                        required={field.required || false}
                        // @ts-ignore
                        multiline={field.multiline || false}
                        type={field.type || "text"}
                        inputProps={{step: field.step || 1}}
                        sx={textboxStyling}
                        fullWidth
                        id="outlined-basic" 
                        disabled={field.disabled || false}
                        label={`${field.label}`} 
                        variant="filled"
                        />
                    </div>
                  )
                }

                // object handling
                else if (field.type === "object") {
                  if (field.array) {
                    // array of objects handling
                    // data[field.name].forEach((element: any, j: number) => {
                    
                    //   return (
                    //     <div key={j} className="py-1 border-t-2 border-b-2 border-lightslate">
                    //     { 
                    //       Object.entries(element).map((item: any, i) => {
                    //       //console.log(item);
                    //       return (
                    //         <div className="my-2 key={i}">
                    //           <TextField 
                    //             key={i}
                    //             // @ts-ignore
                    //             onChange={(e) => handleStateChange(`${field.name}-${j}-${element}`, e.target.value, item[0])}
                    //             required={field.required || false}
                    //             // @ts-ignore 
                    //             multiline={field.multiline || false}
                    //             type={field.type == "password" && showHidden ? "text" : field.type}
                    //             sx={textboxStyling}
                    //             fullWidth
                    //             id="outlined-basic" 
                    //             disabled={field.disabled || false}
                    //             label={item[0]} 
                    //             variant="filled"
                    //             defaultValue={item[1]} 
                    //           />
                    //         </div>
                    //       )
                    //       })
                    //     }
                    //     </div>
                    //   )
                    // })
                  } else {
                    return(
                      <div className=" py-1 border-t-2 border-b-2 border-lightslate">
                      <label className="text-white">{field.label}</label>
                      { 
                        field.options?.map((item: any, i: number) => {
                        //console.log(item);
                        return (
                          <div className="my-2" key={i}>
                            <TextField 
                            //key={`${text}-${i}`}
                            // @ts-ignore
                            onChange={(e) => handleStateChange(`${field.name}`, e.target.value, field.objectArr ? i : item.name)}
                            required={field.required || false}
                            // @ts-ignore
                            multiline={field.multiline || false}
                            type={item.type || "text"}
                            inputProps={{step: item.step || 1}}
                            sx={textboxStyling}
                            fullWidth
                            id="outlined-basic" 
                            disabled={field.disabled || false}
                            label={item.label} 
                            variant="filled"
                            />
                          </div>
                        )
                        })
                      }
                      </div>
                    )
                  }
                }

                else if (field.type === "select") {
                    return(
                        <div className="my-2">
                        {/* <label className="text-white">{field.label}</label> */}
                        <FormControl fullWidth>
                            <InputLabel sx={{color: "#99bfcc"}}>{field.label}</InputLabel>
                            <Select
                                //@ts-ignore
                                value={formChanges[field.name] || ''}
                                label={field.label}
                                sx={selectStyling}
                                required={field.required || false}
                                onChange={(e) => {
                                    //console.log(formChanges);
                                    handleStateChange(`${field.name}`, e.target.value);
                                    //setSelectFields({ ...selectFields, [field.name]: e.target.value });
                                }}
                            >
                            { 
                                field.options?.map((item: any, i: number) => {
                                //console.log(item);
                                return (
                                    <MenuItem key={i} value={item}>{ item }</MenuItem>
                                )
                                })
                            }
                            </Select>
                        </FormControl>
                        
                        </div>
                      )
                }

              //   else if (field.type === "checkbox") {
              //     return(
              //         <div className="my-2">
              //         {/* <label className="text-white">{field.label}</label> */}
              //           <FormGroup>
              //             { 
              //                 field.options?.map((item: any, i: number) => {
              //                 //console.log(item);
              //                 return (

              //                   <FormControlLabel 
              //                     sx={{color: "#99bfcc"}}
              //                     label={item}
              //                     key={i}
              //                     control={
              //                       <Checkbox
              //                         // @ts-ignore
              //                         checked={formChanges[field.name].includes(field) || false}
              //                         onChange={(e) => {
              //                           console.log(field);
              //                           handleStateChange(`${field.name}`, field);
              //                       }}
              //                       />
              //                     }
              //                   />

              //                 )
              //                 })
              //             }
              //           </FormGroup>

                      
              //         </div>
              //       )
              // }

                else {
                  return (
                    <div className="flex-row my-2" key={index}>
                    {/* <label>{ field.label }</label> */}
                      <TextField 
                        key={index}
                        // @ts-ignore
                        onChange={(e) => handleStateChange(field.name, e.target.value)}
                        required={field.required || false}
                        // @ts-ignore
                        multiline={field.multiline || false}
                        sx={textboxStyling}
                        fullWidth
                        type={field.type || "text"}
                        inputProps={{step: field.step || 1}}
                        id="outlined-basic" 
                        disabled={field.disabled || false}
                        label={field.label} 
                        variant="filled"
                        />
                    </div>
                  )
                }

              }
                
              )
            }

            <button type="submit" className="w-full bg-slate-500 rounded mt-1 hover:bg-secondary">JSON</button>
          </div>
        </form>
        
      </div>
      
        
        
    </div>
  )
}

export default CreationForm