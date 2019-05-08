/*
  favorites start
*/

import ipAddress from './utils/address';


export const addNewFavorite = ({plantID, userID}) =>
{
  return(dispatch) => {
    fetch(ipAddress + '/favorites', {
      method: "POST",
      body: JSON.stringify({
        "plantID": plantID,
        "userID": userID,
      }),
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    })
    .then((response) => response)
    .then(() => {
      dispatch({type: 'NEW_FAV'}); //calls the reducer
    })
    .catch(error => error)
  };
};

/*
  get favorites of a single user
*/
export const selectedFavorite = (usersId) => {
    return {
        type: 'SELECTED_FAV',
        selectId: usersId,
    };
};

/*
  delete a favorite
*/
export const deleteFavorite = (id) => {
    return (dispatch) => {
        fetch(ipAddress + `/favorite${id}`, { method: "DELETE"})
            .then(() => {
                dispatch({ type: 'DELETE_FAV'});
            })
    }
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
