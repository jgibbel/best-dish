import React, {useState, useEffect}  from 'react'



export default function Form(props) {

    // const [input, setInput] = useState('')

    // props.handleForm()

    // const handleOnChange = (e) => {
    //     setInput(e.target.value)
    //     console.log(input)
    //     debugger

    //     props.handleForm(e.target.value)
    // }

    // useEffect(){


    // }

    return (
        <form>
            <input value={props.input} onChange={(e)=> {props.handleSearchForm(e.target.value)}} type="text" placeholder="search"/>
        </form>
        
    )
}
