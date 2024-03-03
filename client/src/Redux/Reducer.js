import {toast} from 'react-toastify';
import {
  LOGIN_USER,
  LOGIN_USER_FULFILLED,
  LOGIN_USER_PENDING,
  LOGIN_USER_REJECTED,
  USER_LOGIN_STATUS,
  USER_LOGIN_STATUS_FULFILLED,
  USER_LOGIN_STATUS_PENDING,
  USER_LOGIN_STATUS_REJECTED,
  REGISTER_USER,
  REGISTER_USER_FULFILLED,
  REGISTER_USER_PENDING,
  REGISTER_USER_REJECTED,
} from "./ActionTypes";
const initialState = {
  userToken: "",
  isUserLoggedIn: false,
  isLoading: false,
  userRegistrationSuccessful:undefined,
  activeUserDetails: {
    username: "",
    email: "",
    _id: "",
    followers: [],
    following: [],
    favorite: [],
  },
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER: {
      return {
        ...state,
        isLoading: true,
      }
    }
    case REGISTER_USER_FULFILLED: {
      return {
        ...state,
        isLoading: false,
        userRegistrationSuccessful: true,
      }
    }
    case REGISTER_USER_PENDING: {
      return {
        ...state,
        isLoading: true,
      }
    }
    case REGISTER_USER_REJECTED: {
      toast.error('Sorry Try again later!')
      return {
        ...state,
        isLoading: false,
        userRegistrationSuccessful: false,
      }
    }
    case LOGIN_USER: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case LOGIN_USER_FULFILLED: {
      const {
        data: {
          token,
          user: { username, email, _id, followers, following, favorite },
        },
      } = action.payload;
      toast.success(`welcome ${email}`);
      localStorage.setItem("token", token);
      const user = {
        username,
        email,
        _id,
        followers,
        following,
        favorite,
      };
      return {
        ...state,
        isLoading: false,
        userToken: token,
        activeUserDetails: user,
      };
    }
    case LOGIN_USER_PENDING: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case LOGIN_USER_REJECTED: {
      const {
        res: { data },
      } = action.payload;
      toast.error(data);
      return {
        isLoading: false,
      };
    }
    case USER_LOGIN_STATUS: {
      return {
        ...state,
      };
    }
    case USER_LOGIN_STATUS_FULFILLED: {
      const { user, favoritePosts } = action.payload;
      const token = localStorage.getItem("TOKEN");
      const { favorite, username, email, _id, followers, following } = user;

      return {
        ...state,
        isUserLoggedIn: true,
        activeUserDetails: {
          username,
          email,
          _id,
          followers,
          following,
          favorite: favoritePosts,
        },
        favoritePostIds: favorite,
        userToken: token,
      };
    }
    case USER_LOGIN_STATUS_PENDING: {
      return {
        ...state,
        isUserLoggedIn: false,
      };
    }
    case USER_LOGIN_STATUS_REJECTED: {
      const { message } = action.payload;
      toast.error(message);
      return {
        ...state,
        isUserLoggedIn: false,
      };
    }
    default:
      return state;
  }
};
export default reducer;