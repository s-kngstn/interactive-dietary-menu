import type { NextPage } from "next";
import useSWR from "swr";
import styles from "../styles/Home.module.css";
import { allergyFilter } from "../allergyFilterFunc";
import { useState } from "react";
import MenuItem from "../src/components/MenuItem";
import Menu from "../src/components/Menu";
import Checkbox from "../src/components/Checkbox";
import { allergens } from "../data/allergens";

// TODO:
// [] - Fix Styling (Draw out how u want it, remove all classes and start over.)
// [] - Define all types
// [] - Build README Documentation on how to build for restaurants and input the xlsx
// [] - Deploy

// to run local server type npm run dev

const Home: NextPage = () => {
  const [checkedItems, setCheckedItems] = useState({});
  const handleChange = (event) => {
    setCheckedItems({
      ...checkedItems,
      [event.target.name]: event.target.checked,
    });
  };

  const [optionValue, setOptionValue] = useState("");
  const handleSelect = (e) => {
    setOptionValue(e.target.value);
  };
  const fetcher = (...args) =>
    fetch.apply(null, args).then((res) => res.json());
  // const { data, error } = useSWR(`http://localhost:3000/api`, fetcher);
  const { data, error } = useSWR("https://interactive-dietary-menu.vercel.app/api", fetcher);
  console.log(data)
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  const usersDiet = allergens
    .map((ingredient) => checkedItems[ingredient.name] && ingredient.name)
    .filter((ingredients) => ingredients && ingredients);

  usersDiet.push(optionValue);
  const filteredMenu = allergyFilter(data, usersDiet);
  const courses = ["Snacks", "Small", "Main", "Side", "Dessert"];
  const menuItems = courses.map((course) => {
    const courses = filteredMenu
      .filter((item) => item.course === `${course}`)
      .map((item) => (
        <MenuItem
          key={Math.random()}
          dishName={item.dishName}
          price={item.price}
        />
      ));
    return courses;
  });

  return (
    <div className={styles.main}>
      <h1>Interactive Diet Menu</h1>
      <Menu
        snacks={menuItems[0]}
        small={menuItems[1]}
        main={menuItems[2]}
        sides={menuItems[3]}
        desserts={menuItems[4]}
      >
        <section className={styles.controller}>
          <div className={styles.selectList}>
            <select
              defaultValue=" "
              name="selectList"
              id="selectList"
              onChange={handleSelect}
            >
              <option value=" ">-- Choose Diet --</option> {" "}
              <option value=" ">No Diet</option> {" "}
              <option value="Veg">Vegetarian</option> {" "}
              <option value="Vegan">Vegan</option>
              <option value="Pesc">Pescatarian</option>
            </select>
          </div>
          {/* <div className={styles.checkboxContainer}> */}
          {/* <div className={styles.checkboxItems}> */}
          <fieldset className={styles.group}>
            <legend>Select any of the 14 allergens</legend>
            <ul className={styles.checkbox}>
              {allergens.map((item) => (
                <li key={item.key}>
                  <label className={styles.checkboxLabel} key={item.key}>
                    <Checkbox
                      name={item.name}
                      checked={checkedItems[item.name]}
                      onChange={handleChange}
                    />
                    {item.key}
                  </label>
                </li>
              ))}
            </ul>
          </fieldset>
          {/* </div> */}
          {/* </div> */}
        </section>
      </Menu>
    </div>
  );
};

export default Home;
