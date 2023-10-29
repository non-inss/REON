import { Fragment, useState } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const navigation = [
  { name: '같이하기', to: '/rank', current: false },
  { name: '혼자하기', to: '/normallist', current: false },
  { name: '투표해줘', to: '/feed', current: false },
  { name: '팀문화', to: '/team', current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Navbar() {
  const userIsLogin = useSelector((state) => state.user.isLogin);
  const [profileImg, setProfileImg] = useState(null);
  const location = useLocation();

  useEffect(() => {
    if (userIsLogin) {
      setProfileImg(process.env.REACT_APP_ALTER_IMG_URL);

      // string 이라 "null"로 받아야 한다.
      const profileImg = localStorage.getItem('profileImg');
      if (profileImg !== 'null' && profileImg) {
        setProfileImg(
          'https://storage.googleapis.com/reon-bucket/' + profileImg,
        );
      }
    }
  }, [userIsLogin]);

  const moveMyPage = () => {
    // navigate("/mypage/" + email)
    // <Link to={"/mypage/" + email}></Link>
    // onClick={() => { moveMyPage(post.email); }}
    // return <Navigate to={"/mypage/"} />;
    // navigate("/mypage/"+email, { replace: true });
    window.location.assign('/mypage/' + localStorage.getItem('email'));
  };

  return (
    <div className="sticky top-0 z-50">
      <Disclosure as="nav" className="bg-white">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
              <div className="relative flex h-16 items-center justify-between">
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex flex-shrink-0 items-center">
                    <Link to="/">
                      <img
                        className="h-10 w-auto"
                        src="/image/logo/logo.png"
                        alt="Your Company"
                      />
                    </Link>
                  </div>
                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4">
                      {navigation.map((item) => (
                        <Link
                          key={item.name}
                          to={item.to}
                          className={classNames(
                            location.pathname === item.to
                              ? ' text-[#45afb8]'
                              : ' hover:text-lightBlue hover:scale-105',
                            ' px-3 py-2 text-md',
                          )}
                          aria-current={
                            location.pathname === item.to ? 'page' : undefined
                          }
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <Menu as="div" className="relative ml-3">
                    <div>
                      {userIsLogin ? (
                        <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-lightBlue focus:ring-offset-2 focus:ring-offset-gray-800">
                          <span className="absolute -inset-1.5" />
                          <span className="sr-only">Open user menu</span>
                          <img
                            className="h-8 w-8 rounded-full"
                            src={profileImg}
                            alt="profileImg"
                          />
                        </Menu.Button>
                      ) : (
                        <Link
                          to="/login"
                          className="hover:text-lightBlue cursor-pointer font-semibold animate-fade-up animate-once animate-ease-in"
                        >
                          로그인
                        </Link>
                      )}
                    </div>
                    <Transition as={Fragment}>
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {userIsLogin ? (
                          <Menu.Item>
                            {({ active }) => (
                              <span
                                className={classNames(
                                  active ? '' : '',
                                  'block px-4 py-2 text-sm text-gray-700 hover:bg-lightBlue hover:cursor-pointer',
                                )}
                                onClick={() => {
                                  moveMyPage();
                                }}
                              >
                                마이페이지
                              </span>
                            )}
                          </Menu.Item>
                        ) : null}
                        {userIsLogin ? (
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to="/logout"
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm text-gray-700 hover:bg-lightBlue',
                                )}
                              >
                                로그아웃
                              </Link>
                            )}
                          </Menu.Item>
                        ) : null}
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
              <Disclosure.Panel className="sm:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2">
                  {navigation.map((item) => (
                    <Disclosure.Button
                      as={Link}
                      key={item.name}
                      to={item.to}
                      className={classNames(
                        location.pathname === item.to
                          ? 'bg-gray-900 text-white'
                          : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'block rounded-md px-3 py-2 text-base font-medium',
                      )}
                      aria-current={
                        location.pathname === item.to ? 'page' : undefined
                      }
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
              </Disclosure.Panel>
            </div>
          </>
        )}
      </Disclosure>
    </div>
  );
}
