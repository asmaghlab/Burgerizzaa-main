import React, {useState, useEffect, useRef} from 'react'
import './UserProfile.css';
import type { RootState } from "../../../../Store/Store";
import { useSelector, useDispatch } from "react-redux";
import { setuser } from "../../../../Store/Userslice";
import axios from 'axios';

const UserProfile:React.FC = () => {

    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user.user)!;


    const username = useRef<HTMLInputElement | null>(null);
    const email = useRef<HTMLInputElement | null>(null);
    const phone = useRef<HTMLInputElement | null>(null);

    // Save Change : 
    const [updateUserInfo, setUpdateUserInfo] = useState({
        username:'',
        email: '',
        password: '',
        location: '',
        phone: '',
    })
    
    const [errors, setErrors] = useState({
        username: '',
        email: '',
        phone: '',
    });
    

    useEffect(() => {
        if (user) {

        const userInfoStored = JSON.parse(localStorage.getItem("userInfoExtra") || "{}");

            setUpdateUserInfo({
                username: user.username || "",
                email: user.email || "",
                password: user.password || user.re_password || "",
                location: userInfoStored.location || "",
                phone: userInfoStored.phone || "",
            });

            console.log(user)
        }

    }, [user]);


    // Handel Change ::
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUpdateUserInfo({ ...updateUserInfo, [e.target.name]: e.target.value })
        setErrors({ ...errors, [e.target.name]: '' });
    }

    // Handle Submite ::
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()


        let hasError = false;
        const newErrors = { username: '', email: '', phone: '' };

        // Validation UserName
        if (!/^[A-Za-z0-9]{2,15}$/.test(updateUserInfo.username)) {
        newErrors.username = "Invalid UserName";
        username.current?.focus();
        hasError = true;
        }

        // Validation Email
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(updateUserInfo.email)) {
        newErrors.email = "Invalid Email";
        email.current?.focus();
        hasError = true;
        }

        // Validation Phone
        else if (updateUserInfo.phone && !/^(010|011|012|015)[0-9]{8}$/.test(updateUserInfo.phone)) {
        newErrors.phone = "Invalid Phone Number";
        phone.current?.focus();
        hasError = true;
        }

        setErrors(newErrors);
        if (hasError) return;  
    

        try {
            const getallUserinfo = await axios.put(
                `https://68e4e1228e116898997d6e79.mockapi.io/signup/${user.id}`,
                
                {
                username: updateUserInfo.username,
                email: updateUserInfo.email,
                password: updateUserInfo.password,
                location:updateUserInfo.location,
                phone:updateUserInfo.phone,
                }

            );

            localStorage.setItem("userInfoExtra", JSON.stringify({
                location:updateUserInfo.location,
                phone:updateUserInfo.phone,
            }))

            const userUpdateInfo={ ...user, ...getallUserinfo.data}
            dispatch(setuser(userUpdateInfo))
            localStorage.setItem("user", JSON.stringify(userUpdateInfo))

            console.log("data updated");
        
        }catch(error){
            console.log(error);
        }
    };


    return (
        <>
            <h4 className='mb-3'>User Information</h4>

            <form id="profile_form" onSubmit={handleSubmit}>


                <div className="profile_input_box">
                    <label htmlFor="username">User Name</label>
                    <input 
                    className='form-control' 
                    type="text" 
                    name='username'
                    id='username'
                    value={updateUserInfo.username}
                    onChange={handleChange}
                    />

                    {errors.username && (
                        <p className="alert_error_userInfo">{errors.username}</p>
                    )}

                </div>


                <div className="profile_input_box">
                    <label htmlFor="email">Email</label>
                    <input className="form-control"
                        name='email'
                        id='email'
                        value={updateUserInfo.email}
                        onChange={handleChange}
                        type="email" />

                    {errors.email && (
                        <p className="alert_error_userInfo">{errors.email}</p>
                    )}

                </div>



                <div className="profile_input_box">
                    <label htmlFor="password">Password</label>
                    <input className='form-control'
                        id='password'
                        name='password'
                        value={updateUserInfo.password}
                        onChange={handleChange}
                        type="password"
                        placeholder='********' 

                        disabled
                    />

                </div>


                <div className="profile_input_boxs">
                    <div className="profile_input_box">
                        <label htmlFor="locatoin">Locatoin</label>
                        <input className='form-control' 
                            name="location"
                            value={updateUserInfo.location}
                            onChange={handleChange}
                            type="text" />
                    </div>

                    <div className="profile_input_box">
                        <label htmlFor="phone">Phone Number</label>
                        <input className='form-control' 
                            name='phone'
                            value={updateUserInfo.phone}
                            onChange={handleChange}
                            type="tel"
                            placeholder='01012345678'
                            />

                        {errors.phone && (
                                <p className="alert_error_userInfo">{errors.phone}</p>
                            )}

                    </div>
                </div>

                <div id="profile_btn">
                    <button className='profile_btn'>Save Change</button>
                </div>


            </form>
        
        </>
    )
}

export default UserProfile;