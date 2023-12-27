import { useEffect, useState } from "react"
import { Link, useLocation, useParams } from "react-router-dom"
import Input from "./Input"
import { useNavigate } from 'react-router-dom'

const Form = () => {

    const location = useLocation()
    const navigate = useNavigate()
    const { id } = useParams()
    const [formData, setFormData] = useState({
        url: 'http://localhost:3000/users/',
        heading: 'Add User',
        method: 'POST',
        name: '',
        email: '',
        gender: '',
        age: '',
        message: '',
        error:''
    })

    useEffect(() => {
        if (location.pathname.includes('/add-user')) {
            setFormData(prevData => { return { ...prevData, method: "POST", heading: "Add User" } })
        }
        else {
            setFormData(prevData => {
                return {
                    ...prevData,
                    url: `http://localhost:3000/users/${id}`,
                    heading: 'Update User',
                    method: 'PATCH'
                }
            })

            fetch(`http://localhost:3000/users/${id}`)
                .then(response => response.json())
                .then(user => {
                    setFormData(prevData => {
                        return {
                            ...prevData,
                            name: user.name,
                            email: user.email,
                            gender: user.gender,
                            age: user.age
                        }
                    })
                })
                .catch(err => console.log(err.message))
        }

    }, [location.pathname])

    useEffect(() => {
        // Set a timeout to clear the message after 2000 milliseconds (2 seconds)
        const timeoutId = setTimeout(() => {
            setFormData(prevData => {
                return { ...prevData, message: '', error:'' }
            })
        }, 2000);

        // Clean up the timeout when the component unmounts or when the message changes
        return () => clearTimeout(timeoutId)

    }, [formData.message, formData.error]);

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prevData => {
            return {
                ...prevData,
                [name]: value
            }
        })
    }
    const handleSubmit = (event) => {

        event.preventDefault()

        fetch(formData.url, {
            method: formData.method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id, name: formData.name,
                email: formData.email,
                gender: formData.gender,
                age: formData.age
            })
        })
            .then(response => response.json())
            .then(result => {
                setFormData(prevData => {
                    return { ...prevData, name: '', email: '', gender: '', age: '', message: result.message, error:result.error }
                })

                if(formData.method==='PATCH')
                    navigate('/')
            })
            .catch(err => console.log(err.message))
    }

    return (<div className="container my-5">
        <Link to='/' className="fs-6 btn btn-dark">Show All Users</Link>
        <h1 className='fs-2 fw-bold text-center'>{formData.heading}</h1>
        <div className="underline"></div><br />
        {
            (formData.message) ? (<div className="alert alert-success" role="alert">
                {formData.message}
            </div>) : null
        }
        {
            (formData.error) ? (<div className="alert alert-danger" role="alert">
                {formData.error}
            </div>) : null
        }
        <form onSubmit={handleSubmit}>
            <div className="row">
                <Input type="text" name='name' value={formData.name} handleInput={handleInputChange} />
                <Input type="email" name='email' value={formData.email} handleInput={handleInputChange} />
            </div>
            <div className="row">
                <Input type="text" name='gender' value={formData.gender} handleInput={handleInputChange} />
                <Input type="text" name='age' value={formData.age} handleInput={handleInputChange} />
            </div>
            <button type="submit" className="btn btn-primary">{formData.heading.split(' ')[0]}</button>
        </form>
    </div>)
}
export default Form