import React from "react";
import {
  Container,
  Row,
  Col,
  InputGroup,
  InputGroupText,
  Input,
} from "reactstrap";
import axios from "axios";
import { useState, useEffect } from "react";
import PokeCard from "../Components/PokeCard";

const Index = () => {
  const [pokemons, setPokemons] = useState([]);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(151);
  useEffect(() => {
    getPokemon(offset);
  }, []);
  const getPokemon = async (offset) => {
    const url =
      "https://pokeapi.co/api/v2/pokemon?offset=" + offset + "&limit=" + limit;
    axios.get(url).then(async (response) => {
      const respuesta = response.data;
      setPokemons(respuesta.results);
    });
  };
  return (
    <Container className="shadow bg-danger mt-3">
      <Row>
        <Col>
          <InputGroup className="mt-3 mb-3 shadow">
            <InputGroupText>
              <i className="fa-solid fa-search"></i>
            </InputGroupText>
            <Input placeholder="Buscar un Pokémon"></Input>
          </InputGroup>
        </Col>
      </Row>
      <Row className="mt-3">
        {pokemons.map((pok, i) => (
          <PokeCard poke={pok} key={i} />
        ))}
      </Row>
    </Container>
  );
};

export default Index;
