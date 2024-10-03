import "./InputField.css";



const InputNumberField = (props) => {
    return (<div className="form-group" style={{ textAlign: 'left' }}>
        <label style={{ fontsize: '20px', color: 'black' }} >{props.label}</label>
        {props.type === 'decimal' ? props.onChange ?
            <input name={props.name} type={"number"} className='form-control' defaultValue={props.value} onChange={props.onChange} min="0" step="0.01" /> :
            <input name={props.name} type={"number"} className='form-control' defaultValue={props.value} min="0" step="0.01" /> :
            props.onChange ?
                <input name={props.name} type={"number"} className='form-control' defaultValue={props.value} onChange={props.onChange} min="0" /> :
                <input name={props.name} type={"number"} className='form-control' defaultValue={props.value} min="0" />
        }
    </div>);
};
export default InputNumberField;