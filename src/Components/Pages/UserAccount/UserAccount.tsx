import React from 'react'
import './UserProfile/UserProfile.css';
import { NavLink,  Outlet} from 'react-router-dom';
import type { RootState } from "../../../Store/Store";
import { useSelector} from "react-redux";
// import { setuser } from '../../../Store/Userslice';
// import axios from 'axios';

const UserAccount:React.FC = () => {
    // const dispatch=useDispatch();
    const user = useSelector((state: RootState) => state.user.user)!;
    // const navigate=useNavigate();



    // Handle Logout::
    // const handleLogout= async ()=> {
    //     if (!user || !user.id){
    //         dispatch(setuser(null));
    //         localStorage.removeItem("user");
    //         navigate('/')

    //         return;
    //     }

    //     // await axios.delete(`https://68e4e1228e116898997d6e79.mockapi.io/signup/${user.id}`);

    //     dispatch(setuser(null));
    //     localStorage.removeItem("user");
    //     localStorage.removeItem("userInfoExtra");
    //     navigate('/')
    // }


    return (
        <>
        <div id="background_home">
            <section id='profile_page' className='section'>

                <div className="container_box profile_page">

                    <div className="profile_boxs">


                        <div className="profile_box_left">
                            <div className="profile_img">
                                { user && (
                                        <img src={`https://ui-avatars.com/api/?name=${user.username}&background=ad343e2c&color=fff&size=128`} alt="" />
                                )}
                            </div>
                            <h4 className='mt-2 fs-5'>{user.username}</h4>


                            <div className="profile_links mt-5">
                                <NavLink to=""
                                    end
                                    className={({ isActive }) => isActive ? "active" : ""}
                                >User Information</NavLink>

                                <NavLink to="orders"
                                    className={({ isActive }) => isActive ? "active" : ""}
                                >Orders</NavLink>
                                                
                                {/* <button className="logout_btn" onClick={handleLogout}
                                >LogOut</button>                                 */}
                            </div>
                        </div>


                        <div className="profile_box_right">
                            <Outlet />
                        </div>


                    </div>

                </div>
            </section>



        </div>
        
        </>
    )
}

export default UserAccount;