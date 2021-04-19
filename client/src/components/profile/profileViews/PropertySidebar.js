import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import 'animate.css'
//prettier-ignore
import {
  getTokenFromLocalStorage

} from '../../../helpers/auth'

import axios from 'axios'

// components

const UpdateProfile = ({ propID }) => {
  const token = getTokenFromLocalStorage()

  const [errors, setErrors] = useState('')
  const { register, handleSubmit } = useForm({})
  const [notes, setNotes] = useState('')

  const [noteChange, setNoteChange] = useState(0)

  //prettier-ignore

  const onSubmit = async (data) => {
    const text = data.text
    setNoteChange(noteChange + 1)
    const formData = {
      text,
      saved_property: propID,
    }

  

    try {
      await axios.post('/api/notes/', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    } catch (err) {
      setErrors(err.response.data)
    }
  }

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(`api/savedproperties/${propID}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      setNotes(data)
    }
    getData()
  }, [propID, noteChange])

  return (
    <>
      {/* This is the form box here */}
      <div className="form-header ">
        <br />
        <h3> {notes.address}</h3>
        <p>Add notes to this property</p>
      </div>
      <br />
      <div className="note-list">
        <ul>
          {notes.notes &&
            notes.notes.map((note) => {
              return (
                <li className="note-item" key={note.id}>
                  {note.text}
                </li>
              )
            })}
        </ul>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="column sidebar-form">
        <div className="field">
          <div className="control">
            <div className="form-label">
              <label>Notes</label>
            </div>
            <textarea
              className={`textarea ${errors.notes ? 'is-danger' : ''}`}
              placeholder="Enter notes"
              name="text"
              ref={register}
              required={true}
              rows="10"
              {...register('text')}
            />
            <p className="help is-danger">{errors.email}</p>
          </div>
        </div>

        <div className="field">
          <p className="control">
            <button className="button form-button" type="submit">
              Add Notes
            </button>
          </p>
        </div>
      </form>
      <br />
    </>
  )
}

export default UpdateProfile
