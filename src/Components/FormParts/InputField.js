import "./InputField.css";



const InputField = (props) => {
    return (<div className="form-group" style={{ padding: '5px' }}>
        <label style={{ fontsize: '20px', color: 'black' }} >{props.label}</label>
        <input name={props.name} type={props.type} className='form-control' defaultValue={props.value} />
    </div>);
};
export default InputField;