import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { signup } from '../../../services/authservice';
import './registerForm.css';
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import axios from 'axios';

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const RegisterForm = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [avatar, setAvatar] = useState("");
  const [files, setFiles] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      alert('Passwords do not match');
    } else {
      const userData = {
        name: name,
        email: email,
        password: password,
        password_confirmation: password2,
        role: 'user',
        avatar: avatar
      };
      signup(userData).then((res) => {
        console.log(res);
        if (res) navigate('/login');
        else alert("Register with errors");
      })
      .catch((err) => { alert("Register with errors"); console.log(err); });
    }
  };

  const serverOptions = () => {
    return {
      process: (fieldName, file, metadata, load, error, progress, abort) => {
        console.log('File received for upload:', file);

        const data = new FormData();
        data.append('file', file);
        data.append('upload_preset', 'restaurant');
        data.append('cloud_name', 'dodwl1wzo');
        data.append('public_id', file.name);

        axios.post('https://api.cloudinary.com/v1_1/dodwl1wzo/image/upload', data, {
          headers: { 'Content-Type': 'multipart/form-data' },
          onUploadProgress: (event) => {
            progress(true, event.loaded, event.total);
          }
        })
          .then((response) => {
            console.log('Upload successful:', response.data);
            setAvatar(response.data.secure_url);
            load(response.data.secure_url);
          })
          .catch((uploadError) => {
            console.error('Error uploading file:', uploadError);
            error('Upload failed');
            abort();
          });

        return {
          abort: () => {
            console.log('Upload aborted');
            abort();
          }
        };
      }
    };
  };

  return (
    <div className="register-container">
      <div className="register-form-container">
        <form onSubmit={handleSubmit} className="register-form">
          <h2>Create Account</h2>
          <div className="input-group">
            <div className="input-wrapper">
              <i className="fas fa-user"></i>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                required
              />
            </div>
          </div>
          <div className="input-group">
            <div className="input-wrapper">
              <i className="fas fa-envelope"></i>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
              />
            </div>
          </div>
          <div className="input-group">
            <div className="input-wrapper">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
            </div>
          </div>
          <div className="input-group">
            <div className="input-wrapper">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                placeholder="Confirm Password"
                required
              />
            </div>
          </div>
          <div className="input-group">
            <div className="filepond-container">
              <FilePond
                files={files}
                acceptedFileTypes="image/*"
                onupdatefiles={setFiles}
                allowMultiple={false}
                server={serverOptions()}
                name="avatar"
                labelIdle='Drag & Drop your avatar or <span class="filepond--label-action">Browse</span>'
              />
            </div>
          </div>
          
          <button className="buttonRegister" type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;

