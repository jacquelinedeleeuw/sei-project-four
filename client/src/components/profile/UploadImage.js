import React, { useState } from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { getTokenFromLocalStorage, getPayloadFromToken } from '../../helpers/auth'

const uploadUrl = process.env.REACT_APP_CLOUDINARY_URL
const uploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET


const UploadImage = () => {

  const [ errors, setErrors ] = useState('')

  const [imageUrl, setImageUrl] = useState({
    profile_image: '',
  })

  console.log(imageUrl)

  const token = getTokenFromLocalStorage()

  const userID = (getPayloadFromToken().sub)

  const handleUpload = async event => {
    try {
      const data = new FormData()
      data.append('file', event.target.files[0])
      data.append('upload_preset', uploadPreset)
      console.log('DATA', data)
      const response = await axios.post(uploadUrl, data)
      setImageUrl(response.data.url)
      console.log('RESPONSE', response.data.url)
    } catch (err) {
      setErrors(err.response.data.detail)
    }
  }

  const { register, handleSubmit } = useForm()
  const onSubmit = async data => {
    console.log(data)
    console.log(imageUrl)
    try {
      await axios.patch(`/api/auth/${userID}/`, { 'profile_image': imageUrl, 'password': data.password, 'password_confirmation': data.password }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      history.push('/myprofile')
    } catch (err) {
      console.log(err.response)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="column box is-half is-offset-one-quarter">
      <label>Profile Image</label>
      <input
        className="input"
        type="file"
        onChange={handleUpload}
        required={true}
      />
      <div className="field">
        <div className="control">
          <input
            className={`input ${errors ? 'is-danger' : ''}`}
            placeholder='Enter password'
            name='password'
            type="password"
            ref={register}
            required={true}
          />
          <p className="help is-danger">{errors}</p>
        </div>
      </div>
      <button onSubmit={handleSubmit}>Submit</button>
    </form>
  )
}

export default UploadImage
