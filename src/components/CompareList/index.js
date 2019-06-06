/* eslint-disable react/prop-types */
import React, { Fragment } from "react";
import { Container, Repository } from "./styles";

const CompareList = ({
  repositories,
  updateRepository,
  removeRepository,
  loading
}) => (
  <Fragment>
    <Container>
      {repositories &&
        repositories.map(repository => (
          <Repository key={repository.id}>
            <div>
              <button
                type="button"
                onClick={() => updateRepository(repository.id)}
              >
                {loading.status && loading.id === repository.id ? (
                  <i className="fa fa-spinner fa-pulse fa-lg" />
                ) : (
                  <i className="fa fa-refresh fa-lg" />
                )}
              </button>
              <button
                type="button"
                onClick={() => removeRepository(repository.id)}
              >
                <i className="fa fa-times fa-lg" />
              </button>
            </div>
            <header>
              <img src={repository.owner.avatar_url} alt="Logo" />
              <strong>{repository.owner.login}</strong>
              <small>{repository.name}</small>
            </header>
            <ul>
              <li>
                {repository.stargazers_count}
                <small>Stars</small>
              </li>
              <li>
                {repository.forks}
                <small>Forks</small>
              </li>
              <li>
                {repository.subscribers_count}
                <small>Followers</small>
              </li>
              <li>
                {repository.pushed_at}
                <small>Last commit</small>
              </li>
            </ul>
          </Repository>
        ))}
    </Container>
  </Fragment>
);

export default CompareList;
