const Input = (props) => {
    const {type, name, value, handleInput}=props
    return (<div className="mb-3 col-6">
        <label htmlFor={name} className="form-label">{name[0].toUpperCase()+name.substr(1)}</label>
        <input 
            type={type} className="form-control" 
            id={name} name={name} value={value} 
            onChange={handleInput} 
            placeholder={`Enter your ${name}`} 
        />
    </div>)
}
export default Input