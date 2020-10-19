import React, { Component } from 'react';

import authService from '../services/auth-service.js';
import orgsReposService from '../services/organizationRepos-service.js';

class Home extends Component {
  state = {
    organization: '',
    organizationRespositories: [], 
    repository: '',
    repositoryDetails: {},
    recentSearchedRepos: [],
    showReposList: true,
    showSearchBar: true,
    showRecentSearched: true
  }

  componentDidMount() {
    authService.me()
    .then(user => {
      this.setState({
        recentSearchedRepos: user.recentSearchedRepos ? user.recentSearchedRepos : ''
      })
    })
  }

  handleOnChange = (event) => {
    const { name, value } = event.target; 
    this.setState({
      [name]:[value]
    })
  }

  submitRecentRepos = (event) => {
    event.preventDefault();
    const orgAndRepo = event.target.value.split(',');
    const org = orgAndRepo[0];
    const repo = orgAndRepo[1];
    orgsReposService.repoDetails(org, repo)
    .then(response => {
      this.setState ({
        organization: org,
        repository: repo,
        repositoryDetails: response,
        showSearchBar: false,
        showReposList: false,
        showRecentSearched: false
      })
    })
    .catch(error => {
      console.log(error)
    })
  }

  submitRepoDetails = (event) => {
    event.preventDefault();
    const repo = event.target.value;
    const { organization } = this.state;
    orgsReposService.repoDetails(organization, repo)
    .then(response => {
      this.setState ({
        repository: repo,
        repositoryDetails: response,
        showSearchBar: false,
        showReposList: false
      })
      console.log(this.state)
    })
    .catch(error => {
      console.log(error)
    })
  }

  submitOrganization = (event) => {
    event.preventDefault();
    const { organization } = this.state;
    orgsReposService.orgsRepos(organization)
    .then(response => {
      this.setState ({
        organizationRespositories: response.listOfRepositories,
        showSearchBar: false,
      })
    })
    .catch(error => {
      console.log(error)
    })
  }

  render() {
    const { organization, recentSearchedRepos, organizationRespositories, repositoryDetails, showRecentSearched, showSearchBar, showReposList } = this.state;
    return (
      <div className="main-container">
        <div>
          <a href="/">
            <h1 className="main-title">Repository information</h1>
          </a>
        </div>
        {
          showSearchBar ? 
          <>
            <section className="search-container">
              <form onSubmit={this.submitOrganization} className="search-bar">
                <input type="text" id='organization' onChange={this.handleOnChange} value={organization} name='organization' placeholder="Search an organization" className="input" required/>
                <button type="submit" className="search-button">Search</button>
              </form>
            </section>
            <h4 className="recent-searches-title">Recent searches</h4>
          </>
          : null
        }
        { 
          organizationRespositories && showReposList ? organizationRespositories.map(repository => {
            return (
              <div key={repository.name} className="main-info-repo-card">
                <div className="repo-main-info">
                  <h3>Name: {repository.name}</h3>
                  <h4>Description: {repository.description}</h4>
                  <button onClick={e => this.submitRepoDetails(e)} value={repository.name} className="search-button">See details</button>
                </div>
              </div>
            )
          })
          :
          null
        }
        { 
          repositoryDetails.name ?
          <>
            <div>
              <h2>Repository details</h2>
            </div> 
            <article className="main-info-repo-card">
              <a href={repositoryDetails.owner_url}>
                <img alt={repositoryDetails.owner} src={repositoryDetails.ownerAvatarUrl} className="img"/>
              </a>
              <h4>Name: {repositoryDetails.name}</h4>
              <h4>Description: {repositoryDetails.description}</h4>
              <h4>Owner: {repositoryDetails.owner}</h4>
              <h4 className="contributors-title">Top 3 contributors</h4>
              <article className="1st">
                <h5>Username: {repositoryDetails.contributors[0].username}</h5>
                <h5>Contributions: {repositoryDetails.contributors[0].contributions}</h5>
              </article>
              <article className="2nd">
                <h5>Username: {repositoryDetails.contributors[1].username}</h5>
                <h5>Contributions: {repositoryDetails.contributors[1].contributions}</h5>
              </article>
              <article className="3rd">
                <h5>Username: {repositoryDetails.contributors[2].username}</h5>
                <h5>Contributions: {repositoryDetails.contributors[2].contributions}</h5>
              </article>
                <a href={repositoryDetails.repoUrl}>
                  <button className="search-button">
                    Go to repo
                  </button>
                </a>
            </article>
          </>
          :
          null
        }
        {
          !organizationRespositories.length && showRecentSearched && recentSearchedRepos.length ? recentSearchedRepos.map(repo => {
            return (
              <div className="recent-searched-container"> 
                <button key={repo.name} className="recent-searched" onClick={e => this.submitRecentRepos(e)} value={[repo.organization, repo.name]} >Organization: {repo.organization}<br/>Name: {repo.name}</button>
              </div>
            )
          })
          : 
          null
        }
      </div>
    )
  }
}

export default Home;