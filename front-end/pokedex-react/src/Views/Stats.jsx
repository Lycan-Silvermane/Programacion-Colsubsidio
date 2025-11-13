import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardText,
  Badge,
  Progress,
  Label,
  Input,
} from "reactstrap";
import axios from "axios";
import PokeCard from "../Components/PokeCard";

const Stats = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState({});
  const [especie, setEspecie] = useState({});
  const [habitat, setHabitat] = useState("Unkown");
  const [descripcion, setDescripcion] = useState("");
  const [imagen, setImagen] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [evolutions, setEvolutions] = useState([]);
  const [isShiny, setIsShiny] = useState(false);
  const [imagenShiny, setImagenShiny] = useState(null);
  const [error, setError] = useState(null);

  const getPokemon = async () => {
    const url = "https://pokeapi.co/api/v2/pokemon/" + id;
    try {
      const response = await axios.get(url);
      const data = response.data;
      setPokemon(data);

      const sprite =
        data.sprites.other["official-artwork"].front_default ||
        data.sprites.other.showdown.font_default;
      const shiny =
        data.sprites.other["official-artwork"].front_shiny ||
        data.sprites.other.showdown.front_shiny;

      setImagen(sprite);
      setImagenShiny(shiny);

      await getEspecie(data.species.name);
    } catch (error) {
      console.error("Error al cargar el Pokémon:", error);
      setError("Error obtaining the Pokemon's info");
    } finally {
      setIsLoading(false);
    }
  };

  const getEvolutions = async (url) => {
    try {
      const response = await axios.get(url);
      const data = response.data;

      const evoChain = [];
      let evoData = data.chain;

      do {
        evoChain.push({
          name: evoData.species.name,
          url: evoData.species.url.replace("pokemon-species", "pokemon"),
        });

        evoData = evoData.evolves_to[0];
      } while (evoData && evoData.hasOwnProperty("evolves_to"));

      setEvolutions(evoChain);
    } catch (error) {
      console.error("Error al cargar la linea evolutiva:", error);
      setError("It was a problem charging the evolution chain");
    }
  };

  const getEspecie = async (esp) => {
    try {
      const url = "https://pokeapi.co/api/v2/pokemon-species/" + esp;
      const response = await axios.get(url);
      const data = response.data;
      setEspecie(data);

      const lenguaje = data.flavor_text_entries.find(
        (entry) => entry.language.name === "en"
      );
      if (lenguaje) setDescripcion(lenguaje.flavor_text.replace(/\n|\f/g, ""));

      if (data.habitat) await getHabitat(data.habitat.url);
      if (data.evolution_chain) await getEvolutions(data.evolution_chain.url);
    } catch (error) {
      console.error("Error al cargar la especie:", error);
      setError("No info found");
    }
  };

  const getHabitat = async (url) => {
    try {
      const response = await axios.get(url);
      const data = response.data;
      setHabitat(data.name);
    } catch (error) {
      console.error("Error al cargar el hábitat:", error);
      setError("Error obteining the habitat");
    }
  };

  useEffect(() => {
    setError(null);
    getPokemon();
  }, [id]);

  return (
    <Container className="bg-dark bg-opacity-50 backdrop-blur mt-2">
      <Row>
        <Col>
          <Card className="shadow mt-2 mb-2">
            <CardBody className="mt-2">
              {error && (
                <Alert color="danger" className="text-center fw-bold">
                  {error}
                </Alert>
              )}
              <Row>
                <Col className="text-end">
                  <Link to="/" className="btn btn-dark mb-3">
                    <i className="fa-solid fa-home"></i> Home
                  </Link>
                </Col>
              </Row>
              <Row>
                <Col md="12">
                  {isLoading && (
                    <img
                      src="/img/pokeball1.gif"
                      alt="Cargando Pokémon..."
                      className="w-100"
                    />
                  )}
                </Col>
              </Row>
              {!isLoading && !error && (
                <>
                  <Row>
                    <Col md="6">
                      <CardText className="h1 text-capitalize mt-2">
                        {pokemon.name}
                      </CardText>
                      <CardText className="fs-3">{descripcion}</CardText>
                      <CardText className="fs-5">
                        <b>Hight:</b> {pokemon.height / 10} m <b>Weight:</b>{" "}
                        {pokemon.weight / 10} kg
                      </CardText>
                      <CardText className="fs-5">
                        <b>Type:</b>
                        {""}
                        {pokemon.types?.map((t, i) => (
                          <span key={i} className={`type-badge ${t.type.name}`}>
                            {t.type.name}
                          </span>
                        ))}
                      </CardText>
                      <CardText className="fs-5">
                        <b>Abilities:</b>
                        {""}
                        {pokemon.abilities?.map((j, i) => (
                          <Badge pill key={i} className="ability-badge me-1">
                            {j.ability.name}
                          </Badge>
                        ))}
                      </CardText>
                      <CardText className="fs-5 text-capitalize">
                        <b>Habitat:</b> {habitat}
                      </CardText>
                    </Col>
                    <Col md="6" className="text-center">
                      {!isLoading && imagen && (
                        <img
                          src={isShiny ? imagenShiny : imagen}
                          alt={pokemon.name}
                          className="img-fluid animate__animated animate__bounceInRight w-100"
                        />
                      )}
                      {!isLoading && imagenShiny && (
                        <div className="d-flex mt-3 align-items-center justify-content-end">
                          <div className="form-check form-switch d-flex align-items-center custom-switch">
                            <Input
                              type="switch"
                              id="shinySwitch"
                              checked={isShiny}
                              onChange={() => setIsShiny(!isShiny)}
                            />
                            <Label
                              for="shinySwitch"
                              className="text-dark ms-2 mb-0 fw-bold"
                            >
                              Show Shiny Version
                            </Label>
                          </div>
                        </div>
                      )}
                    </Col>
                    <Col md="12 mt-2">
                      <CardText className="fs-4 text-center">
                        <b>Stats</b>
                      </CardText>
                    </Col>
                    {""}
                    {pokemon.stats?.map((s, i) => (
                      <Row key={i}>
                        <Col xs="6" md="3" className="text-capitalize">
                          <b>{s.stat.name}</b>
                        </Col>
                        <Col xs="6" md="3">
                          <Progress className="my-2" value={s.base_stat}>
                            {s.base_stat}
                          </Progress>
                        </Col>
                      </Row>
                    ))}
                    <Col md="12 mt-2">
                      <CardText className="fs-4 text-center">
                        <b>Evolution Chain</b>
                      </CardText>
                    </Col>
                    <Row className="text-center justify-content-center">
                      {evolutions.length > 0 ? (
                        evolutions.map((poke, i) => (
                          <PokeCard key={i} poke={poke} small />
                        ))
                      ) : (
                        <p className="text-center text-white">
                          No evolution data available.
                        </p>
                      )}
                    </Row>
                  </Row>
                </>
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Stats;
