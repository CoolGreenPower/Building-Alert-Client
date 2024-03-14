import { TextField } from '@mui/material'
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

const InfoListing = ({ data, showHidden, formFields }: { data: any, showHidden: boolean, formFields: Array<any>}) => {

  //const form = useRef<HTMLFormElement>(null);

  const handleStateChange = (fieldName: string, value: string, objectField: string) => {
    console.log(fieldName, value, objectField)
    if (objectField) {
      // @ts-ignore
      if (!formChanges[fieldName]) { formChanges[fieldName] = {}; }
      // @ts-ignore
      formChanges[fieldName][objectField] = value;
      console.log(formChanges);
    } else {
      // @ts-ignore
      formChanges[fieldName] = value;
      console.log(formChanges);
    }

  }

  const formChanges = {
    // keys: {},
    // machines: {}
    // there is more here, but keys has to be defined as an object
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(e.target);
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
                      {/* {
                        // @ts-ignore
                        building[`${field.name}` as keyof Building]?.map((item: any, i) => {
                          
                          return (
                          <TextField 
                            key={i}
                            // @ts-ignore
                            onChange={(e) => handleStateChange(`${field.name}-${i}`, e.target.value)}
                            required={field.required || false}
                            // @ts-ignore
                            multiline={field.multiline || false}
                            type={field.type}
                            sx={textboxStyling}
                            fullWidth
                            id="outlined-basic" 
                            label={`${field.label} ${i+1}`} 
                            variant="filled"
                            defaultValue={item} />
                        )})
                      } */}
                      <TextField 
                            key={index}
                            // @ts-ignore
                            onChange={(e) => handleStateChange(`${field.name}`, e.target.value.split(","))}
                            required={field.required || false}
                            // @ts-ignore
                            multiline={field.multiline || false}
                            type={field.type == "password" && showHidden ? "text" : field.type}
                            sx={textboxStyling}
                            fullWidth
                            id="outlined-basic" 
                            disabled={field.disabled || false}
                            label={`${field.label}`} 
                            variant="filled"
                            defaultValue={(field.rawOutput ? JSON.stringify(data[`${field.name}` as keyof typeof data]) : `${data[`${field.name}` as keyof typeof data]?.toString()}`)} />
                    </div>
                  )
                }

                // object handling
                else if (field.object && data[field.name]) {
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
                        Object.entries(data[`${field.name}` as keyof typeof data] as Object).map((item: any, i) => {
                        //console.log(item);
                        return (
                          <div className="my-2" key={i}>
                            <TextField 
                            //key={`${text}-${i}`}
                            // @ts-ignore
                            onChange={(e) => handleStateChange(`${field.name}`, e.target.value, field.objectArr ? i : item[0])}
                            required={field.required || false}
                            // @ts-ignore
                            multiline={field.multiline || false}
                            type={field.type == "password" && showHidden ? "text" : field.type}
                            sx={textboxStyling}
                            fullWidth
                            id="outlined-basic" 
                            disabled={field.disabled || false}
                            label={item[0]} 
                            variant="filled"
                            defaultValue={(field.rawOutput ? JSON.stringify(item[1]) : item[1])} />
                          </div>
                        )
                        })
                      }
                      </div>
                    )
                  }
                }

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
                        type={field.type == "password" && showHidden ? "text" : field.type}
                        sx={textboxStyling}
                        fullWidth
                        id="outlined-basic" 
                        disabled={field.disabled || false}
                        label={field.label} 
                        variant="filled"
                        defaultValue={data[`${field.name}` as keyof typeof data]} />
                    </div>
                  )
                }

              }
                
              )
            }

            <button type="submit">Save</button>
          </div>
        </form>

        <div className="flex flex-col lg:ml-[2rem] lg:max-w-[50%]">
          <h1 className="text-2xl">JSON Data</h1>
          <pre className="codeblock">
            {
              JSON.stringify(data, undefined, 3)
            }
          </pre>
        </div>
        
      </div>
      
        
        
    </div>
  )
}

export default InfoListing