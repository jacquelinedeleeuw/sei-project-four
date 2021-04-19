import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//prettier-ignore
import {
  faTimesCircle

} from '@fortawesome/free-solid-svg-icons'
import { faStickyNote } from '@fortawesome/free-regular-svg-icons'
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

  const onDelete = async (id) => {

    console.log(id)
    // try {
    //   await axios.delete('/api/notes/', {id}, {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   })
    // } catch (err) {
    //   setErrors(err.response.data)
    // }
  }

  onDelete()

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
        <Link
          to={`/properties/${notes.listing_id}/${notes.postcode}/${notes.beds}`}
        >
          <h3> {notes.address}</h3>
        </Link>

        <p>Add notes to this property</p>
      </div>
      <br />
      <div className="note-list">
        <ul>
          {notes.notes &&
            notes.notes.map((note) => {
              return (
                <li className="note-item" key={note.id}>
                  <FontAwesomeIcon
                    icon={faStickyNote}
                    className="saved-location-icon fa-1x fa-fw"
                  />
                  {note.text}
                  <FontAwesomeIcon
                    icon={faTimesCircle}
                    className="saved-location-sidebar-icon fa-1x fa-fw"
                    onClick={() => onDelete(note.id)}
                  />{' '}
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
