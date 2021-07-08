// import { useReducer } from 'react';

// Reducer
// import BaseReducer from './baseReducer';

// Context
import BaseContext from './baseContext';

export default function BaseState({ children }) {

    // const initialData = {
        // rowsPerPage: 20,
        // rowsPerPageList: [20, 40, 80, 100, { label: 'All', value: -1 }]
    // }

    // const [ state, dispatch ] = useReducer(BaseReducer, initialData)

    return (
        <BaseContext.Provider
            value={{
                // defaultRowsPerPage: {
                //     rows: state.rowsPerPage,
                //     list: state.rowsPerPageList
                // }
            }}
        >
            {children}
        </BaseContext.Provider>
    )
}