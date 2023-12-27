import { Link } from "react-router-dom"

const User = (props) => {
    const { index, _id, name, email, gender, age, removeUser } = props

    return (<tr>
        <td>{index}</td>
        <td className="name">{name}</td>
        <td>{email}</td>
        <td className="gender">{gender}</td>
        <td>{age}</td>
        <td className='text-center'>
            <Link to={`update-user/${_id}`}>
                <i className="fa-solid fa-pen-to-square"></i>
            </Link>
        </td>
        <td className='text-center'>
            <span onClick={removeUser}>
                <i className="fa-solid fa-trash-can" style={{ color: "red" }}></i>
            </span>
        </td>
    </tr>)
}
export default User