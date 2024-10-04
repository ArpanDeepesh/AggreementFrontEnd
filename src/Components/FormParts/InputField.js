import "./InputField.css";



const InputField = (props) => {
    return (<div className="form-group" style={{ textAlign: 'left' }}>
        <label style={{ fontsize: '20px', color: 'black'  }} >{props.label}</label>
        {props.type === "checkbox" ?
            props.onChange ? <input name={props.name} type={props.type} className='form-control' defaultChecked={props.value}
                onChange={props.onChange} readOnly={props.readOnlyValue ? props.readOnlyValue : false} /> :
                <input name={props.name} type={props.type} className='form-control' defaultChecked={props.value} readOnly={props.readOnlyValue ? props.readOnlyValue : false} />
            : props.onChange ? <input name={props.name} type={props.type} className='form-control' defaultValue={props.value} onChange={props.onChange}
                readOnly={props.readOnlyValue ? props.readOnlyValue : false} /> :
                <input name={props.name} type={props.type} className='form-control' defaultValue={props.value}
                    readOnly={props.readOnlyValue ? props.readOnlyValue : false} />
    }
        
    </div>);
};
export default InputField;