const initialState = {
    favorites: [],
    userID: false,
    plantID: null,
    _id: '',
    toUpdate: false,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'INITIAL_FETCH':
            return {
                ...state,
                people: action.payload,
        }

        case 'SELECTED_FAV':
            return {
                ...state,
                detailView: true,
                personSelected: action.selectId
            }

        case 'NONE_SELECTED':
            return {
                ...state,
                detailView: false,
                personSelected: null
        }

        case 'SPECIFIC_FETCH':
          return {
            ...state,
            plantID: action.payload,
          }

        case 'FORM_UPDATE':
            return {
                ...state,
                [action.payload.prop]: action.payload.value
        }

        case 'NEW_FAV':
            return {
                ...state,
                plantName: '',
                imageFileName: '',
                plantDescription: '',
            }

        case "ADD_FAV":
            return {
                ...state,
                ...action.newPlant
        }

        case 'UPDATE_FAV':
            return {
                ...state,
                toUpdate: true,
                plantName: action.payload.firstName,
                imageFileName: action.payload.lastName,
                plantDescription: action.payload.phone,
        }

        case 'SAVE_FAV':
            return {
                ...state,
                toUpdate: false,
                detailView: false,
                plantName: '',
                imageFileName: '',
                plantDescription: '',
                _id: '',
        }

        case "DELETE_FAV":
            return {
                ...state,
                detailView: false,
                personSelected: null,
        }

        default:
            return state;
    }
}
