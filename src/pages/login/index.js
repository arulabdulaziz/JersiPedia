import {connect} from 'react-redux';
import {loginUser} from '@store/actions';
import Login from './login';

const mapStateToProps = state => ({
  dataUser: state.authReducer.loginData,
  loading: state.authReducer.loginLoading,
  error: state.authReducer.loginError,
});
const mapStateToDispatch = dispatch => ({
  loginUser: (email, password) => dispatch(loginUser(email, password)),
});
export default connect(mapStateToProps, mapStateToDispatch)(Login);
