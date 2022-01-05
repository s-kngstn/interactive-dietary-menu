import styles from '../../styles/Home.module.css';

function MenuItem(props) {

  return (
    <div className={styles.menu}>
      <p className={styles.dishName}>{props.dishName}</p>
      <p>{props.price}</p>
    </div>
  );
}
export default MenuItem;