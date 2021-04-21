import React, { useState, useEffect } from 'react'

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

const PropertySidebar = ({ propID }) => {
  const token = getTokenFromLocalStorage()

  const [errors, setErrors] = useState('')
  // const { register, handleSubmit } = useForm({})
  const [notes, setNotes] = useState('')

  const [noteChange, setNoteChange] = useState(0)

  //prettier-ignore

  const onDelete = async (id) => {
  
    try {
      await axios.delete(`/api/notes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setNoteChange(noteChange + 1)
    } catch (err) {
      setErrors(err.response.data)
      console.log(errors)
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
        <Link
          to={`/properties/${notes.listing_id}/${notes.postcode}/${notes.beds}`}
        >
          <h3> {notes.address}</h3>
        </Link>

        <p>Notes from saved properties</p>
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

      <br />
    </>
  )
}

export default PropertySidebar
