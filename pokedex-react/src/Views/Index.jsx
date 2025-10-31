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
import { PaginationControl } from "react-bootstrap-pagination-control";

const Index = () => {
  const [pokemons, setPokemons] = useState([]);
  const [allPokemons, setAllPokemons] = useState([]);
  const [listado, setListado] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(151);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    getPokemon(offset);
    getAllPokemon();
  }, []);
  const getPokemon = async (offset) => {
    const url =
      "https://pokeapi.co/api/v2/pokemon?offset=" + offset + "&limit=" + limit;
    axios.get(url).then(async (response) => {
      const respuesta = response.data;
      setPokemons(respuesta.results);
      setListado(respuesta.results);
      setTotal(respuesta.count);
    });
  };

  const getAllPokemon = async (offset) => {
    const url = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=100000";
    axios.get(url).then(async (response) => {
      const respuesta = response.data;
      setAllPokemons(respuesta.results);
    });
  };

  useEffect(() => {
    if (filtro.trim() === "") {
      setListado(pokemons);
    } else {
      setListado(
        allPokemons.filter((p) => p.name.includes(filtro.toLowerCase()))
      );
    }
  }, [filtro]);

  const goPage = async (p) => {
    setListado([]);
    await getPokemon(p == 1 ? 0 : (p - 1) * 151);
    setOffset(p);
  };

  return (
    <Container className="shadow bg-dark bg-opacity-50 backdrop-blur mt-3">
      <Row>
        <Col>
          <InputGroup className="animate__animated animate__bounceIn mt-3 mb-3 shadow">
            <InputGroupText>
              <i className="fa-solid fa-search"></i>
            </InputGroupText>
            <Input
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
              placeholder="Buscar un Pokémon"
            ></Input>
          </InputGroup>
        </Col>
      </Row>
      <Row className="mt-3 mb-3">
        {listado.map((pok, i) => (
          <PokeCard poke={pok} key={i} />
        ))}
        {listado.length == 0 ? (
          <Col className="text-center fs-2 mb-3">No information found</Col>
        ) : (
          ""
        )}
        <PaginationControl
          last={true}
          limit={limit}
          total={total}
          page={offset}
          changePage={(page) => goPage(page)}
        />
      </Row>
    </Container>
  );
};

export default Index;
