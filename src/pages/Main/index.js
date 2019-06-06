import React, { Component, Fragment } from "react";
import logo from "../../assets/logo.png";
import { Container, Form } from "./styles";
import CompareList from "../../components/CompareList";
import api from "../../services/api";
import { distanceInWordsToNow } from "date-fns";
import pt from "date-fns/locale/pt";

class Main extends Component {
  state = {
    loading: { status: false, id: "" },
    repositories: [],
    repositoryInput: "",
    repositoryError: false
  };

  componentDidMount() {
    const repository = JSON.parse(localStorage.getItem("@repository"));

    this.setState({
      repositories: repository
    });
  }

  handleSubmit = async e => {
    e.preventDefault();

    const { repositoryInput, repositories } = this.state;

    try {
      const response = await api.get(`/${repositoryInput}`);
      response.data.pushed_at = distanceInWordsToNow(response.data.pushed_at, {
        locale: pt
      });

      let repos = [];
      if (!repositories) {
        repos = [response.data];
      } else {
        repos = [...repositories, response.data];
      }

      this.setState({
        repositories: repos,
        repositoryInput: "",
        repositoryError: false
      });

      this.storageSave(repos);
    } catch (err) {
      console.log(err);
      this.setState({
        repositoryInput: "",
        repositoryError: true
      });
    }
  };

  storageSave = async data => {
    const repository = await JSON.stringify(data);

    localStorage.setItem("@repository", repository);
  };

  handleUpdate = async id => {
    const { repositories } = this.state;

    this.setState({
      loading: {
        status: true,
        id: id
      }
    });

    const repository = repositories.find(repo => repo.id === id);
    try {
      const response = await api.get(`/${repository.full_name}`);
      response.data.pushed_at = distanceInWordsToNow(response.data.pushed_at, {
        locale: pt
      });

      let newRepositories = repositories.map(repo =>
        repo.id === id ? response.data : repo
      );

      this.storageSave(newRepositories);

      this.setState({
        repositories: newRepositories,
        repositoryError: false
      });
    } catch (err) {
      console.log(err);
      this.setState({
        repositoryInput: "",
        repositoryError: true
      });
    } finally {
      this.setState({
        loading: false
      });
    }
  };

  handleRemove = id => {
    const { repositories } = this.state;
    const newRepositories = repositories.filter(repo => repo.id !== id);

    this.storageSave(newRepositories);

    this.setState({
      repositories: newRepositories,
      repositoryError: false
    });
  };

  render() {
    const {
      repositories,
      repositoryInput,
      repositoryError,
      loading
    } = this.state;
    return (
      <Fragment>
        <Container>
          <img src={logo} alt="Logo Github Compare" />
          <Form withError={repositoryError} onSubmit={this.handleSubmit}>
            <input
              type="text"
              placeholder="usuário/repositório"
              value={repositoryInput}
              onChange={e => this.setState({ repositoryInput: e.target.value })}
            />
            <button type="submit">OK</button>
          </Form>
          {repositoryError && (
            <p>Você precisa digitar um usuário/repositório válido</p>
          )}
        </Container>
        <CompareList
          repositories={repositories}
          updateRepository={index => this.handleUpdate(index)}
          removeRepository={index => this.handleRemove(index)}
          loading={loading}
        />
      </Fragment>
    );
  }
}

export default Main;
