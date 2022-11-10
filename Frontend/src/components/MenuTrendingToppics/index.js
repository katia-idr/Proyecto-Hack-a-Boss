import "./styles.css";

const MenuTrendingToppics = ({ setPosts, searchParams, setSearchParams }) => {
  const handleClickInMenuOptions = async (e) => {
    e.preventDefault();

    const queryParams = {};

    if (e.target.value) {
      queryParams.search = e.target.value;
    }
    setSearchParams(new URLSearchParams(queryParams));
  };
  return (
    <section className="menuTrendingToppic">
      <button type="button" value="aventura" onClick={handleClickInMenuOptions}>
        Aventura
      </button>
      <button
        type="button"
        value="naturaleza"
        onClick={handleClickInMenuOptions}
      >
        Naturaleza
      </button>
      <button type="button" value="comida" onClick={handleClickInMenuOptions}>
        Comida
      </button>
      <button type="button" value="deportes" onClick={handleClickInMenuOptions}>
        Deportes
      </button>
      <button type="button" value="viajes" onClick={handleClickInMenuOptions}>
        Viajes
      </button>
      <button type="button" value="coches" onClick={handleClickInMenuOptions}>
        Coches
      </button>
    </section>
  );
};

export default MenuTrendingToppics;
