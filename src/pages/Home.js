
import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import authService from '../services/auth-service.js';
import orgsReposService from '../services/organizationRepos-service.js';

class Home extends Component {
  state = {
    organization: '',
    organizationRespositories: [], 
    repository: '',
    recentSearchedOrganizations: [],
    showSearchBar: true
  }

  componentDidMount() {
    authService.me()
    .then(user => {
      console.log(user.recentSearchedOrganizations);
      this.setState({
        recentSearchedOrganizations: user.recentSearchedOrganizations ? user.recentSearchedOrganizations : ''
      })
    })
  }

  handleOnChange = (event) => {
    const { name, value } = event.target; 
    this.setState({
      [name]:[value]
    })
  }

  submitRecentOrganization = (org) => {
    const { organization, showSearchBar } = this.state;
    orgsReposService.orgsRepos(org)
    .then(response => {
      this.setState ({
        organizationRespositories: response.listOfRepositories,
        showSearchBar: false,
      })
      console.log(response)
    })
    .catch(error => {
      console.log(error)
    })
  }

  submitOrganization = (event) => {
    event.preventDefault();
    const { organization, showSearchBar } = this.state;
    orgsReposService.orgsRepos(organization)
    .then(response => {
      this.setState ({
        organizationRespositories: response.listOfRepositories,
        showSearchBar: false,
      })
      console.log(response)
    })
    .catch(error => {
      console.log(error)
    })
  }

  render() {
    const { organization, repository, recentSearchedOrganizations, organizationRespositories, showSearchBar } = this.state;
    return (
      <>
        {
          showSearchBar ? 
          <section>
            <form onSubmit={this.submitOrganization} className="search-user-repos">
              <label htmlFor="organization">Organization</label>
              <input type="text" id='organization' onChange={this.handleOnChange} value={organization} name='organization' placeholder="organization" required/>
              <button type="submit" className="button">Search</button>
            </form>
          </section>
          : null
        }
        {
          !organizationRespositories.length && recentSearchedOrganizations.length ? recentSearchedOrganizations.map(org => {
            return (
              <form key={org}>
                <button className="button" onClick={e => this.submitRecentOrganization(org)} value={org}>{org}</button>
              </form>
            )
          })
          : 
          null
        }
        {/* <section>
          <form onSubmit={this.submitOrganization} className="search-user-repos">
            <label htmlFor="organization">Organization</label>
            <input type="text" id='organization' onChange={this.handleOnChange} value={organization} name='organization' placeholder="organization" required/>
            <button type="submit" className="button">Search</button>
          </form>
        </section> */}
        { 
          organizationRespositories ? organizationRespositories.map(repository => {
            return (
              <div key={repository.name} className="contributor">
                <ul>
                  <li>
                    <h3>{repository.name}</h3>
                    <h4>{repository.description}</h4>
                  </li>
                </ul>
              </div>
            )
          })
          :
          <h1>NONE</h1>
        }
      </>
    )
  }
}

export default Home;