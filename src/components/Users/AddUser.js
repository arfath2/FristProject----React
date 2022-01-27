import React, { useState, useRef  } from "react";
import Card from "../UI/Card";
import classes from "./AddUser.module.css"
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";
import Wrapper from "../Helpers/Wrapper";

const AddUser = props =>{
     const nameIputRef = useRef();
     const ageInputRef = useRef();
    const [error,setError]=useState('');

    const addUserHandler = (event) =>{
    event.preventDefault();
    const enteredName = nameIputRef.current.value;
    const enteredAge = ageInputRef.current.value;
    if(enteredName.trim().length === 0 || enteredAge.trim().length === 0){
        setError({
            title:'Invalid Input',
            message: "please enter valid name and age with non empty values"
        })
    }

    if(+enteredAge < 1){
        setError({
            title:'Invalid age',
            message: "please enter valid age"
        })
    }
    props.onAddUser(enteredName,enteredAge);
    nameIputRef.current.value='';
    ageInputRef.current.value='';
    } 

    const onErrorHandler =()=>{
        setError(null)
    }

return(
    <Wrapper>
     {error && <ErrorModal title={error.title} message={error.message} onConfirm={onErrorHandler}/>   }
        <Card className={classes.input}>
            <form onSubmit={addUserHandler}>
                <label htmlFor="username">User Name</label>
                <input id="username" type="text" ref={nameIputRef} />
                <label htmlFor="age">Age (in years)</label>
                <input id="age" type="number" ref={ageInputRef}/>
                <Button type="submit">Submit</Button>
            </form>
        </Card>
    </Wrapper>
);
}

export default AddUser;