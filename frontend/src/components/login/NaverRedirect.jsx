import axios from 'axios';
import { useEffect, useRef } from 'react';
import { userLogin } from 'redux/userSlice';
// import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import 'components/login/styles.css';

const NaverRedirect = () => {
  const code = new URL(window.location.href).searchParams.get('code');
  const state = process.env.REACT_APP_STATE;
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const check = useRef(true);

  useEffect(() => {
    if (check.current === true) {
      const NaverLogin = async () => {
        axios
          .post(
            process.env.REACT_APP_API + `/api/auth/naver`,
            { authorizationCode: code, state: state },
            {
              headers: {
                'Content-Type': 'application/json',
              },
            },
          )
          .then((response) => {
            // 액세스 토큰 설정
            localStorage.setItem('accessToken', response.data.accessToken);
            localStorage.setItem('email', response.data.email);
            localStorage.setItem('profileImg', response.data.profileImg);
            localStorage.setItem('nickName', response.data.nickName);
            // 액세스 토큰 설정
            dispatch(userLogin());
          })
          .catch((error) => {
            console.error(error);
            Swal.fire({
              icon: 'error',
              title: '로그인',
              html: '로그인 중 문제가 발생했습니다. <br/>로그인 페이지로 다시 이동합니다.',
              customClass: {
                container: 'custom-swal-container',
              },
              willClose: () => {
                localStorage.clear();
                window.location.replace('/login');
              },
            });
          });
      };
      NaverLogin();
    }

    return () => {
      check.current = false;
    };
  }, []);

  const loading = '/image/login/loading.svg';

  return (
    <>
      <div
        className="flex w-screen justify-center align-middle"
        style={{ height: '90vh' }}
      >
        <img src={loading} alt="loading" width="150px" height="150px" />
      </div>
    </>
  );
};

export default NaverRedirect;
