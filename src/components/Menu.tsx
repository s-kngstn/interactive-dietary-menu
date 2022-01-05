import styles from "../../styles/Home.module.css";

const Menu = (props) => {
  return (
    <section className={styles.reactiveMenu}>
      {props.children}
      <h3>Snacks</h3>
      {props.snacks}
      <h3>Small Plates</h3>
      {props.small}
      <h3>Main Course</h3>
      {props.main}
      <h3>Sides</h3>
      {props.sides}
      <h3>Dessert</h3>
      {props.desserts}
    </section>
  );
};

export default Menu