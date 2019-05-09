/*
plants start here
*/
import ipAddress from '../utils/address';

// add a new plant to the plant collection
export const createNewPlant = ({plantName, imageFileName,imageFile, plantDescription}) =>
{
  return(dispatch) => {
    fetch(ipAddress + '/plant', {
      method: "POST",
      body: JSON.stringify({
        "plantName": plantName,
        "imagefileName": lastName,
        "imageFile": imageFile,
        "plantDescription": email,
      }),
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    })
    .then((response) => response)
    .then(() => {
      dispatch({type: 'NEW_PLANT'}); //calls the reducer
    })
    .catch(error => error)
  };
};

//get all plants from the plants collection
export const loadInitialPlants = () => {
    return (dispatch) => {
        fetch(ipAddress + '/plant')
            .then((response) => {
                return response.json();})
            .then((data) => {
                dispatch({ type: 'INITIAL_FETCH', payload: data })
            })
            .catch(error => console.log(error))
    };
};

//find a specific plant and get its attributes
export const selectedPlant = (usersId) => {
    return {
        type: 'SELECTED_PLANT',
        selectId: usersId,
        name: "dlskfnasd"
    };
};

//delete a plant from the plants collection
export const deletePlant = (id) => {
    return (dispatch) => {
        fetch(ipAddress + `/plant/plant/${id}`, { method: "DELETE"})
            .then(() => {
                dispatch({ type: 'DELETE_PLANT'});
            })
    }
}

//update the info on a plant in the plants collection
export const updatePlant = (USER) => {
    return {
        type: 'UPDATE_PLANT',
        payload: plant,
    }
}

export const savePlant = ({ plantName, imageFileName,imageFile, plantDescription }) => {
    return (dispatch) => {
        fetch(ipAddress + `/plant/${id}`, {
            method: "PUT",
            body: JSON.stringify({
                "plantName": plantName,
                "imageFileName": imageFileName,
                "plantDescription": plantDescription,
                "imageFile":imageFile,
            }),
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })
        .then((response) => console.log(response))
        .then(() => {
            dispatch({ type: 'SAVE_PLANT' });
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
