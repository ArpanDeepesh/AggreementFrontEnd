import "./InputField.css";



const InputFieldBlank = (props) => {
    return (<span style={{ textAlign: 'left' }}>
        {props.type !== "checkbox"?<label style={{ fontsize: '20px', color: 'black', fontWeight:'500' }} >{props.label} :</label>:<></> }
        
        {props.type === "checkbox" ?
            props.onChange ? <input name={props.name}
                placeholder={props.label}
                type={props.type} className='form-control myAginput'
                defaultChecked={props.value}
                onChange={props.onChange} readOnly={props.readOnlyValue ? props.readOnlyValue : false} style={props.myStyle ? props.myStyle : {
                    margin: '5px'
                }} /> :
                <input name={props.name}
                    type={props.type} className='form-control myAginput' defaultChecked={props.value} readOnly={props.readOnlyValue ? props.readOnlyValue : false} style={props.myStyle ? props.myStyle : {
                        margin: '5px'
                    }} />
            : props.onChange ? <input name={props.name}
                placeholder={props.label}
                type={props.type} className='form-control myAginput' defaultValue={props.value} onChange={props.onChange}
                readOnly={props.readOnlyValue ? props.readOnlyValue : false} style={props.myStyle ? props.myStyle : {
                    margin: '5px'
                }} /> :
                <input name={props.name}
                    type={props.type} className='form-control myAginput' defaultValue={props.value}
                    readOnly={props.readOnlyValue ? props.readOnlyValue : false} style={props.myStyle ? props.myStyle : {
                        margin: '5px'
                    }} />
        }{props.type === "checkbox" ? <label style={{ fontsize: '20px', color: 'black', fontWeight: '500' }} >{props.label}</label> : <></>}
        
    </span>);
};
export default InputFieldBlank;