import React, { useState } from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'
//prettier-ignore
import {
  getTokenFromLocalStorage,
  getPayloadFromToken
} from '../../helpers/auth'

const uploadUrl = process.env.REACT_APP_CLOUDINARY_URL
const uploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET

const UploadImage = ({ modal }) => {
  const [errors, setErrors] = useState('')

  const [imageUrl, setImageUrl] = useState({
    profile_image: '',
  })

  const token = getTokenFromLocalStorage()

  const userID = getPayloadFromToken().sub

  const handleUpload = async (event) => {
    try {
      const data = new FormData()
      data.append('file', event.target.files[0])
      data.append('upload_preset', uploadPreset)
      const response = await axios.post(uploadUrl, data)
      setImageUrl(response.data.url)
    } catch (err) {
      setErrors(err.response.data.detail)
    }
  }

  const { register, handleSubmit } = useForm()
  const onSubmit = async (data) => {
    try {
      await axios.patch(
        `/api/auth/${userID}/`,
        {
          profile_image: imageUrl,
          password: data.password,
          password_confirmation: data.password,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      location.reload()
    } catch (err) {
      console.log(err.response)
    }
  }

  const closePopUp = () => {
    modal.current.close()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="column upload-form">
      <h2>Upload a profile image</h2>
      <label>Profile Image</label>
      <br />
      <br />
      <input
        className="input"
        type="file"
        onChange={handleUpload}
        required={true}
        ref={register}
      />
      <br />
      <br />
      <div className="field">
        <p className="help is-danger">{errors}</p>
      </div>

      <div className="detail-button-box ">
        <button
          className="button form-button-cancel"
          onClick={closePopUp}
          type="reset"
        >
          Cancel
        </button>
        <button className="button form-button" onSubmit={handleSubmit}>
          Upload
        </button>
      </div>
    </form>
  )
}

export default UploadImage
