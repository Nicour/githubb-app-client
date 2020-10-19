import axios from 'axios';

class OrgsReposService {
  constructor() {
    this.orgs = axios.create({
      baseURL: 'http://localhost:8000/orgs',
      withCredentials: true,
    })
  }

  orgsRepos(organization) {
    return this.orgs.get(`/${organization}`)
    .then(response => response.data)
  }

  repoDetails(owner, repo) {
    return this.orgs.get(`/${owner}/${repo}`)
    .then(response => response.data)
  }
}

const orgsReposService = new OrgsReposService();

export default orgsReposService;