import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { history } from '../../index'
import { ACCESS_TOKEN, getStore, getStoreJSON, http, setCookie, setStore, setStoreJSON, USER_LOGIN } from '../../util/config';

const initialState = {
    userLogin: getStoreJSON(USER_LOGIN), //null
    newUser: {},
}

const userReducer = createSlice({
    name: 'userReducer',
    initialState,
    reducers: {
        setUserLoginAction : (state,action) => {
            let userLogin = action.payload;
            state.userLogin =  userLogin;
            // state.userLogin.email = email;
        },
        setNewUser: (state, action) => {
            state.newUser = action.payload;
        }
    }
});

export const { setUserLoginAction, setNewUser } = userReducer.actions

export default userReducer.reducer

/* ---------------- action api (Thunk) ----------------- */
export const signinApi = (userLogin) => { //userLogin = {email:'',password}


    return async dispatch => {
        try {
            let result = await http.post('/Users/signin',userLogin);

            //thành công
            //Lưu lại token
            setStore(ACCESS_TOKEN,result.data.content.accessToken);
            setCookie(result.data.content.accessToken,30,ACCESS_TOKEN);
            //Lưu email 
            setStoreJSON(USER_LOGIN,result.data.content)
        
            // console.log(result);
            //Đưa lên userLogin thành công lên reducer
            //result.data.content = {email:'',accessToken:''}
            const action = setUserLoginAction(result.data.content);
            dispatch(action);

            history.push('/profile');


        } catch (err) {
            console.log({err});
            alert('Tài khoản hoăc 1 mật khẩu không đúng !')
            history.push('/');

        }
    }
}


//call api getProfile
export const getProfileApi = ()=>{

    return async dispatch => {
        try {
            let result = await http.post('/users/getprofile');


            console.log('Kết quả',result.data.content)
            //Tạo ra actioncreator => dispatch lên redux
            const action = setUserLoginAction(result.data.content);
            dispatch(action);
        }catch(err){
            alert('Đăng nhập để vào trang này !');
            history.push('/login');
            console.log({err})
        }
    } 
}

export const signupApi = (userSignin) => {  // { "email": "", "password": "",  "name": "",  "gender": true, "phone": "" }
    return async dispatch => {
        try {
            let result = await http.post('/users/signup', userSignin);
            console.log('result', result.data.content);

            const action = setNewUser(result.data.content);
            dispatch(action);

            history.push('/login');
        } catch (err) {
            console.log(err);
        }
    }
}