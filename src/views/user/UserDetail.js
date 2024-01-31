import React from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormCheck,
  CFormInput,
  CFormFeedback,
  CFormLabel,
  CFormSelect,
  CFormTextarea,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'

import { useParams } from 'react-router-dom'

import { getUserById, createUser, updateUser } from '../../services/user-service'

import { useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom'

import { useCookies } from 'react-cookie';

const Details = () => {
    
    const navigate = useNavigate()

    const [cookies, removeCookie] = useCookies(['User']);

    const params = useParams()

    const userId = params.userId

    console.log(userId)

    const [user, setUser] = useState({})
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [type, setType] = useState('')
    const [password, setPassword ] = useState('')
    const [confirmPassword, setConfirmPassword ] = useState('')
    const [passwordInvalid , setPasswordInvalid ] = useState(false)
    const [phoneNumber , setPhoneNumber ] = useState('')

    useEffect(() => {
        getUser();
    }
    , []
    )

    const getUser = () => {
        if(userId){
          getUserById(userId).then((response) => {
            console.log(response);
            const user = response.data;
          
            setUser(user)
            setName(user.name)
            setType(user.type)
            setEmail(user.email)
            setPhoneNumber(user.phoneNumber)
    
            if(user.id){
              console.log(user);   
            }
        }).catch(error =>{ console.log(error);})
      }else {
        setType("Choose...")
      }
    }
  

  const [validated, setValidated] = useState(false)
  const handleSubmit = (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }
    
    if(userId) {
      // update   
      if(password !== confirmPassword){
        setValidated(false)
        setPasswordInvalid(true) 
      }else{
        setValidated(true)
        const user = { id:userId, name, type, email, password, phoneNumber }
        updateUser(userId, user).then((response) => {
          navigate("/user-list")
        }).catch((err) => {console.log(err);})    
      }
    } else{
      // create
      if(password !== confirmPassword){
        setValidated(false)
        setPasswordInvalid(true) 
      }else{
  
        setValidated(true)
        const user = { name, type, email, password, phoneNumber }
        createUser(user).then((response) => {
          navigate("/user-list")
        }).catch((err) => {console.log(err);})    
      }
    }
  }
    
  return (
    <CForm
      className="row g-3 needs-validation"
      noValidate
      validated={validated}
      onSubmit={handleSubmit} 
    >
      <CCol md={6}>
        <CFormLabel htmlFor="validationCustom01">Name</CFormLabel>
        <CFormInput type="text" id="validationCustom01" required value={name} onChange={(e) => setName(e.target.value) } />
        <CFormFeedback valid>Looks good!</CFormFeedback>
      </CCol>
      <CCol md={6}>
        <CFormLabel htmlFor="validationCustom02">Email</CFormLabel>
        <CFormInput type="text" id="validationCustom02" required value={email} onChange={(e) => setEmail(e.target.value) } />
        <CFormFeedback valid>Looks good!</CFormFeedback>
      </CCol>
      <CCol md={6}>
        <CFormLabel htmlFor="validationCustom03">Password</CFormLabel>
        <CFormInput type="password" id="validationCustom03" required value={password} onChange={(e) => setPassword(e.target.value) } />
        <CFormFeedback valid>Looks good!</CFormFeedback>
      </CCol>
      <CCol md={6}>
        <CFormLabel htmlFor="validationCustom04">Confirm Password</CFormLabel>
        <CFormInput 
          type="password" 
          id="validationCustom04" 
          required 
          value={confirmPassword} 
          invalid = {passwordInvalid}
          onChange={(e) => setConfirmPassword(e.target.value) } />
        <CFormFeedback valid>Looks good!</CFormFeedback>
        <CFormFeedback invalid>Password not matching!!!</CFormFeedback>
      </CCol>
      <CCol md={6}>
        <CFormLabel htmlFor="validationCustom05">Type</CFormLabel>
        <CFormSelect id="validationCustom05" disabled = {cookies.User == user.id} value={type} onChange={(e) => setType(e.target.value) }>
          <option disabled>Choose...</option>
          <option>ADMIN</option>
          <option>USER</option> 
          <option>SUPERWISER</option>
          {user.type === "SUPERUSER" ? <option>SUPERUSER</option> : "" }
        </CFormSelect>
        <CFormFeedback invalid>Please provide a valid type.</CFormFeedback>
      </CCol>
      <CCol md={6}>
        <CFormLabel htmlFor="validationCustom06">Phone Number</CFormLabel>
        <CFormInput type="text" id="validationCustom06" required value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value) } />
        <CFormFeedback valid>Looks good!</CFormFeedback>
      </CCol>
      <CCol xs={12}>
        <CRow> 
          <CCol xs={4}></CCol> 
          <CCol xs={4}></CCol> 
          <CCol xs={4} >
            <CRow className="align-items-end">
              <CCol xs={3}></CCol>
              <CCol xs={4}>
                <CRow>
                  <CButton color="primary" type="submit" className="ms-2"> 
                    Submit
                  </CButton>
                  </CRow>  
              </CCol>
              <CCol xs={1}></CCol>
              <CCol xs={3}>
                <CRow>
                  <CButton color="secondary" type="button" className="ms-2">
                    Clear
                  </CButton>
                </CRow>  
              </CCol>
              <CCol xs={1}></CCol>
            </CRow>
          </CCol> 
        </CRow>
        
      </CCol>
    </CForm>
  )
}

function UserDetail() {

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <h4>User Details</h4>
          </CCardHeader>
          <CCardBody>
            <p className="text-medium-emphasis small">
              Complete Detail of the User
            </p>
            {Details()}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>

  )
}

export default UserDetail;