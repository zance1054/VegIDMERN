/*
  Alexander Fielding

  Description:  the following is a aggregate of actions the front-end developer calls
                to pull data from the mongoDB database using mongoose. Each functions
                makes an API call that we developed to pull the information from our
                local host (server in our network) this API call is dipatched to our
                redux-reducers to capture and save the state of the the json object
                being returned from our API
*/

/*
  User functions begin here
*/
// create a new user that POSTS to mongoDB

import ipAddress from '../utils/address';

export const createNewUser = ({firstName,lastName, email,password,aboutme}) =>
{
  return(dispatch) => {
    fetch(ipAddress + '/user', {
      method: "POST",
      body: JSON.stringify({
        "firstName": firstName,
        "lastName": lastName,
        "email": email,
        "password": password,
        "aboutme": aboutme,
      }),
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    })
    .then((response) => console.log(response))
    .then(() => {
      dispatch({type: 'NEW_USER'}); //calls the reducer
    })
    .catch(error => console.log(error))
  };
};

export const loadInitialUsers = () => {
    return (dispatch) => {
        fetch(ipAddress + '/user')
            .then((response) => {
                return response.json();})
            .then((data) => {
                dispatch({ type: 'INITIAL_FETCH', payload: data })
            })
            .catch(error => console.log(error))
    };
};



export const selectedUser = (usersId) => {
    return {
        type: 'SELECTED_USER',
        selectId: usersId,
        name: "asdf"
    };
};

export const deleteUser = (id) => {
    return (dispatch) => {
        fetch(ipAddress + `/user${id}`, { method: "DELETE"})
            .then(() => {
                dispatch({ type: 'DELETE_USER'});
            })
    }
}

export const updateUser = (USER) => {
    return {
        type: 'UPDATE_USER',
        payload: USER,
    }
}

export const saveUser = ({ firstName,lastName, email,password, _id }) => {
    return (dispatch) => {
        fetch(ipAddress + `/user${id}`, {
            method: "PUT",
            body: JSON.stringify({
                "firstName": firstName,
                "lastName": lastName,
                "email": email,
                "password": password,
            }),
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })
        .then((response) => console.log(response))
        .then(() => {
            dispatch({ type: 'SAVE_USER' });
        })
        .catch(error => console.log(error))
    };
}
/*
  Neither plant nor user (form updaters)
*/
export const noneSelected = () => {
    return {
        type: 'NONE_SELECTED',
    };
};


export const formUpdate = ({ prop, value }) => {
    return {
        type: 'FORM_UPDATE',
        payload: { prop, value },
    };
};
