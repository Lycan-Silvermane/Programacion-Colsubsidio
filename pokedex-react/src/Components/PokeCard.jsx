import React, { useState, useEffect } from "react";
import axios from "axios";
import { Col, Card, CardBody, CardFooter, CardImg, Badge } from "reactstrap";
import { Link } from "react-router-dom";

const PokeCard = ({ poke, small = false }) => {
  const [pokemon, setPokemon] = useState(null);
  const [imagen, setImagen] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getPokemon = async () => {
      try {
        const response = await axios.get(poke.url);
        const data = response.data;
        setPokemon(data);

        const sprite =
          data.sprites.other["official-artwork"].front_default ||
          data.sprites.other.showdown.font_default;
        setImagen(sprite);
      } catch (error) {
        console.error("Error al cargar el Pokémon:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getPokemon();
  }, [poke.url]);
  return (
    <Col sm={small ? "auto" : "6"} lg="3" md="4" className="mb-4">
      <Card
        className={`card-hover shadow border-4 border-secndary bg-white bg-opacity-50 backdrop-blur text-center ${
          small ? "p-2 small-card" : ""
        }`}
        style={small ? { width: "180px" } : {}}
      >
        {isLoading ? (
          <CardImg src="/img/pokeball1.gif" height="200" className="p-3" />
        ) : (
          <>
            <CardImg
              src={imagen}
              height={small ? "100" : "200"}
              className="p-2 bg-white"
            />
            <div className="pokemon-types mt-2">
              {" "}
              <div className="d-flex justify-content-center gap-1">
                {pokemon.types.map((typeInfo, i) => (
                  <span key={i} className={`type-badge ${typeInfo.type.name}`}>
                    {typeInfo.type.name}
                  </span>
                ))}
              </div>
            </div>
            <CardBody className="bg-white bg-opacity-50 backdrop-blur text-center">
              <div className="d-flex justify-content-center align-items-center gap-1">
                <Badge pill color="secondary">
                  # {pokemon.id}
                </Badge>
                <span className="fs-4 text-capitalize p-2">{pokemon.name}</span>
              </div>
            </CardBody>
            <CardFooter className="bg-secondary">
              <Link
                to={"/pokemon/" + pokemon.name}
                className="btn btn-dark p-2"
              >
                <i className="fa-solid fa-arrow-up-right-from-square"></i> More
                information
              </Link>
            </CardFooter>
          </>
        )}
      </Card>
    </Col>
  );
};

export default PokeCard;
