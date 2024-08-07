
export const INITIAL_STATE = {
  isValid : {
    title: true,
    date: true,
    post: true
  },
  values : {
    title: '',
    date: '',
    post: '',
    tag: ''
  },
  isFormReadyToSubmit : false

};

export function formReducer (state, action) {
  
  switch(action.type){
  case 'RESET_VALIDITY':{
    return { ...state, isValid:{
      title: !!state.values.title,
      date: !!state.values.date,
      post: !!state.values.post
    }};
  }
  case 'SUBMIT' : {
    const titleValidity = state.values.title?.trim().length;
    const postValidity = state.values.post?.trim().length;
    const dateValidity = state.values.date;
    
    return { 
      ...state,
      isValid: {
        title: titleValidity,
        post: postValidity,
        date: new Date(dateValidity)
      },
      isFormReadyToSubmit: !!titleValidity && !!postValidity && !!dateValidity
    };
  }
  case 'SET_VALUE': {
    
    return {
      ...state, values : {...state.values , ...action.payload}
    };
  }
  case 'CLEAR_VALUE': {
    return {
      values : INITIAL_STATE.values,
      isValid: INITIAL_STATE.isValid,
      isFormReadyToSubmit: INITIAL_STATE.isFormReadyToSubmit
    };
  }
  }
}