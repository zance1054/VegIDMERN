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
                favorites: action.payload,
        }

        case 'SELECTED_FAV':
            return {
                ...state,
                detailView: true,
                favoriteSelected: action.selectId
            }

        case 'NONE_SELECTED':
            return {
                ...state,
                detailView: false,
                favoriteSelected: null
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
                userID: '',
                plantID: '',
            }

        case "ADD_FAV":
            return {
                ...state,
                ...action.newFavorite
        }


        case 'SAVE_FAV':
            return {
                ...state,
                toUpdate: false,
                detailView: false,
                plantID: '',
                userID: '',
                _id: '',
        }

        case "DELETE_FAV":
            return {
                ...state,
                detailView: false,
                favoriteSelected: null,
        }

        default:
            return state;
    }
}
