import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../../api/users";
import { loginUser } from "../../helpers/authHelper";

const SignupPage = () => {
    const navigate = useNavigate();
    const [serverError, setServerError] = useState("");
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = validate();
        if (Object.keys(errors).length !== 0) return;

        const data = await signup(formData);

        if (data.error) {
            setServerError(data.error);
        } else {
            loginUser(data);
            navigate("/");
        }
    };

    const validate = () => {
        const errors = {};
        if (formData.username.length < 6 || formData.username.length > 30) {
            errors.username = "Username must be between 6 and 30 characters long";
        }
        if (formData.username.includes(" ")) {
            errors.username = "Username must not contain spaces";
        }
        if (formData.password.length < 8) {
            errors.password = "Password must be at least 8 characters long";
        }
        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = "Invalid email address";
        }
        setErrors(errors);
        return errors;
    };

    return (
        <div style={{ margin: 'auto', width: '100%', maxWidth: '700px',padding: '10px', backgroundColor: '#1a1a1a', color: '#f0f0f0', borderRadius: '8px', marginTop:"20px", marginBottom:"40px" }}>
            <h1 style={{ marginBottom: '18px', textAlign: 'center', color: '#1ABC9C' }}>BuddyVibes</h1>
            <h2 style={{ marginBottom: '8px', textAlign: 'center' }}>Sign Up</h2>
            <p style={{ textAlign: 'center' }}>Already have an account? <a href="/login" style={{ color: '#6699ff', textDecoration: 'underline' }}>Login</a></p>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '10px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }} htmlFor="username">Username</label>
                    <input type="text" id="username" name="username" style={{ width: '100%', padding: '5px', borderRadius: '4px', border: errors.username ? '1px solid red' : '1px solid #333' }} value={formData.username} onChange={handleChange} />
                    {errors.username && <p style={{ color: 'red', marginTop: '5px' }}>{errors.username}</p>}
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }} htmlFor="email">Email Address</label>
                    <input type="email" id="email" name="email" style={{ width: '100%', padding: '10px', borderRadius: '4px', border: errors.email ? '1px solid red' : '1px solid #333' }} value={formData.email} onChange={handleChange} />
                    {errors.email && <p style={{ color: 'red', marginTop: '5px' }}>{errors.email}</p>}
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }} htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" style={{ width: '100%', padding: '10px', borderRadius: '4px', border: errors.password ? '1px solid red' : '1px solid #333' }} value={formData.password} onChange={handleChange} />
                    {errors.password && <p style={{ color: 'red', marginTop: '5px' }}>{errors.password}</p>}
                </div>
                {serverError && <p style={{ color: 'red', marginBottom: '10px' }}>{serverError}</p>}
                <button type="submit" style={{ width: '100%', padding: '8px', borderRadius: '4px', border: 'none', backgroundColor: '#1ABC9C', color: 'white' }}>Sign Up</button>
            </form>
            <div style={{ marginTop: '15px', textAlign: 'center' }}>
                <p>&copy; {new Date().getFullYear()} BubbyVibes</p>
            </div>
        </div>
    );
};

export default SignupPage;
