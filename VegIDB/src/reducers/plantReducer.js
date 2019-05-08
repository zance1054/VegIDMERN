const initialState = {
    plants: [],
    detailView: false,
    plantSelected: null,
    plantName: '',
    imageFileName: '',
    plantDescription: '',
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

        case 'SELECTED_PLANT':
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

        case 'FORM_UPDATE':
            return {
                ...state,
                [action.payload.prop]: action.payload.value
        }

        case 'NEW_PLANT':
            return {
                ...state,
                plantName: '',
                imageFileName: '',
                plantDescription: '',
            }

        case "ADD_PLANT":
            return {
                ...state,
                ...action.newPlant
        }

        case 'UPDATE_PLANT':
            return {
                ...state,
                toUpdate: true,
                plantName: action.payload.firstName,
                imageFileName: action.payload.lastName,
                plantDescription: action.payload.phone,
        }

        case 'SAVE_PLANT':
            return {
                ...state,
                toUpdate: false,
                detailView: false,
                plantName: '',
                imageFileName: '',
                plantDescription: '',
                _id: '',
        }

        case "DELETE_PLANT":
            return {
                ...state,
                detailView: false,
                personSelected: null,
        }

        default:
            return state;
    }
}
