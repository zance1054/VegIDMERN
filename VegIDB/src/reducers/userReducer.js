const initialState = {
    people: [],
    detailView: false,
    personSelected: null,
    firstName: '',
    lastName: '',
    email: '',
    password: '',
}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'INITIAL_FETCH':
            return {
                ...state,
                people: action.payload,
        }

        case 'SELECTED_USER':
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

        case 'NEW_USER':
            return {
                ...state,
                firstName: '',
                lastName: '',
                email: '',
                password: '',
            }

        case "ADD_USER":
            return {
                ...state,
                ...action.newPerson
        }

        case 'UPDATE_USER':
            return {
                ...state,
                toUpdate: true,
                firstName: action.payload.firstName,
                lastName: action.payload.lastName,
                phone: action.payload.phone,
                email: action.payload.email,
                password: action.payload.password,
                _id: action.payload._id,
        }

        case 'SAVE_USER':
            return {
                ...state,
                toUpdate: false,
                detailView: false,
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                _id: '',
        }

        case "DELETE_USER":
            return {
                ...state,
                detailView: false,
                personSelected: null,
        }

        default:
            return state;
    }
}
