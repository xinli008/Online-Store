import React from 'react';
import axios from 'axios';

const Test_getLoggedInUser = ()=> {


    const getLoggedInUser = ( )=>{
   
        axios 
          .get(
            'http://localhost:8000/api/users/getLoggedInUser',
            {
              withCredentials: true
            }
          )
          .then (res=>{
            console.log(res);
          })
          .catch(err=>{
            console.log(err);
          })
        
        }

        return (

            <React.Fragment>
                <button onClick={getLoggedInUser}>Test getLoggedInUser</button>
            </React.Fragment>

        )
        

}

export default Test_getLoggedInUser;
