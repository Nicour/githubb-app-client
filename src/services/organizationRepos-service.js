import axios from 'axios';

class OrgsReposService {
  constructor() {
    this.orgs = axios.create({
      baseURL: 'https://githubb-app.herokuapp.com',
      withCredentials: true,
    })
  }

  orgsRepos(organization) {
    return this.orgs.get(`/orgs/${organization}`)
    .then(response => response.data)
  }

  repoDetails(owner, repo) {
    return this.orgs.get(`/orgs/${owner}/${repo}`)
    .then(response => response.data)
  }
}

const orgsReposService = new OrgsReposService();

export default orgsReposService;