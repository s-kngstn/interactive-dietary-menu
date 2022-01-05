import styles from "../../styles/Home.module.css";

const Checkbox = ({ type = 'checkbox', name, checked = false, onChange }) => {
  console.log("Checkbox: ", name, checked);

return (<input  className={styles.checkBox} type={type} name={name} checked={checked} onChange={onChange} /> )
}
export default Checkbox;