import React, { useState } from "react";
import Card from "../UI/Card";
import classes from "./AddUser.module.css"
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";
import Wrapper from "../Helpers/Wrapper";

const AddUser = props =>{
    const [enteredName,setEnteredName]=useState('');
    const [enteredAge,setEnteredAge]=useState('');
    const [error,setError]=useState('');

    const addUserHandler = (event) =>{
    event.preventDefault();
    if(enteredName.trim().length === 0 && enteredAge.trim().length === 0){
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
    setEnteredName('')
    setEnteredAge('')
    }

    const userNameHandler = event =>{
        setEnteredName(event.target.value)
    }   
    const userAgeHandler = event =>{
        setEnteredAge(event.target.value)
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
                <input id="username" type="text" value={enteredName} onChange={userNameHandler} />
                <label htmlFor="age">Age (in years)</label>
                <input id="age" type="number" value={enteredAge} onChange={userAgeHandler} />
                <Button type="submit">Submit</Button>
            </form>
        </Card>
    </Wrapper>
);
}

export default AddUser;